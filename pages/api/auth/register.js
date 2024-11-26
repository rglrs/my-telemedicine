import User from '../../../models/userModel';
import bcrypt from 'bcrypt';

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { username, password, role } = req.body;
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ username, password: hashedPassword, role });

      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
