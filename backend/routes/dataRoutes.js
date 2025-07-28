const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// Get all data with filters
router.get('/data', async (req, res) => {
  try {
    const {
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      country,
      city,
      limit = 1000
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (end_year && end_year !== '') filter.end_year = end_year;
    if (topic && topic !== '') filter.topic = new RegExp(topic, 'i');
    if (sector && sector !== '') filter.sector = new RegExp(sector, 'i');
    if (region && region !== '') filter.region = new RegExp(region, 'i');
    if (pestle && pestle !== '') filter.pestle = new RegExp(pestle, 'i');
    if (source && source !== '') filter.source = new RegExp(source, 'i');
    if (swot && swot !== '') filter.swot = new RegExp(swot, 'i');
    if (country && country !== '') filter.country = new RegExp(country, 'i');
    if (city && city !== '') filter.city = new RegExp(city, 'i');

    const data = await Data.find(filter).limit(parseInt(limit));
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get data aggregated by intensity
router.get('/data/intensity', async (req, res) => {
  try {
    const data = await Data.aggregate([
      {
        $group: {
          _id: '$sector',
          avgIntensity: { $avg: '$intensity' },
          maxIntensity: { $max: '$intensity' },
          count: { $sum: 1 }
        }
      },
      { $sort: { avgIntensity: -1 } }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get data aggregated by likelihood
router.get('/data/likelihood', async (req, res) => {
  try {
    const data = await Data.aggregate([
      {
        $group: {
          _id: '$region',
          avgLikelihood: { $avg: '$likelihood' },
          count: { $sum: 1 }
        }
      },
      { $sort: { avgLikelihood: -1 } }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get data aggregated by relevance
router.get('/data/relevance', async (req, res) => {
  try {
    const data = await Data.aggregate([
      {
        $group: {
          _id: '$country',
          avgRelevance: { $avg: '$relevance' },
          count: { $sum: 1 }
        }
      },
      { $sort: { avgRelevance: -1 } },
      { $limit: 20 }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get data by year
router.get('/data/by-year', async (req, res) => {
  try {
    const data = await Data.aggregate([
      {
        $match: {
          end_year: { $ne: "", $exists: true }
        }
      },
      {
        $group: {
          _id: '$end_year',
          count: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' },
          avgLikelihood: { $avg: '$likelihood' },
          avgRelevance: { $avg: '$relevance' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get topics distribution
router.get('/data/topics', async (req, res) => {
  try {
    const data = await Data.aggregate([
      {
        $match: {
          topic: { $ne: "", $exists: true }
        }
      },
      {
        $group: {
          _id: '$topic',
          count: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get filter options
router.get('/filters', async (req, res) => {
  try {
    const [sectors, regions, countries, topics, pestles, sources, swots, cities, years] = await Promise.all([
      Data.distinct('sector'),
      Data.distinct('region'),
      Data.distinct('country'),
      Data.distinct('topic'),
      Data.distinct('pestle'),
      Data.distinct('source'),
      Data.distinct('swot'),
      Data.distinct('city'),
      Data.distinct('end_year')
    ]);

    res.json({
      sectors: sectors.filter(s => s !== ""),
      regions: regions.filter(r => r !== ""),
      countries: countries.filter(c => c !== ""),
      topics: topics.filter(t => t !== ""),
      pestles: pestles.filter(p => p !== ""),
      sources: sources.filter(s => s !== ""),
      swots: swots.filter(s => s !== ""),
      cities: cities.filter(c => c !== ""),
      years: years.filter(y => y !== "")
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
