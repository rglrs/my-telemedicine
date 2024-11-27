import Admin from '../../../models/adminModel';
import bcrypt from 'bcrypt';

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { name, password } = req.body;

      const admin = await Admin.findOne({ where: { name } });
      if (admin && await bcrypt.compare(password, admin.password)) {
        res.status(200).json({ message: 'Login successful', admin });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
