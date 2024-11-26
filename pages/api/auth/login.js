import User from '../../../models/userModel';
import Doctor from '../../../models/doctorModel';
import bcrypt from 'bcrypt';

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { name, password } = req.body;

      // Coba login sebagai user
      const user = await User.findOne({ where: { name } });
      if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        // Jika gagal, coba login sebagai doctor
        const doctor = await Doctor.findOne({ where: { name } });
        if (doctor && await bcrypt.compare(password, doctor.password)) {
          res.status(200).json({ message: 'Login successful', doctor });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
