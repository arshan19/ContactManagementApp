const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contact 
//@route GET /api/contacts
//@access private 
const getContacts = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
});

//@desc create contact 
//@route POST /api/contact
//@access private
const createContact = asyncHandler(async(req,res)=>{
    console.log("The request Body is: ", req.body);
    const {name,email,phone} = req.body;
    let contact = {};
    if(!name || !email || !phone ){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    try {
         contact = await Contact.create({
            name,
            email,
            phone,
            user_id : req.user.id
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
        //throw new Error("something went wrong !");
    }
    console.log(contact);
    return res.status(200).json(contact);
});

//@desc Get contact 
//@route GET /api/contact/:id
//@access private 
const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id) ; 
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found!");
    }
   return res.status(200).json(contact);
});

//@desc update contact 
//@route PUT /api/contact/:id
//@access private
const updateContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id) ; 
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found!");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update other user Contacts!");
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
    ); 
    res.status(200).json(updatedContact)
});

//@desc delete contact 
//@route DELETE /api/contact/:id
//@access private 
const deleteContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id) ; 
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found!");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user don't have permission to Delete other user Contacts!");
    }
    await Contact.deleteOne({_id : req.params.id});
    res.status(200).json(contact)
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
};
