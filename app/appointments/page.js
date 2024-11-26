"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "@/app/globals.css";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const userData = typeof window !== "undefined" && JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!userData) {
      router.push('/login');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/appointments?userId=${userData.id}`);
        const data = await response.json();
        setAppointments(data.appointments || []);
      } catch (error) {
        setError('Failed to fetch appointments');
      }
    };

    fetchAppointments();
  }, [userData, router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img src="/logo.png" alt="Telemedicine" className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Appointments</h2>
          </div>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          <div className="mt-8 space-y-6 text-black">  {/* Perubahan warna teks */}
            <h3 className="text-xl mb-4">Your Upcoming Appointments</h3>
            <ul>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <li key={appointment.id} className="mb-2 p-4 border rounded shadow">
                    Appointment with Dr. {appointment.Doctor ? appointment.Doctor.name : 'Unknown'} on {new Date(appointment.date).toLocaleString()}, Status: {appointment.status}
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
      <div className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
        <img src="/images/illustration.png" alt="Illustration" className="max-w-md" />
      </div>
    </div>
  );
}
