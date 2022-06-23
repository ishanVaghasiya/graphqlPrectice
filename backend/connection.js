import mongoose from "mongoose";

 export const db = mongoose.connect("mongodb://localhost:27017/graphQl").then(() => {
    console.log(` ✔  Database connected at localhost:27017..`);
}).catch((e) => {
    console.log(e.message)
})
