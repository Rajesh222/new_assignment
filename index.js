const express = require('express');
var cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
const userRouter = require('./api/users/user.router');
app.use(cors());
app.use(cookieParser());

app.use(express.json());

app.use('/api/users', userRouter);
const port = process.env.PORT || 5003;
app.listen(port, () => {
  console.log('server up and running on PORT :', port);
});
