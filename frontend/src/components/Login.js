import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user, data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setCredentials({
      email: 'admin@dashboard.com',
      password: 'admin123'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      y: 0
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Login Card */}
      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-purple-500/25"
          variants={cardVariants}
          whileHover="hover"
        >
          {/* Logo and Title */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.div
              className="text-6xl mb-4 cursor-pointer inline-block"
              variants={logoVariants}
              whileHover="hover"
            >
              📊
            </motion.div>
            <motion.h2
              className="text-3xl font-bold text-white mb-2"
              variants={itemVariants}
            >
              Welcome Back
            </motion.h2>
            <motion.p
              className="text-gray-300 text-sm"
              variants={itemVariants}
            >
              Sign in to access your analytics dashboard
            </motion.p>
          </motion.div>

        
          <AnimatePresence>
            {error && (
              <motion.div
                className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-2">⚠️</span>
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

       
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <motion.input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your email"
                  required
                  whileFocus={{ scale: 1.02 }}
                  animate={{
                    borderColor: focusedField === 'email' ? '#8B5CF6' : 'rgba(255,255,255,0.2)'
                  }}
                />
                <motion.div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  animate={{
                    scale: focusedField === 'email' ? 1.2 : 1,
                    color: focusedField === 'email' ? '#8B5CF6' : '#9CA3AF'
                  }}
                >
                  ✉️
                </motion.div>
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <motion.input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your password"
                  required
                  whileFocus={{ scale: 1.02 }}
                  animate={{
                    borderColor: focusedField === 'password' ? '#8B5CF6' : 'rgba(255,255,255,0.2)'
                  }}
                />
                <motion.div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  animate={{
                    scale: focusedField === 'password' ? 1.2 : 1,
                    color: focusedField === 'password' ? '#8B5CF6' : '#9CA3AF'
                  }}
                >
                  🔒
                </motion.div>
              </div>
            </motion.div>

            {/* Sign In Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative flex items-center justify-center">
                  {loading ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </span>
              </motion.button>
            </motion.div>

            {/* Demo Button */}
            <motion.div className="text-center" variants={itemVariants}>
              <motion.button
                type="button"
                onClick={handleDemoLogin}
                className="text-sm text-purple-300 hover:text-white border border-purple-500/50 hover:border-purple-400 px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm"
                variants={buttonVariants}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
                whileTap={{ scale: 0.98 }}
              >
                Use Demo Credentials
              </motion.button>
            </motion.div>
          </form>

          {/* Footer */}
          <motion.div
            className="mt-8 text-center p-4 bg-white/5 rounded-xl border border-white/10"
            variants={itemVariants}
          >
            <p className="text-xs text-gray-400">
              Demo: <span className="text-purple-300 font-medium">admin@dashboard.com</span> / <span className="text-purple-300 font-medium">admin123</span>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
