"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "@/app/globals.css";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ name: '', password: '', schedule: '', userId: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const adminData = typeof window !== "undefined" && JSON.parse(localStorage.getItem('admin'));

  useEffect(() => {
    if (!adminData) {
      router.push('/login');
      return;
    }

    const fetchDoctors = async () => {
      try {
        const response = await fetch(`/api/admin/doctors`);
        const data = await response.json();
        setDoctors(data.doctors || []);
      } catch (error) {
        setError('Failed to fetch doctors');
      }
    };

    fetchDoctors();
  }, []); // Pastikan fetchDoctors hanya dipanggil sekali saat komponen pertama kali di-mount

  const handleLogout = () => {
    localStorage.removeItem('admin');
    router.push('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/admin/doctors${editId ? `/${editId}` : ''}`, {
        method: editId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        if (editId) {
          setDoctors(doctors.map(doctor => (doctor.id === editId ? data.doctor : doctor)));
        } else {
          setDoctors([...doctors, data.doctor]);
        }
        setForm({ name: '', password: '', schedule: '', userId: '' });
        setEditId(null);
      } else {
        setError('Failed to submit form');
      }
    } catch (error) {
      setError('Failed to submit form');
    }
  };

  const handleEdit = (doctor) => {
    setForm({ name: doctor.name, password: '', schedule: doctor.schedule, userId: doctor.userId });
    setEditId(doctor.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/admin/doctors/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDoctors(doctors.filter(doctor => doctor.id !== id));
      } else {
        setError('Failed to delete doctor');
      }
    } catch (error) {
      setError('Failed to delete doctor');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img src="/logo.png" alt="Telemedicine" className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Admin - Manage Doctors</h2>
          </div>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          <div className="mt-8 space-y-6 text-black">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password (only if you want to change)"
                />
              </div>
              <div>
                <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">Schedule</label>
                <input
                  id="schedule"
                  name="schedule"
                  type="text"
                  value={form.schedule}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Schedule (e.g., Mon-Fri 9AM-5PM)"
                />
              </div>
              <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
                <input
                  id="userId"
                  name="userId"
                  type="number"
                  value={form.userId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {editId ? 'Update Doctor' : 'Add Doctor'}
                </button>
              </div>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <h3 className="text-xl font-bold mt-8">Doctors List</h3>
            <ul>
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <li key={doctor.id} className="mb-2 p-4 border rounded shadow flex justify-between items-center">
                    <div>
                      <p>Name: {doctor.name}</p>
                      <p>Schedule: {doctor.schedule}</p> {/* Tampilan jadwal tidak dalam format JSON */}
                      <p>User ID: {doctor.userId}</p>
                    </div>
                    <div>
                      <button onClick={() => handleEdit(doctor)} className="bg-blue-500 text-white p-2 rounded mr-2">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(doctor.id)} className="bg-red-500 text-white p-2 rounded">
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p>No doctors found</p>
              )}
            </ul>
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
