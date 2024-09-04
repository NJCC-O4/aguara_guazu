exports.login = async (req, res) => {
    const { username, password } = req.body;
  // Aquí iría la lógica de autenticación
  if (username === 'admin' && password === '123456') {
    res.json({ success: true, token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};
