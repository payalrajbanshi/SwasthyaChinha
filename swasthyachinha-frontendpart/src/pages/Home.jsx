import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroImage from "../assets/hero-qr-doctor.png";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
    <Navbar />
      <main className="min-h-screen bg-white flex items-center">
        <section className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 gap-12 w-full">
          {/* LEFT TEXT SECTION */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-green-900 leading-tight">
                SwasthyaChinha <br />
                A Smart Digital <br />
                Prescription System
              </h1>
              <p className="text-gray-700 text-lg mt-4">
                Digital prescriptions, QR-based pickups, Medicine suggestions — all in one platform.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Link to="/login" className="bg-green-800 text-white text-center py-2 px-4 rounded hover:bg-green-900">
                Login as Patient
              </Link>
              <Link to="/login" className="bg-green-700 text-white text-center py-2 px-4 rounded hover:bg-green-800">
                Login as Doctor
              </Link>
              <Link to="/login" className="bg-green-500 text-white text-center py-2 px-4 rounded hover:bg-green-600">
                Login as Pharmacy
              </Link>
            </div>

            <p className="text-sm text-gray-500 pt-4">
              Start managing your health records digitally
            </p>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={heroImage}
              alt="Doctor with QR and Prescription"
              className="w-[90%] max-w-[400px] object-contain"
            />
          </div>
        </section>
      </main>

      {/* 🔽 FEATURES SECTION ADDED HERE 🔽 */}
      <section className="bg-[#f7f7f7] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Why SwasthyaChinha?
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 ">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="text-4xl mb-4">💊</div>
              <h3 className="font-semibold text-lg mb-2">Recommendation</h3>
              <p className="text-gray-600 text-sm">
                Medicine Recommendation according to the symptopms and disease
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="font-semibold text-lg mb-2">Digital Prescriptions</h3>
              <p className="text-gray-600 text-sm">
                Paperless, doctor-signed prescriptions with QR access.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-semibold text-lg mb-2">QR/OTP Verification</h3>
              <p className="text-gray-600 text-sm">
                Patients scan QR or use OTP to verify and access their meds.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-semibold text-lg mb-2">Medical History</h3>
              <p className="text-gray-600 text-sm">
                Records medical history.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* User Roles Section */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
      Who is SwasthyaChinha for?
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {/* Doctor */}
      <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
        <div className="text-4xl mb-2 text-green-700">👩‍⚕️</div>
        <h3 className="text-lg font-semibold mb-2">Doctors</h3>
        <p className="text-sm text-gray-600">Create and sign digital prescriptions for patients.</p>
      </div>

      {/* Patient */}
      <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
        <div className="text-4xl mb-2 text-green-700">🧑‍🦰</div>
        <h3 className="text-lg font-semibold mb-2">Patients</h3>
        <p className="text-sm text-gray-600">Receive prescriptions and reminders. Track medication history.</p>
      </div>

      {/* Pharmacist */}
      <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
        <div className="text-4xl mb-2 text-green-700">💊</div>
        <h3 className="text-lg font-semibold mb-2">Pharmacists</h3>
        <p className="text-sm text-gray-600">Scan QR codes and verify prescriptions before dispensing.</p>
      </div>

      {/* Hospital Admin */}
      <div className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition">
        <div className="text-4xl mb-2 text-green-700">🏥</div>
        <h3 className="text-lg font-semibold mb-2">Hospitals</h3>
        <p className="text-sm text-gray-600">Manage doctor and patient records, oversee digital health data.</p>
      </div>
    </div>
  </div>
</section>
{/* How It Works Section */}
<section className="bg-[#f7f7f7] py-16">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
      How It Works
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {/* Step 1 */}
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <div className="text-4xl mb-3">📝</div>
        <h3 className="font-semibold text-lg mb-1">Register/Login</h3>
        <p className="text-gray-600 text-sm">Start by registering as a patient, doctor, pharmacy, or hospital.</p>
      </div>

      {/* Step 2 */}
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <div className="text-4xl mb-3">👨‍⚕️</div>
        <h3 className="font-semibold text-lg mb-1">Doctor Prescribes</h3>
        <p className="text-gray-600 text-sm">Doctor logs in and creates a secure digital prescription.</p>
      </div>

      {/* Step 3 */}
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <div className="text-4xl mb-3">📲</div>
        <h3 className="font-semibold text-lg mb-1">QR Generated</h3>
        <p className="text-gray-600 text-sm">A unique QR code is generated for the patient’s prescription.</p>
      </div>

      {/* Step 4 */}
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
        <div className="text-4xl mb-3">💊</div>
        <h3 className="font-semibold text-lg mb-1">Pickup Medicine</h3>
        <p className="text-gray-600 text-sm">Patient visits pharmacy and gets medicine using QR or OTP.</p>
      </div>
    </div>
  </div>
</section>
{/* Testimonials Section */}
<section className="bg-white py-16">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
      What People Are Saying
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {/* Testimonial 1 */}
      <div className="bg-[#f7f7f7] rounded-xl shadow-md p-6">
        <p className="text-gray-700 italic mb-4">
          “SwasthyaChinha saved me from long queues at the hospital. I simply showed my QR code at the pharmacy and received my medicines quickly.”
        </p>
        <div className="text-sm font-semibold text-green-800">– Ramesh K., Patient</div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-[#f7f7f7] rounded-xl shadow-md p-6">
        <p className="text-gray-700 italic mb-4">
          “As a doctor, I can now issue digital prescriptions in seconds. No more paper, and the system is very intuitive.”
        </p>
        <div className="text-sm font-semibold text-green-800">– Dr. Sita Sharma</div>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-[#f7f7f7] rounded-xl shadow-md p-6">
        <p className="text-gray-700 italic mb-4">
          “Managing patients and doctors digitally through SwasthyaChinha makes our hospital workflow faster and smarter.”
        </p>
        <div className="text-sm font-semibold text-green-800">– Nabin K., Hospital Admin</div>
      </div>
    </div>
  </div>
</section>

<Footer />
    </>
  );
}