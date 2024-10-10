const {GoogleGenerativeAI} = require('@google/generative-ai')
const post = require('../model/savedpost')

exports.run_gemini=async(req,res,next)=>{
    try{
        const {prompt,created_by} = req.body;
        const genAI = new GoogleGenerativeAI("AIzaSyCpNiz9zXnzI2XkL8U26xH0-VMwH9mg9ig");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const new_post = await post.create({
            content : text,  
            createdby : req.user.id
        })

        res.status(200).send({text})
        
    }catch(error){
        res.status(401).send({message : "Error in gemni Controller"})
    }

}