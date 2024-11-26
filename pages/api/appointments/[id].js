import Appointment from '../../../models/appointmentModel';

export default async (req, res) => {
  try {
    const { id } = req.query;

    if (req.method === 'PATCH') {
      const { status } = req.body;

      if (!['pending', 'approved', 'declined'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }

      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }

      appointment.status = status;
      await appointment.save();

      res.status(200).json({ message: 'Appointment status updated successfully', appointment });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Appointment error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
