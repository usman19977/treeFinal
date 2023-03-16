require('dotenv').config({
  path: './config.env',
});
const express = require('express');
var path = require('path');
var morgan = require('morgan');
const sequelize = require('./helpers/sequalize');
const socket = require('socket.io');
const ejs = require('ejs');
const app = express();
const cors = require('cors');
const multer = require('multer');
const routes = require('./routes/routes');
const user = require('./models/user');
const chat = require('./models/chat');
const Message = require('./models/message');
const globalErrorHandler = require('./helpers/globalErrorHandler');
const PORT = process.env.PORT || 3000;
const session = require('express-session');
require('colors');
app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

// product routes
app.use('/', routes);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    );
  },
});

const upload = multer({ storage });

const nodemailer = require('nodemailer');

app.post('/sendemail', upload.array('files'), (req, res, next) => {
  const output = `<h3>New Enquiry</h3>
    <ul>
        <li>Product name: ${req.body.product}</li>
        <li>Product sku: ${req.body.product_sku}</li>
        <li>Product id: ${req.body.product_id}</li>
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Quantity: ${req.body.quantity}</li>
        <li>Date: ${req.body.date}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'devTempForTesting@gmail.com',
      pass: 'xoulumvvdpnvfqnj',
    },
    tls: { rejectUnauthorized: false },
    debug: true,
  });
  // const body = req.body;
  const files = req.files;
  const mailOptions = {
    to: 'devTempForTesting@gmail.com',
    subject: `New enquiry from: ${req.body.name} - ${req.body.email}`,
    html: output,
    attachments: files,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.send('error');
    } else {
      console.log(info);
      res.send('success');
      // res.render("success");
    }
  });
});

//===================================================

// 404
app.use((req, res, next) => {
  res.status(404).render('404', { title: ' | 404' });
  next();
});

app.use(globalErrorHandler);

user.hasOne(chat, { onDelete: 'CASCADE' });
Message.belongsTo(chat, { constraints: true, onDelete: 'CASCADE' });
Message.belongsTo(user, { constraints: true, onDelete: 'CASCADE' });
chat.hasMany(Message);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    const server = app.listen(PORT, () => {
      console.log(
        `connected to mysql DB & listening for requests on port:${PORT}`
      );
    });

    const io = socket(server);

    io.on('connection', (socket) => {
      // I want to sent this socket to every route Controller
      console.log('connection made');
      io.sockets.emit('message', 'connected');
      socket.on('newMessage', async (data) => {
        console.log('data', data);
        const newMessage = await Message.create({
          isRead: false,
          message: data.message,
          date: new Date(),
          chatId: data.chatId,
          userId: data.userId,
        });

        io.sockets.emit('newMessage', {
          newMessage,
          chatId: data.chatId,
          userId: data.userId,
        });
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
