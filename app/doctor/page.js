"use client";

import { useState, useEffect } from 'react';
import "@/app/globals.css";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    async function fetchDoctors() {
      const response = await fetch('/api/doctors');
      const data = await response.json();
      setDoctors(data.doctors);
    }
    fetchDoctors();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-6">Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id} className="mb-2 p-4 border rounded shadow">
            <h3 className="text-xl">{doctor.name}</h3>
            <p className="text-gray-700">{JSON.stringify(doctor.schedule)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
