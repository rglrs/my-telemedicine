import Admin from '../../../models/adminModel';
import bcrypt from 'bcrypt';

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { name, password } = req.body;

      if (!name || !password) {
        return res.status(400).json({ message: 'Name and password are required' });
      }

      const hash = await bcrypt.hash(password, 10);
      const newAdmin = await Admin.create({ name, password: hash });

      res.status(201).json({ message: 'Admin added successfully', admin: newAdmin });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Admin error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
