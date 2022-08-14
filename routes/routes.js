const logInRouter = require('./logInRouter');
const usersRouter = require('./usersRouter');
const inboxRouter = require('./inboxRouter');

const routes = [
    {
        path: '/',
        handler: logInRouter
    },
    {
        path: '/users',
        handler: usersRouter
    },
    {
        path: '/inbox',
        handler: inboxRouter
    }
]

module.exports = (app) => {
    routes.forEach((r) => app.use(r.path, r.handler))
}