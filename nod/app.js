const express = require('express');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/users', userRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection error:', error);
});
