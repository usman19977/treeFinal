const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');
const Chat = require('../models/chat');
const User = require('../models/user');
const Message = require('../models/message');
const createToken = require('../helpers/createToken');
const catchAsync = require('../helpers/catchAsync');
// const sequelize = require('sequelize');
const db = require('../helpers/db');
const sequelize = require('../helpers/sequalize');
const { QueryTypes, QueryError } = require('sequelize');

router.get(
  '/chats/:id',
  catchAsync(async (req, res) => {
    const chatId = req.params.id;
    const chat = await Chat.findByPk(chatId);
    const messages = await Message.findAll({
      where: { chatId },
      order: [['createdAt', 'ASC']],
    });

    res.json({
      messages,
    });
  })
);

router.post(
  '/chat',
  catchAsync(async (req, res, next) => {
    const isAdmin = req.body.password;
    try {
      if (isAdmin && req.body.password !== process.env.ADMIN_PASSWORD) {
        return res
          .status(400)
          .json({ message: 'wrong password', status: 'error' });
      }
      let user = await User.findOne({
        where: { username: req.body.username },
      });

      console.log('user1', user);

      if (!user) {
        console.log('inside user.length');
        user = await User.create({
          username: req.body.username,
        });
        console.log('user.dataValues.id', user.dataValues.id);
        req.session.userId = user.dataValues.id;

        let chat;
        if (!isAdmin) {
          chat = await user.createChat({
            userId: user.dataValues.id,
          });
        }
      } else {
        req.session.userId = user.dataValues.id;
      }

      // console.log('user2', user);
      req.session.isLoggedIn = true;
      req.session.isAdmin = isAdmin;

      // *********************************************************

      let query;

      console.log('user', user);
      if (user.dataValues.username === 'admin')
        query = `SELECT c.id AS id , u.id AS user_id , u.username as username FROM products.chats c INNER JOIN products.users u ON c.userId = u.id`;
      else
        query = `SELECT c.id AS id , u.id AS user_id , u.username as username FROM products.chats c INNER JOIN products.users u ON c.userId = u.id where c.userId = ${req.session.userId}`;

      const chats = await sequelize.query(
        // 'select * from products.chats '
        query,
        { type: QueryTypes.SELECT }
      );

      let chat;
      if (!chats.length && user.dataValues.username !== 'admin') {
        chat = await user.createChat();
        chats = [chat];
      }

      if (!chats.length)
        res.json({
          message: 'You loggedin...',
          status: 'success',
          messages: [],
          isAdmin: !(user.dataValues.username === 'admin'),
          chats,
          userId: user.dataValues.id,
          username: user.dataValues.username,
        });

      console.log(
        'req.query.chat || chats[0]?.id',
        req.query.chat || chats[0]?.id
      );
      Message.findAll({ where: { chatId: chats[0]?.id } })
        .then((messages) => {
          res.json({
            message: 'You loggedin...',
            status: 'success',
            messages,
            isAdmin: !(user.dataValues.username === 'admin'),
            chats,
            userId: user.dataValues.id,
            username: user.dataValues.username,
          });
        })
        .catch((err) => {
          res.status(500).send(err);
          console.log(err);
        });
      // *********************************************************
    } catch (err) {
      console.log('err', err);
      res.status(500).json({
        url: undefined,
        category: undefined,
        message: err.message,
        status: 'error',
      });
    }
  })
);
router.get('/products/:category', controllers.product_category);
router.get('/products/:category/:sub_cat', controllers.product_subCategory);
router.get(
  '/products/:category/:sub_cat/:sub_cat_0',
  controllers.product_sub_subCategory
);
router.get('/details/:category/:id', controllers.product_details);
router.get('/details/promotions/:id', controllers.promo_details);
router.get('/', controllers.index);
router.get('/products', controllers.getAllProducts);

router.post('/products/:category', controllers.suggestion_product_category);
router.post('/searchAll', controllers.searchAll);
router.post(
  '/products/:category/:sub_cat',
  controllers.suggestion_product_subCategory
);
router.post(
  '/products/:category/:sub_cat/:sub_cat_0',
  controllers.suggestion_product_sub_subCategory
);

const middleware = async (req, res, next) => {
  if (req.query.search)
    return res.redirect(`/products/searchAll?search=${req.query.search}`);

  next();
};

router.post('/getDetails/:id', async (req, res) => {
  const { category } = req.body;

  console.log('req.body', req.body);

  res.json({ url: `/details/${category}/${req.params.id}` });
});

router.get('/terms', middleware, (req, res) => {
  res.render('terms', {
    title: ' | Terms & Conditions',
    url: req.originalUrl.split('?')[0],
    length: 0,
    products: [],
    colour_filter: [],
    category: '',
    userId: '',
    username: '',
  });
});
router.get('/about', middleware, (req, res) => {
  res.render('about', {
    title: ' | About Us',
    url: req.originalUrl.split('?')[0],
    length: 0,
    products: [],
    colour_filter: [],
    category: '',
    userId: '',
    username: '',
  });
});
router.get('/returns', middleware, (req, res) => {
  res.render('returns', {
    title: ' | Returns Policy',
    url: req.originalUrl.split('?')[0],
    length: 0,
    products: [],
    colour_filter: [],
    category: '',
    userId: '',
    username: '',
  });
});
router.get('/privacy', middleware, (req, res) => {
  res.render('privacy', {
    title: ' | Privacy & Cookies',
    url: req.originalUrl.split('?')[0],
    length: 0,
    products: [],
    colour_filter: [],
    category: '',
    userId: '',
    username: '',
  });
});

module.exports = router;
