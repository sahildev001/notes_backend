    const noteModel = require('../model/note');

    //------------ create note -------
    const createNote = async (req,res)=>{

        const {title,description} = req.body;
        const userId = req.userId;

        // Check validation
        const validationStatus = validateCreateNote(req.body);

        if (!validationStatus.valid) {
        return res.status(400).json({ message: validationStatus.message });
        }


        if(!userId){
            return res.status(400).json({message: 'userId not found'});
        }



        const newNote = new noteModel({
            title: title,
            description: description,
            userId: userId
        });

        try{
        await newNote.save();
        return res.status(201).json({data: newNote});
        }catch(error){
            console.log(`error on create note ${error}`);
        return res.status(500).json({message: "Something went wrong"});
        }

        
    }

    function validateCreateNote(requestBody){
        const {title,description} = requestBody;
        if(!title || title.trim() === ""){
            return {valid: false, message: "'title' should not be empty"};
        }else if(!description || description.trim() === ""){
            return {valid: false, message: "'description' should not be empty"};
        }

        return {valid : true};

    }



    const updateNote = async (req,res)=>{
        const id = req.params.id;
        const {title,description} = req.body;

        const newNote = {
            title : title,
            description : description,
            userId :  req.userId
        }

        try {
            const updatedNote = await noteModel.findByIdAndUpdate(id,newNote,{new: true});
             return res.status(200).json({data: updatedNote});
        } catch (error) {
            console.log(`error on update note ${error}`);
            return res.status(500).json({message: "Something went wrong"});
        }
    }


    const deleteNote = async (req,res)=> {
        const id = req.params.id;
        
        try {
            const deleteNote = await noteModel.findByIdAndDelete(id);
             return res.status(200).json({data: deleteNote});
        } catch (error) {
            console.log(`error on delete  note ${error}`);
            return res.status(500).json({message: "Something went wrong"});
        }
    }




    const getNotes =async (req,res)=>{
    try {
        if(req.params.id){
            console.log("params :: ");
            const notes = await noteModel.findOne({_id:req.params.id});

        if(notes){
            return res.status(200).json({data: notes});  
        }else{
            return res.status(400).json({message: "No data found"});
        } 
        }
        
        const notes = await noteModel.find({userId: req.userId});

        if(notes){
            return res.status(200).json({data: notes});  
        }else{
            return res.status(400).json({message: "No data found"});

        }
    } catch (error) {
        console.log(`error on get note ${error}`);
        return res.status(500).json({message: "Something went wrong"});
    }
    }

    module.exports = {createNote,updateNote,deleteNote,getNotes};