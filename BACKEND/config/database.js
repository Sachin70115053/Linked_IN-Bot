const mongoose = require('mongoose')

const connectDatabase = async ()=> {
    
    await mongoose.connect('mongodb+srv://Abhiman:Abhishek03@cluster02.5spc1jm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster02/EvyAi')
.then(()=>{
    console.log("Connected to mongodb")
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

}

module.exports = connectDatabase;
