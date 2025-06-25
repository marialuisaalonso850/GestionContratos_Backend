require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.BD_CONNECTION_STRING,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
};
