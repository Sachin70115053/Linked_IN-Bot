const post = require('../model/savedpost')
const {GoogleGenerativeAI} = require('@google/generative-ai');
const Groq = require('groq-sdk')
const config = require('../config/confo.js')

exports.createpost = async (req,res,next)=>{

  const groq = new Groq({ apiKey: config.GROQ_API_KEY });

  async function mainfunc() {
    const request_data = req.body
    const prompt = " Goals : "+  request_data.goals +" Tone : "+ request_data.tone + " Prompt : " + request_data.prompt + 
      `\n\n  Above is given the Goals , tone , persona and prompt, Now create a linkedIn post from the above info and also include emojis if possible ,  i am adding some of my information , ${request_data.persona} also give the response in a formatted manner and dont give headings just give content without headings\n `;
    const completion = await groq.chat.completions
      .create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "mixtral-8x7b-32768",
      })
      .then((chatCompletion) => {
        res.status(200).send(chatCompletion.choices[0]?.message?.content);
      });
  }


  try{

    mainfunc();
  }catch(error){
    console.log(error)
  }
}

exports.getallpost = async (req,res,next)=>{
  try{
    const all_post = await post.find({createdby : req.user.id});
    res.status(200).send({post : all_post})
  }catch(error){
    res.status(400).send({message : "Error while fetching Post"})
  }
  
} 
exports.savePost = async(req,res,next)=>{
  try {
    const {content} = req.body;
    console.log(content)
    const new_post = new post({
      content : content,
      createdby : req.user.id
    })
    await new_post.save();
    res.status(200).send({message : "Saved Post"})
  } catch (error) {
    res.status(400).send({message : "Error in saving"})
  }
}