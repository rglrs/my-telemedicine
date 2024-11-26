"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "@/app/globals.css";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const doctorData = typeof window !== "undefined" && JSON.parse(localStorage.getItem('doctor'));

  useEffect(() => {
    if (!doctorData) {
      router.push('/login');
      return;
    }

    setDoctor(doctorData);

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/appointments?doctorId=${doctorData.id}`);
        const data = await response.json();
        setAppointments(data.appointments || []);
      } catch (error) {
        setError('Failed to fetch appointments');
      }
    };

    fetchAppointments();
  }, []); // Hanya dipanggil sekali saat komponen di-mount

  const handleLogout = () => {
    localStorage.removeItem('doctor');
    router.push('/login');
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const updatedAppointment = await response.json();
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === id ? updatedAppointment.appointment : appointment
          )
        );
      } else {
        setError('Failed to update status');
      }
    } catch (error) {
      setError('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Doctor Dashboard</h2>
          </div>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          <div className="mt-8 space-y-6 text-black">  {/* Perubahan warna teks */}
            {doctor && (
              <div className="mb-6">
                <h3 className="text-xl">Welcome, Dr. {doctor.name}</h3>
                <p>Here is the overview of your upcoming appointments:</p>
              </div>
            )}
            <h3 className="text-xl mb-4">Upcoming Appointments</h3>
            <ul>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <li key={appointment.id} className="mb-2 p-4 border rounded shadow">
                    Appointment with {appointment.Patient ? appointment.Patient.name : 'Unknown'} on {new Date(appointment.date).toLocaleString()}, Status: {appointment.status}
                    <div className="mt-2">
                      <button
                        onClick={() => updateStatus(appointment.id, 'approved')}
                        className="bg-green-500 text-white p-2 rounded mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(appointment.id, 'declined')}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Decline
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p>No upcoming appointments</p>
              )}
            </ul>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="text-center">
              <button onClick={handleLogout} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
