import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        maxLenght: 32,
        required: true
    }
});

//Export the model
const Category = mongoose.model('category', categorySchema);
export default Category