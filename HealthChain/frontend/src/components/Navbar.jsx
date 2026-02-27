import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <motion.header
      initial={{ y: -14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="premium-panel rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between">
          <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer select-none" role="button" aria-label="Go to home">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold" style={{ background: 'linear-gradient(120deg,#ff7d7d,#c81f1f)', color: 'white', boxShadow: '0 10px 28px rgba(200,31,31,0.28)' }}>
              HC
            </div>
            <div className="text-lg font-semibold text-hc-700">HealthChain</div>
          </div>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <motion.div whileHover={{ y: -3 }} className="nav-link text-sm text-gray-700"><Link to="/">Home</Link></motion.div>
            <motion.div whileHover={{ y: -3 }} className="nav-link text-sm text-gray-700"><Link to="/about">About</Link></motion.div>
            <motion.div whileHover={{ y: -3 }} className="nav-link text-sm text-gray-700"><Link to="/select-role">Sign In</Link></motion.div>
          </nav>

          <div className="hidden md:block">
            {isLoggedIn ? (
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={handleLogout} className="btn-gloss px-5 py-2 rounded-full text-sm" aria-label="Logout">
                Logout
              </motion.button>
            ) : (
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/select-role')} className="btn-gloss px-5 py-2 rounded-full text-sm" aria-label="Get started">
                Get Started
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default React.memo(Navbar);
