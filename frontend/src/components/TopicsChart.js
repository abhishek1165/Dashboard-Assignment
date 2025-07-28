import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Spinner } from 'react-bootstrap';

const TopicsChart = ({ filters }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/data/topics', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      const topics = data.map(item => item._id);
      const counts = data.map(item => item.count);
      const intensities = data.map(item => item.avgIntensity);
      
      setChartData({
        data: [
          {
            y: topics,
            x: counts,
            type: 'bar',
            orientation: 'h',
            marker: {
              color: intensities,
              colorscale: 'Viridis',
              showscale: true,
              colorbar: {
                title: 'Avg Intensity',
                len: 0.5
              }
            },
            name: 'Topic Count',
            hovertemplate: '<b>%{y}</b><br>Count: %{x}<br>Avg Intensity: %{marker.color:.1f}<extra></extra>'
          }
        ],
        layout: {
          autosize: true,
          margin: { l: 150, r: 60, t: 40, b: 60 },
          xaxis: {
            title: 'Count'
          },
          yaxis: {
            title: 'Topics',
            tickfont: {
              size: 10
            }
          },
          showlegend: false,
          plot_bgcolor: 'rgba(0,0,0,0)',
          paper_bgcolor: 'rgba(0,0,0,0)'
        }
      });
    } catch (error) {
      console.error('Error fetching topics data:', error);
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
    <div style={{ height: '400px' }}>
      <Plot
        data={chartData.data}
        layout={chartData.layout}
        style={{ width: '100%', height: '100%' }}
        config={{ responsive: true }}
      />
    </div>
  );
};

export default TopicsChart;
