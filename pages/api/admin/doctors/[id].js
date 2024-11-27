import Doctor from '../../../../models/doctorModel';
import bcrypt from 'bcrypt';

export default async (req, res) => {
  try {
    const { id } = req.query;

    if (req.method === 'PUT') {
      const { name, password, schedule, userId } = req.body;

      const doctor = await Doctor.findByPk(id);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }

      doctor.name = name;
      if (password) {
        const hash = await bcrypt.hash(password, 10);
        doctor.password = hash;
      }
      doctor.schedule = schedule;
      doctor.userId = userId;
      await doctor.save();

      res.status(200).json({ message: 'Doctor updated successfully', doctor });
    } else if (req.method === 'DELETE') {
      const doctor = await Doctor.findByPk(id);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }

      await doctor.destroy();
      res.status(200).json({ message: 'Doctor deleted successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Doctor error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
