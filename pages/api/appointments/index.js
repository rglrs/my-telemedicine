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

      // First verify the doctor exists in the Doctors table
      const doctor = await Doctor.findOne({
        where: { id: doctorId }
      });

      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }

      // Create appointment with verified doctor
      const newAppointment = await Appointment.create({
        patientId: userId,
        doctorId: doctor.id, // Use the verified doctor's ID
        date,
        status: 'pending'
      });

      // Return with more detailed response
      const appointmentWithDetails = await Appointment.findOne({
        where: { id: newAppointment.id },
        include: [
          { 
            model: Doctor,
            attributes: ['id', 'name'],
            include: [{ model: User, attributes: ['name'] }]
          },
          { 
            model: User, 
            as: 'Patient', 
            attributes: ['name'] 
          }
        ]
      });

      res.status(201).json({
        message: 'Appointment created successfully',
        appointment: appointmentWithDetails
      });
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