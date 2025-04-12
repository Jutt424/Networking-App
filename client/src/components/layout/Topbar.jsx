import React from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../shared/Avatar';

export default function Topbar() {
  return (
    <header className="bg-gray-900  top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-lg md:text-xl font-bold text-cyan-400 cursor-pointer">
              EASY TRADE
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <ProfileIcon />
          </div>
        </nav>
      </div>
    </header>
  );
}
