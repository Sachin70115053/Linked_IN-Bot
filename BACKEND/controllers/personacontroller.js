const persona = require('../model/personasmodel')

exports.createPersona = async(req,res,next)=>{
    const persona_name = await persona.findOne({persona_name : req.body.persona_name});
    if(persona_name){
        res.status(401).send({message : "Already exists"})
    }
    const persona_new = new persona({
        ...req.body,
        createdby : req.user.id
    });
    await persona_new.save();
    res.status(200).send({message : "Persona created"})
}

exports.getallPersona = async(req,res,next)=>{
    // const personas = await persona.find({createdby : req.header.cookies});
    const personas = await persona.find({createdby : req.user.id});
    if(!personas){
        res.status(401).send({message : "No persona found"})
    }
    res.status(200).send({message : personas})
}

exports.getSinglePersona = async (req, res, next) => {
    try {
        const name_of_persona = req.params['name'];
        const persona_detail = await persona.find({ persona_name: name_of_persona });
        return res.status(200).send({persona_detail})
    } catch (err) {
        console.log(err);
        return res.status(402).send({
            message: "Error occurred in SinglePersona Route"
        });
    }
};

exports.deletepersona = async(req,res,next)=>{
    try{
        const persona_name = req.params['name']
        console.log(persona_name)
        const personas = await persona.findOneAndDelete({persona_name : persona_name,createdby : req.user.id});
        console.log(personas)
        res.status(200).send({message : "sucess"})
    }catch(error){
        console.error(error)
        res.status(400).send({message : error})
    }
}

exports.editpersona = async(req,res,next)=>{
    try{
        const persona_name = req.params['name'];
        const data = req.body;
        console.log(persona_name)
        const personas = await persona.findOneAndUpdate({persona_name : persona_name,createdby : req.user.id},{persona_name : persona_name,
            tags : data.tags,
            industry : data.industry,
            tone_and_personality : data.tone_and_personality,
            keywords : data.keywords,
            background : data.background,
            createdby : req.user.id});
        console.log(personas)
        res.status(200).send({message : "sucess"})
    }catch(error){
        console.error(error)
        res.status(400).send({message : error})
    }
}
