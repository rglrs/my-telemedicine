"use client";

import Image from "next/image";
import React from "react";
import "@/app/globals.css";

const HomePage = () => {
  return (
    <div className="bg-purple-100 text-gray-900 min-h-screen">
      <header className="bg-purple-100 py-6 px-10 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/logo.png" width={150} height={150} alt="Logo" className="w-12 h-12" />
          <h1 className="text-lg font-bold ml-2 text-[#6c2fb4]">
            Telemedicine
          </h1>
        </div>
        <nav className="flex items-center space-x-8">
          <a href="#" className="text-[#6c2fb4] font-semibold">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-[#6c2fb4]">
            Features
          </a>
          <a href="/doctor" className="text-gray-600 hover:text-[#6c2fb4]">
            Doctors
          </a>
          <a href="#" className="text-gray-600 hover:text-[#6c2fb4]">
            Appointments
          </a>
          <a href="/login" className="text-gray-600 hover:text-[#6c2fb4]">
            Login/Register
          </a>
          <a
            href="#"
            className="bg-gradient-to-r from-[#fa7ae5] to-[#9e7bff] text-white px-5 py-2 rounded-lg font-semibold"
          >
            Get Started
          </a>
        </nav>
      </header>
      <section className="px-10 py-16 bg-[#f4e9ff] flex flex-wrap lg:flex-nowrap items-center">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-[#2b2b2b] mb-6">
            Your Health, Our Priority
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Upload your X-ray/CT scan and get instant analysis from our
            AI-powered system. Book appointments with top specialists easily.
          </p>
          <div className="flex justify-center lg:justify-start space-x-4">
            <button className="bg-gradient-to-r from-[#fa7ae5] to-[#9e7bff] text-white px-6 py-3 rounded-lg font-semibold">
              Upload Scan Now
            </button>
            <button className="border border-[#9e7bff] text-[#9e7bff] px-6 py-3 rounded-lg font-semibold">
              Find a Doctor
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <Image src="/ct.png" width={300} height={300} alt="Medical Illustration" className="w-full max-w-md mx-auto lg:mx-0" />
        </div>
      </section>
      <section className="bg-gradient-to-r from-[#fa7ae5] to-[#9e7bff] py-16 px-10 text-white">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white text-gray-700 rounded-lg shadow-lg p-6 flex flex-col items-center text-center space-y-4">
            <i className="fas fa-search-plus text-4xl text-[#9e7bff]"></i>
            <h3 className="text-xl font-bold text-[#6c2fb4]">
              AI-Powered Analysis
            </h3>
            <p className="text-gray-600">
              Detect diseases instantly from X-ray and CT scans.
            </p>
          </div>
          <div className="bg-white text-gray-700 rounded-lg shadow-lg p-6 flex flex-col items-center text-center space-y-4">
            <i className="fas fa-shield-alt text-4xl text-[#9e7bff]"></i>
            <h3 className="text-xl font-bold text-[#6c2fb4]">
              Secure Data Management
            </h3>
            <p className="text-gray-600">
              We prioritize the security and privacy of your medical data.
            </p>
          </div>
          <div className="bg-white text-gray-700 rounded-lg shadow-lg p-6 flex flex-col items-center text-center space-y-4">
            <i className="fas fa-calendar-alt text-4xl text-[#9e7bff]"></i>
            <h3 className="text-xl font-bold text-[#6c2fb4]">
              Effortless Scheduling
            </h3>
            <p className="text-gray-600">
              Book appointments with doctors in just a few clicks.
            </p>
          </div>
        </div>
      </section>
      <section className="py-16 px-10 bg-[#f4e9ff]">
        <h2 className="text-3xl font-bold text-center text-[#2b2b2b] mb-12">
          How <span className="text-[#6c2fb4]">Telemedicine</span> Works
        </h2>
        <div className="flex flex-wrap lg:flex-nowrap items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <Image src="/how.png" width={300} height={300} alt="How It Works Illustration" className="w-full max-w-md mx-auto lg:mx-0" />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <div className="flex items-center space-x-4">
              <i className="fas fa-user-plus text-4xl text-[#fa7ae5]"></i>
              <div>
                <h4 className="text-xl font-bold">Register</h4>
                <p>Create your account.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <i className="fas fa-upload text-4xl text-[#fa7ae5]"></i>
              <div>
                <h4 className="text-xl font-bold">Upload Your Scan</h4>
                <p>X-ray or CT scan.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <i className="fas fa-file-medical text-4xl text-[#fa7ae5]"></i>
              <div>
                <h4 className="text-xl font-bold">Get Results</h4>
                <p>Receive instant predictions.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <i className="fas fa-calendar-check text-4xl text-[#fa7ae5]"></i>
              <div>
                <h4 className="text-xl font-bold">Book Appointment</h4>
                <p>Schedule a meeting with doctors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gradient-to-r from-[#fa7ae5] to-[#9e7bff] text-white py-10 px-10">
        <div className="flex flex-wrap justify-between space-y-6 lg:space-y-0">
          <div>
            <h3 className="text-2xl font-bold mb-4">Telemedicine</h3>
            <p className="text-sm">
              Kami berkomitmen untuk memberikan kemudahan akses layanan
              kesehatan yang cepat, aman, dan terpercaya, demi mewujudkan masa
              depan yang lebih sehat dan berkualitas untuk semua orang.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white text-lg">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white text-lg">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-white text-lg">
                <i className="fas fa-globe"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Appointments
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Login/Register
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Additional Information</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-sm">
          <p>© 2024 Telemedicine. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
