// internal imports
const Conversation = require('../models/Conversation')

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

module.exports = {
    getInbox
}