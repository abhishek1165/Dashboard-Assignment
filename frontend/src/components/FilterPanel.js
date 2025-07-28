import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useTheme } from '../contexts/ThemeContext';

const FilterPanel = ({ filters, onFilterChange }) => {
  const [filterOptions, setFilterOptions] = useState({
    sectors: [],
    regions: [],
    countries: [],
    topics: [],
    pestles: [],
    sources: [],
    swots: [],
    cities: [],
    years: []
  });

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/filters', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const options = await response.json();
      
      // Ensure all options are arrays
      const safeOptions = {
        sectors: Array.isArray(options?.sectors) ? options.sectors : [],
        regions: Array.isArray(options?.regions) ? options.regions : [],
        countries: Array.isArray(options?.countries) ? options.countries : [],
        topics: Array.isArray(options?.topics) ? options.topics : [],
        pestles: Array.isArray(options?.pestles) ? options.pestles : [],
        sources: Array.isArray(options?.sources) ? options.sources : [],
        swots: Array.isArray(options?.swots) ? options.swots : [],
        cities: Array.isArray(options?.cities) ? options.cities : [],
        years: Array.isArray(options?.years) ? options.years : []
      };
      
      setFilterOptions(safeOptions);
    } catch (error) {
      console.error('Error fetching filter options:', error);
      // Keep default empty arrays on error
    }
  };

  const handleInputChange = (field, value) => {
    const newFilters = {
      ...filters,
      [field]: value || ''
    };
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      end_year: '',
      topic: '',
      sector: '',
      region: '',
      pestle: '',
      source: '',
      swot: '',
      country: '',
      city: ''
    };
    onFilterChange(clearedFilters);
  };

  const formatOptionsForSelect = (options) => {
    if (!options || !Array.isArray(options)) {
      return [];
    }
    return options.map(option => ({
      value: option,
      label: option
    }));
  };

  const { theme, isDark } = useTheme();

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: isDark ? 'rgba(30, 33, 57, 0.8)' : 'rgba(255, 255, 255, 0.9)',
      borderColor: state.isFocused ? '#6F6BF3' : (isDark ? 'rgba(111, 107, 243, 0.3)' : 'rgba(156, 163, 175, 0.5)'),
      borderRadius: '8px',
      minHeight: '42px',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(111, 107, 243, 0.2)' : 'none',
      '&:hover': {
        borderColor: '#6F6BF3'
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDark ? '#1E2139' : '#ffffff',
      border: `1px solid ${isDark ? 'rgba(111, 107, 243, 0.3)' : 'rgba(156, 163, 175, 0.3)'}`,
      borderRadius: '8px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#6F6BF3' 
        : state.isFocused 
        ? 'rgba(111, 107, 243, 0.2)' 
        : 'transparent',
      color: isDark ? '#D0D4F1' : '#374151',
      '&:hover': {
        backgroundColor: 'rgba(111, 107, 243, 0.3)'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDark ? '#D0D4F1' : '#374151'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDark ? 'rgba(208, 212, 241, 0.6)' : 'rgba(107, 114, 128, 0.7)'
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#6F6BF3'
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: '#6F6BF3',
      '&:hover': {
        color: '#EC4899'
      }
    })
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 filter-panel">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-0">Filters</h5>
      </div>
      <div className="p-6 space-y-4">
        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Year</label>
          <Select
            value={filters.end_year ? { value: filters.end_year, label: filters.end_year } : null}
            onChange={(option) => handleInputChange('end_year', option?.value)}
            options={formatOptionsForSelect(filterOptions.years)}
            styles={customSelectStyles}
            isClearable
            placeholder="Select year..."
          />
        </div>

        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Topic</label>
          <Select
            value={filters.topic ? { value: filters.topic, label: filters.topic } : null}
            onChange={(option) => handleInputChange('topic', option?.value)}
            options={formatOptionsForSelect(filterOptions.topics)}
            styles={customSelectStyles}
            isClearable
            placeholder="Select topic..."
          />
        </div>

        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sector</label>
          <Select
            value={filters.sector ? { value: filters.sector, label: filters.sector } : null}
            onChange={(option) => handleInputChange('sector', option?.value)}
            options={formatOptionsForSelect(filterOptions.sectors)}
            styles={customSelectStyles}
            isClearable
            placeholder="Select sector..."
          />
        </div>

        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Region</label>
          <Select
            value={filters.region ? { value: filters.region, label: filters.region } : null}
            onChange={(option) => handleInputChange('region', option?.value)}
            options={formatOptionsForSelect(filterOptions.regions)}
            styles={customSelectStyles}
            isClearable
            placeholder="Select region..."
          />
        </div>

        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">PEST</label>
          <Select
            value={filters.pestle ? { value: filters.pestle, label: filters.pestle } : null}
            onChange={(option) => handleInputChange('pestle', option?.value)}
            options={formatOptionsForSelect(filterOptions.pestles)}
            styles={customSelectStyles}
            isClearable
            placeholder="Select PEST..."
          />
        </div>

        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Source</label>
          <Select
            value={filters.source ? { value: filters.source, label: filters.source } : null}
            onChange={(option) => handleInputChange('source', option?.value)}
            options={formatOptionsForSelect(filterOptions.sources)}
            styles={customSelectStyles}
            isClearable
            placeholder="Select source..."
          />
        </div>

        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SWOT</label>
          <Select
            value={filters.swot ? { value: filters.swot, label: filters.swot } : null}
            onChange={(option) => handleInputChange('swot', option?.value)}
            options={formatOptionsForSelect(filterOptions.swots)}
            styles={customSelectStyles}
            isClearable
            placeholder="Select SWOT..."
          />
        </div>

        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
          <Select
            value={filters.country ? { value: filters.country, label: filters.country } : null}
            onChange={(option) => handleInputChange('country', option?.value)}
            options={formatOptionsForSelect(filterOptions.countries)}
            styles={customSelectStyles}
            isClearable
            placeholder="Select country..."
          />
        </div>

        <div className="filter-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
          <Select
            value={filters.city ? { value: filters.city, label: filters.city } : null}
            onChange={(option) => handleInputChange('city', option?.value)}
            options={formatOptionsForSelect(filterOptions.cities)}
            styles={customSelectStyles}
            isClearable
            placeholder="Select city..."
          />
        </div>

        <button 
          onClick={clearFilters}
          className="w-full mt-4 px-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
