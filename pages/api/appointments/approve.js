import { Appointment } from '../../../models/appointmentModel';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { appointmentId } = req.body;

    const appointment = await Appointment.findByPk(appointmentId);
    if (appointment) {
      // Logic untuk menyetujui appointment
      appointment.status = 'approved';
      await appointment.save();
      res.status(200).json({ message: 'Appointment approved', appointment });
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
