const User = require('../models/User');

exports.loginOrSignup = async (req, res) => {
  const { uid, email, displayName } = req.user; // Lấy từ token Firebase

  try {
    let user = await User.findOne({ where: { email } });
    if (!user) {
      // Nếu người dùng chưa tồn tại, tạo mới
      user = await User.create({
        email,
        name: displayName || 'User',
        role: email === 'admin@example.com' ? 'admin' : 'user', // Gán quyền admin nếu email khớp
      });
    }
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (error) {
    console.error('Error in login/signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
};