const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
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

exports.fetchAllInnerData = async (req, res) => {
  try {
    const countAllData = await TFile.count({
      where: {
        flag: 0
      }
    });
    res.json({ message: 'Data in Station', count: countAllData });
  } catch (error) {
    console.error('Error fetch all data in station.', error.message);
    res.status(500).json({ message: 'Internal Server Error'});
  }
};

exports.fetchAllPrintedData = async (req, res) => {
  try {
    const countAllData = await TFile.count({
      where: {
        flag: 1
      }
    });
    res.json({ message: 'Data Printed', count: countAllData });
  } catch (error) {
    console.error('Error fetch all data printed.', error.message);
    res.status(500).json({ message: 'Internal Server Error'});
  }
};

exports.createCsvPrint = async (req, res) => {
  try {
    const inputLimit = parseInt(req.body.limit);

    const getData = await TFile.findAll({
      attributes: ['id', 'file', 'batch', 'workorder'],
      where: {
        flag: 0
      },
      limit: inputLimit || 5
    });

    // Define the data for CSV
    const csvData = getData.map((row) => ({
      id: row.id,
      file: row.file,
      batch: row.batch,
      workorder: row.workorder
    }));

    // Define the CSV writer
    const csvWriter = createCsvWriter({
      path: `./assets/csv/${uuidv4()}.csv`,
      header: [
        { id: 'file', title: 'File' },
        { id: 'batch', title: 'Batch' },
        { id: 'workorder', title: 'Work Order' }
      ]
    });

    // Write the data to the CSV file
    await csvWriter.writeRecords(csvData);

    // Update the flag of the data to 1
    const idsToUpdate = csvData.map((row) => row.file);
    console.log("ids :", idsToUpdate);
    for (const idToUpdate of idsToUpdate) {
      console.log("id : ", idToUpdate);
      await TFile.update({ flag: 1 }, { where: { file: idToUpdate } });
    }

    res.status(200).json({ message: 'Successfully created CSV' });
  } catch (error) {
    console.error('Error create CSV print.', error.message);
    res.status(500).json({ message: 'Internal Server Error'});
  }
};