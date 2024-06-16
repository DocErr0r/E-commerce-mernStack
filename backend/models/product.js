import mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    brand: { type: String, require: true },
    category: { type: String, require: true },
},
    { timestamps: true });

//Export the model
const Product = mongoose.model('Product', productSchema);
export default  Product; 
