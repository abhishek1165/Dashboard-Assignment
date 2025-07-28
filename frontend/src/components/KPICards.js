import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const KPICards = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner animate-spin rounded-full h-8 w-8 border-b-2 border-purple-primary"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : [];

  const totalRecords = safeData.length;
  const avgIntensity = safeData.length > 0 
    ? (safeData.reduce((sum, item) => sum + (item.intensity || 0), 0) / safeData.length).toFixed(1)
    : 0;
  const avgLikelihood = safeData.length > 0 
    ? (safeData.reduce((sum, item) => sum + (item.likelihood || 0), 0) / safeData.length).toFixed(1)
    : 0;
  const avgRelevance = safeData.length > 0 
    ? (safeData.reduce((sum, item) => sum + (item.relevance || 0), 0) / safeData.length).toFixed(1)
    : 0;

  const uniqueCountries = new Set(safeData.filter(item => item.country).map(item => item.country)).size;
  const uniqueTopics = new Set(safeData.filter(item => item.topic).map(item => item.topic)).size;

  const kpiData = [
    {
      title: 'Total Records',
      value: totalRecords,
      icon: '📊',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Avg Intensity',
      value: avgIntensity,
      icon: '🔥',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Avg Likelihood',
      value: avgLikelihood,
      icon: '📈',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Avg Relevance',
      value: avgRelevance,
      icon: '⭐',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      title: 'Countries',
      value: uniqueCountries,
      icon: '🌍',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      title: 'Topics',
      value: uniqueTopics,
      icon: '💡',
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {kpiData.map((kpi, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          className="aspect-square"
        >
          <div 
            className="kpi-card h-full w-full text-center flex flex-col justify-center items-center p-4 relative overflow-hidden"
            style={{ background: kpi.color }}
          >
            <div className="text-3xl mb-2">
              {kpi.icon}
            </div>
            <div className="kpi-value text-2xl md:text-3xl font-extrabold mb-1 text-white">
              {kpi.value}
            </div>
            <div className="kpi-label text-xs uppercase tracking-wider text-white/90 font-medium">
              {kpi.title}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KPICards;
