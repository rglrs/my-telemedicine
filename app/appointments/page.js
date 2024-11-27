"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "@/app/globals.css";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctorId: '', date: '', status: 'pending' });
  const [error, setError] = useState('');
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    if (!userData) return;

    const fetchData = async () => {
      await Promise.all([fetchAppointments(), fetchDoctors()]);
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/appointments?userId=${userData.id}`);
        const data = await response.json();
        setAppointments(data.appointments || []);
      } catch (error) {
        setError('Failed to fetch appointments');
      }
    };

    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/doctors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch doctors');
        const data = await response.json();
        setDoctors(data.doctors || []);
      } catch (error) {
        setError('Failed to fetch doctors');
        console.error(error);
      }
    };

    fetchAppointments();
    fetchDoctors();
    fetchData();
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData) {
      setError('User not logged in.');
      return;
    }
  
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'userid': userData.id
        },
        body: JSON.stringify({
          doctorId: parseInt(form.doctorId), // Ensure doctorId is a number
          date: form.date
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        setAppointments([...appointments, data.appointment]);
        setForm({ doctorId: '', date: '', status: 'pending' });
        setError(''); // Clear any existing errors
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create appointment.');
      }
    } catch (error) {
      setError('Failed to create appointment. Please try again.');
      console.error(error);
    }
  };

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
          <div className="mt-8 space-y-6 text-black">
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
            <form onSubmit={handleSubmit} className="space-y-4 mt-8">
              <div>
                <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">Doctor</label>
                <select
                  id="doctorId"
                  name="doctorId"
                  required
                  value={form.doctorId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  id="date"
                  name="date"
                  type="datetime-local"
                  required
                  value={form.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Create Appointment
                </button>
              </div>
            </form>
            <div className="text-center mt-8">
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