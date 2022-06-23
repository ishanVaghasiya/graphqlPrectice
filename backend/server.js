import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./typeDefs.js";
import { db } from "./connection.js";
import UserModel from './model/userModel.js';
import QuotesModel from './model/quoteModel.js';
import resolvers from "./resolvers.js";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "./config.js";

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers, //is key and value name is same you can write only key Name like  : typeDefs like below
  // typeDefs,
  // resolvers
  context: ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
      const { userId } = jwt.verify(authorization, JWT_SECRET)
      return { userId }
    }
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
