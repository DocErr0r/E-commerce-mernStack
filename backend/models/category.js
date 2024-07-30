import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        maxLenght: 32,
        required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

//Export the model
const Category = mongoose.model('Category', categorySchema);
export default Category