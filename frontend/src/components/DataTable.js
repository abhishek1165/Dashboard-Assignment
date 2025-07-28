import React from 'react';
import { Table, Spinner, Badge } from 'react-bootstrap';

const DataTable = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  
  const safeData = Array.isArray(data) ? data : [];

  if (safeData.length === 0) {
    return <div className="text-center p-4">No data available</div>;
  }

  const getBadgeVariant = (value) => {
    if (value >= 4) return 'success';
    if (value >= 2) return 'warning';
    return 'secondary';
  };

  return (
    <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <Table striped bordered hover size="sm">
        <thead className="table-dark sticky-top">
          <tr>
            <th>Title</th>
            <th>Sector</th>
            <th>Region</th>
            <th>Country</th>
            <th>Topic</th>
            <th>Intensity</th>
            <th>Likelihood</th>
            <th>Relevance</th>
            <th>Year</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {safeData.slice(0, 100).map((item, index) => (
            <tr key={index}>
              <td style={{ maxWidth: '200px' }}>
                <div 
                  className="text-truncate" 
                  title={item.title}
                  style={{ maxWidth: '200px' }}
                >
                  {item.title || 'N/A'}
                </div>
              </td>
              <td>
                {item.sector ? (
                  <Badge bg="primary" className="text-wrap">
                    {item.sector}
                  </Badge>
                ) : 'N/A'}
              </td>
              <td>{item.region || 'N/A'}</td>
              <td>{item.country || 'N/A'}</td>
              <td>
                {item.topic ? (
                  <Badge bg="info" className="text-wrap">
                    {item.topic}
                  </Badge>
                ) : 'N/A'}
              </td>
              <td>
                <Badge bg={getBadgeVariant(item.intensity)}>
                  {item.intensity || 0}
                </Badge>
              </td>
              <td>
                <Badge bg={getBadgeVariant(item.likelihood)}>
                  {item.likelihood || 0}
                </Badge>
              </td>
              <td>
                <Badge bg={getBadgeVariant(item.relevance)}>
                  {item.relevance || 0}
                </Badge>
              </td>
              <td>{item.end_year || 'N/A'}</td>
              <td>
                <div 
                  className="text-truncate" 
                  title={item.source}
                  style={{ maxWidth: '150px' }}
                >
                  {item.source || 'N/A'}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {safeData.length > 100 && (
        <div className="text-center text-muted p-2">
          Showing first 100 records out of {safeData.length} total records
        </div>
      )}
    </div>
  );
};

export default DataTable;
