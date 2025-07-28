import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Spinner } from 'react-bootstrap';

const LikelihoodChart = ({ filters }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/data/likelihood', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      const labels = data.map(item => item._id || 'Unknown');
      const likelihoodData = data.map(item => item.avgLikelihood);
      
      setChartData({
        data: [
          {
            x: labels,
            y: likelihoodData,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {
              color: '#36A2EB',
              size: 8
            },
            line: {
              color: '#36A2EB',
              width: 3
            },
            name: 'Average Likelihood'
          }
        ],
        layout: {
          autosize: true,
          margin: { l: 40, r: 40, t: 40, b: 80 },
          xaxis: {
            title: 'Region',
            tickangle: -45
          },
          yaxis: {
            title: 'Average Likelihood'
          },
          showlegend: false
        }
      });
    } catch (error) {
      console.error('Error fetching likelihood data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!chartData) {
    return <div>No data available</div>;
  }

  return (
    <div className="chart-container">
      <Plot
        data={chartData.data}
        layout={chartData.layout}
        style={{ width: '100%', height: '100%' }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default LikelihoodChart;
