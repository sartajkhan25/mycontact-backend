const asynchandler = require("express-async-handler");
const Contact = require('../models/contactModel')
//@description Get all conatct
//@route GET /api/contacts
//@access private
const getContacts = asynchandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
})

//@description Create conatct
//@route POST /api/contacts
//@access private
const createContact = asynchandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(403)
        throw new Error("All Fields must be filled in")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
})

//@description Get one conatct
//@route GET /api/contacts:id
//@access private
const getContact = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact);
})

//@description Update conatct
//@route PUT /api/contacts:id
//@access private
const updateContact = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id !== req.user.id){
        res.status(403);
        throw new Error("This User do not have permission to update the other users contacts")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact);
})

//@description Delete conatct
//@route DELETE /api/contacts:id
//@access private
const deleteContact = asynchandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id !== req.user.id){
        res.status(403);
        throw new Error("This User do not have permission to delete the other users contacts")
    }

    // await Contact.remove(); // this is not working here so used findOneAndRemove
    // await Contact.findOneAndRemove(req.params.id)
    await Contact.deleteOne({_id:req.params.id})
    res.status(200).json(contact);
})



module.exports = {
    getContact,
    getContacts,
    createContact,
    updateContact,
    deleteContact
}