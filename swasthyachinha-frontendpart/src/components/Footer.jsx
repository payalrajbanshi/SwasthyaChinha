import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import PrescriptionIcon from "../assets/prescription.png"; 
export default function Footer() {
  return (
    
    <footer className="bg-[#343a40] text-gray-300 pt-24 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Tagline */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={PrescriptionIcon} alt="Logo" className="w-6 h-6" />
            <span className="text-white font-bold text-xl">SwasthyaChinha</span>
          </div>
          <p className="text-sm text-gray-400">
            Transforming healthcare, one prescription at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
            <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <ul className="text-sm space-y-2 text-gray-400">
            <li>Email: support@swasthyachinha.com</li>
            <li>Phone: +977-9816871563</li>
            <li>Address: Jhapa-Bhadrapur, Nepal</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-12 border-t border-gray-600 pt-6">
        © {new Date().getFullYear()} SwasthyaChinha. All rights reserved.
      </div>
    </footer>
  );
}
