const axios = require('axios');
const User = require('../models/userModel');
const TFile = require('../models/fileModel');

exports.getDataFromAPI = async (req, res) => {
  try {
    const response = await axios.get('http://127.0.0.1:5000/show');
    const data = response.data;
    console.log('Data:', data);
    
    // Render the 'show' view with the received data
    res.render('show', { data: data });
  } catch (error) {
    console.error('Error get data:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getJsonFromAPI = async (req, res) => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/show');
      const data = response.data;
      console.log('Data:', data);
      
      // Return the JSON data
      res.json(data);
    } catch (error) {
      console.error('Error get data:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getJsonPrepareFromAPI = async (req, res) => {
    const prepare = req.query.prepare || 10; // Default value of 10 if prepare parameter is not provided
  
    try {
      const response = await axios.get(`http://127.0.0.1:5000/data?prepare=${prepare}`);
      const data = response.data;
      console.log('Data:', data);

      // Insert the data into the MySQL database
      await TFile.bulkCreate(data);
  
      // Return the JSON data
      res.json(data);
    } catch (error) {
      console.error('Error get data:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};
  