const User = require('../models/User');

exports.loginOrSignup = async (req, res) => {
  const { uid, email, displayName, email_verified } = req.user;
  const { name } = req.body;

  try {
    if (!email_verified) {
      return res.status(403).json({ success: false, message: 'Please verify your email first' });
    }

    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({
        email,
        name: name || displayName || 'User',
        role: email === 'admin@example.com' ? 'admin' : 'user',
      });
    }
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch (error) {
    console.error('Error in login/signup:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};