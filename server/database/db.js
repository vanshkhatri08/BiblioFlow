import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
<<<<<<< HEAD
        console.log("error occured", error); 
=======
        console.log("error occurred", error); 
>>>>>>> e438ebd2bbb360a6da3f818d76aa7dcb2f501de6
    }
}
export default connectDB;