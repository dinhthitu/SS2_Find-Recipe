const sequelize = require('./config/database');
const User = require('./models/User');

sequelize.sync({ force: true }).then(async () => {
  await User.create({ email: 'admin@example.com', name: 'Admin', role: 'admin' });
  console.log('Admin seeded');
  process.exit();
});