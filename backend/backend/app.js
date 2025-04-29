const express = require('express');
const app = express();
const sequelize = require('./config/database');
const adminRoutes = require('./routes/admin');

app.use(express.json());
app.use('/api/admin', adminRoutes);

sequelize.sync().then(() => {
  console.log('DB synced');
  app.listen(3001, () => console.log('Server running on http://localhost:3001'));
});