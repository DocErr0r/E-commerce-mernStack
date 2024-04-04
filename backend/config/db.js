import mongoose from "mongoose"

const connectTODB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("database is connected successfully")
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
export default connectTODB;