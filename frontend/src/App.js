import React, { useState, useEffect } from 'react';
import './App.css';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

import FilterPanel from './components/FilterPanel';
import IntensityChart from './components/IntensityChart';
import LikelihoodChart from './components/LikelihoodChart';
import RelevanceChart from './components/RelevanceChart';
import YearChart from './components/YearChart';
import TopicsChart from './components/TopicsChart';
import DataTable from './components/DataTable';
import KPICards from './components/KPICards';
import Login from './components/Login';

// Add these animation variants before the App function
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchData();
    }
  }, [filters, isAuthenticated, token]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(`/api/data?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 401) {
        // Token expired or invalid
        handleLogout();
        return;
      }
      
      const result = await response.json();
      // Ensure result is an array
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set empty array on error to prevent undefined issues
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setData([]);
    setFilters({
      end_year: '',
      topic: '',
      sector: '',
      region: '',
      pestle: '',
      source: '',
      swot: '',
      country: '',
      city: ''
    });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.relative')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 dark:bg-dark-gradient dark:text-text-primary transition-colors duration-300">
        {/* Navigation */}
        <nav className="nav-container">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📊</span>
                <h1 className="font-extrabold text-2xl text-gray-800 dark:text-text-white">
                  Data Analytics Dashboard
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                <small className="text-gray-600 dark:text-text-primary">📈 Real-time Insights</small>
                <ThemeToggle />
                <div className="relative">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                    {data.length}
                  </span>
                </div>
                
                {/* User Dropdown - Updated Structure */}
                <div className="relative z-[999]"> {/* Added z-index here */}
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <span>👤</span>
                    <span>{user?.username || 'User'}</span>
                  </button>
                  
                  {dropdownOpen && (
                    <div 
                      className="admin-dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <small className="text-gray-600 dark:text-gray-400">{user?.email}</small>
                      </div>
                      <button 
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        🔐 Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-0">
            {/* Filter Sidebar */}
            <div className="w-full lg:w-80 lg:flex-shrink-0">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                className="sticky top-20"
              >
                <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
              </motion.div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 px-4">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* KPI Cards */}
                <motion.div variants={itemVariants}>
                  <KPICards data={data} loading={loading} />
                </motion.div>

                {/* Main Charts Row */}
                <motion.div variants={itemVariants}>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="dashboard-card h-full"
                    >
                      <div className="dashboard-card-header flex items-center">
                        <span className="mr-2">🔥</span>
                        <h5 className="mb-0 font-bold">Intensity Analytics</h5>
                      </div>
                      <div className="dashboard-card-body">
                        <IntensityChart filters={filters} />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="dashboard-card h-full"
                    >
                      <div className="dashboard-card-header flex items-center">
                        <span className="mr-2">📈</span>
                        <h5 className="mb-0 font-bold">Likelihood Trends</h5>
                      </div>
                      <div className="dashboard-card-body">
                        <LikelihoodChart filters={filters} />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Secondary Charts Row */}
                <motion.div variants={itemVariants}>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="dashboard-card h-full">
                      <div className="dashboard-card-header flex items-center">
                        <span className="mr-2">⭐</span>
                        <h5 className="mb-0 font-bold">Relevance Metrics</h5>
                      </div>
                      <div className="dashboard-card-body">
                        <RelevanceChart filters={filters} />
                      </div>
                    </div>
                    
                    <div className="dashboard-card h-full">
                      <div className="dashboard-card-header flex items-center">
                        <span className="mr-2">📅</span>
                        <h5 className="mb-0 font-bold">Temporal Analysis</h5>
                      </div>
                      <div className="dashboard-card-body">
                        <YearChart filters={filters} />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Topics Chart - Full Width */}
                <motion.div variants={itemVariants}>
                  <div className="dashboard-card">
                    <div className="dashboard-card-header flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="mr-2">💡</span>
                        <h5 className="mb-0 font-bold">Topics Distribution</h5>
                      </div>
                      <small className="text-gray-400 dark:text-text-primary opacity-75">Top 20 Most Discussed</small>
                    </div>
                    <div className="dashboard-card-body">
                      <TopicsChart filters={filters} />
                    </div>
                  </div>
                </motion.div>

                {/* Data Table - Full Width */}
                <motion.div variants={itemVariants}>
                  <div className="dashboard-card">
                    <div className="dashboard-card-header flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="mr-2">📊</span>
                        <h5 className="mb-0 font-bold">Detailed Data View</h5>
                      </div>
                      <div className="flex items-center gap-3">
                        <small className="text-gray-400 dark:text-text-primary opacity-75">
                          Showing {Math.min(100, data.length)} of {data.length} records
                        </small>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                          <small className="text-green-500">Live</small>
                        </div>
                      </div>
                    </div>
                    <div className="p-0">
                      <DataTable data={data} loading={loading} />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
