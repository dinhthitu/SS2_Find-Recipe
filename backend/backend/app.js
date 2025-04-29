const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/database');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

// Cấu hình CORS để cho phép frontend từ localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // Chỉ cho phép origin này
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Các phương thức được phép
  allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
}));

app.use(express.json());
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

sequelize.sync().then(() => {
  console.log('DB synced');
  app.listen(3001, () => console.log('Server running on http://localhost:3001'));
});