// import { users, quotes } from "./fakedb.js";
import { randomBytes } from "crypto";
import mongoose from "mongoose";
import UserModel from './model/userModel.js';
import QuotesModel from './model/quoteModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "./config.js";


const resolvers = {
    Query: {
        allUsers: async () => await UserModel.find({}),
        singleUser: async (_, userId) => await UserModel.findOne({ _id: userId._id }), // every "type" first args represent it's parent but here singleUser placed at root level so we give first arg as black and second userId is repeset arg of its own arg where it been define
        // singleUser: async (_, {_id}) => await UserModel.findOne({_id}), you can direct pass _id using object destruching

        userQuotes: async () => await QuotesModel.find({}).populate("by", "_id firstName"),
        singleUserQuote: async (_, userId) => await QuotesModel.find({ by: userId.by }).populate("by", "_id firstName"),
        //singleUserQuote:async (_, {by}) =>await quotes.filter({by})
        myprofile: async (_, args, { userId }) => {
            if (!userId) throw new Error("You must be logged in")
            return await UserModel.findOne({ _id: userId })
        },
    },
    User: {
        myQuotes: async (parent) => await QuotesModel.find({ by: parent._id }), //here parent arg represent the parent of myQuotes means type User
    },

    Mutation: {
        signupUser: async (_, { userNew }) => {
            const user = await UserModel.findOne({ email: userNew.email })
            if (user) {
                throw new Error("User already exists with that email")
            }
            const hashedPassword = await bcrypt.hash(userNew.password, 12)
            const newUser = new UserModel({
                ...userNew,
                password: hashedPassword
            })
            return await newUser.save()
        },
        signinUser: async (_, { userSignin }) => {
            const user = await UserModel.findOne({ email: userSignin.email })
            if (!user) {
                throw new Error("User dosent exists with that email")
            }
            const doMatch = await bcrypt.compare(userSignin.password, user.password)
            if (!doMatch) {
                throw new Error("email or password in invalid")
            }
            const token = jwt.sign({ userId: user._id }, JWT_SECRET)
            return { token }
        },
        createQuote: async (_, { name }, { userId }) => {
            if (!userId) throw new Error("You must be logged in")
            const newQuote = new QuotesModel({
                name,
                by: userId
            })
            await newQuote.save()
            return "Quote saved successfully"
        }
    }
}

export default resolvers;
