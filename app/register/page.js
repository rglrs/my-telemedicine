"use client";

import Image from 'next/image';
import { useState } from 'react';
import "@/app/globals.css";

export default function Register() {
  const [username, setUsername] = useState(''); // Gunakan username
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState(''); // Tambahkan state untuk menyimpan pesan error
  const [success, setSuccess] = useState(''); // Tambahkan state untuk menyimpan pesan sukses

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role }), // Sertakan username dalam body request
    });

    if (response.ok) {
      setSuccess('Registration successful!');
      setError(''); // Reset error jika registrasi berhasil
    } else {
      const data = await response.json();
      setError(data.message || 'Registration failed.'); // Atur pesan error dari respons
      setSuccess(''); // Reset success jika registrasi gagal
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Image width={100} height={100} src="/logo.png" alt="Telemedicine" className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Daftar Akun</h2>
          </div>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Nama Pengguna</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nama Pengguna Anda"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password Anda"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Daftar
              </button>
            </div>
          </form>
          <div className="text-center text-sm text-black">
            Sudah punya akun? <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Login di sini</a>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
        <Image width={500} height={500} src="/logologin.png" alt="Illustration" className="max-w-md" />
      </div>
    </div>
  );
};
