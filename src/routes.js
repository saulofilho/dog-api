const { Router } = require('express');
// const User = require('./app/models/User');
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const FoodController = require('./app/controllers/FoodController');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

// routes.get('/', async (req, res) => {
//   const user = await User.create({
//     name: 'Saulo',
//     email: 'hello@saulofilho.com',
//     password_hash: '200288',
//   });

//   return res.json(user);
// });

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// routes.put('/users', authMiddleware, UserController.update);

// aplica o middleware em todas as rotas apos
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/food', FoodController.store);

module.exports = routes;
