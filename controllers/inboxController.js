// external imports
const createError = require('http-errors');

// internal imports
const Conversation = require('../models/Conversation');
const User = require('../models/User');

const escape = require('../utils/escape')

const getInbox = async (req, res, next) => {
    try {
        const conversations = await Conversation.find({
            $or: [{creator: req.user.id}, {participant: req.user.id}]
        })
        .populate('creator')
        .populate('participant')

        res.locals.data = conversations;

        // rendering inbox page 
        res.render('pages/inbox')
    } catch (error) {
        next(error);
    }
}

const searchUsers = async (req, res, next) => {
    const searchKeyword = req.body.searchKeyword;
    const searchQuery = searchKeyword.replace('+88', "");

    const name_search_regex = new RegExp(escape(searchQuery), "i");
    const email_search_regex = new RegExp("^" + escape("+88" + searchQuery));
    const mobile_search_regex = new RegExp("^" + escape(searchQuery) + "$", "i");

    try {
        if(searchQuery !== "") {
            const users = await User.find({
                $or: [
                    {name: name_search_regex},
                    {email: email_search_regex},
                    {mobile: mobile_search_regex}
                ]
            })
            res.json(users)
        } else {
            throw createError('Search input can not be empty!')
        }  
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: error.message
                }
            }
        })
    }
}

const addConversation = async (req, res, next) => {
    try {
        const isConversationExisted = await Conversation.find({
            creator: req.user.id,
            participant: req.body.id
        })
    
        if(isConversationExisted.length === 0) {
            const newConversation = new Conversation({
                creator: req.user.id,
                participant: req.body.id
            })
    
            const result = await newConversation.save();
            res.status(200).json({
                message: 'Conversation has been added successfully!'
            })
        } else {
            throw createError('User already added to your conversation')
        }   
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: error.message
                }
            }
        })
    }
}

module.exports = {
    getInbox,
    searchUsers,
    addConversation
}