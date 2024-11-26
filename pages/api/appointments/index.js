import Appointment from '../../../models/appointmentModel';
import Doctor from '../../../models/doctorModel';
import User from '../../../models/userModel';

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { doctorId, date } = req.body;
      const userId = req.headers.userid;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const newAppointment = await Appointment.create({
        patientId: userId,
        doctorId,
        date,
        status: 'pending',
      });
      res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } else if (req.method === 'GET') {
      const { doctorId } = req.query;

      const where = doctorId ? { doctorId } : {};
      const appointments = await Appointment.findAll({
        where,
        include: [
          { model: Doctor, attributes: ['name'] },
          { model: User, as: 'Patient', attributes: ['name'] },
        ],
      });
      res.status(200).json({ appointments });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Appointment error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
