import Doctor from '../../../models/doctorModel';
import bcrypt from 'bcrypt';

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { name, password, schedule, userId } = req.body;

      const hash = await bcrypt.hash(password, 10);
      const newDoctor = await Doctor.create({ name, password: hash, schedule, userId });

      res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
    } else if (req.method === 'GET') {
      const doctors = await Doctor.findAll();
      res.status(200).json({ doctors });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Doctor creation error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
