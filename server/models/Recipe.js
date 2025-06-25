// const mongoose = require('mongoose')
// const {ObjectId} = mongoose.Schema.Types 

// const recipeSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:'This field is required'
//     },
//     description:{
//         type:String,
//         required:'This field is required'
//     },
//     email:{
//         type:String,
//         required:'This field is required'
//     },
//     instructions:{
//         type:String,
//         required:'This field is required'
//     },
//     ingredients:{
//         type:Array,
//         required:'This field is required'
//     },
//     category:{
//         type:String,
//         enum:['North-Indian','South-Indian','Bengali-Dishes','Gujarati-Dishes'],
//         required:'This field is required'
//     },
//     image:{
//         type:String,
//         required:'This field is required'
//     },
//     user:{
//         type:ObjectId,
//         ref:'User',
//         required:true
//     }
// },{timestamps:true})
// recipeSchema.index({name:'text',description:'text'})
// // recipeSchema.index({'$**': 'text'})

// module.exports = mongoose.model('Recipe',recipeSchema)


const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types 

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required'
    },
    description: {
        type: String,
        required: 'This field is required'
    },
    instructions: {
        type: String,
        required: 'This field is required'
    },
    ingredients: {
        type: Array,
        required: 'This field is required'
    },
    category: {
        type: String,
        enum: ['North-Indian', 'South-Indian', 'Bengali-Dishes', 'Gujarati-Dishes','Rajasthani-Dishes','Maharashtrian-Dishes','Kashmiri-Dishes'],
        required: 'This field is required'
    },
    dietType: {
        type: String,
        enum: ['Healthy Food', 'Junk Food', 'Low-Carb', 'High-Protein', 'Vegan', 'Vegetarian', 'Gluten-Free','Non-Vegetarian'],
        required: 'This field is required'
    },
    image: {
        type: String,
        required: 'This field is required'
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

recipeSchema.index({name: 'text', description: 'text'})
// recipeSchema.index({'$**': 'text'})

module.exports = mongoose.model('Recipe', recipeSchema)
