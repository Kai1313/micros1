// ApiService.js

const apiUrl = 'http://127.0.0.1:3000';

export const fetchData = async () => {
  try {
    const response = await fetch(`${apiUrl}/users/api/getJson`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchInnerData = async () => {
  try {
    const response = await fetch(`${apiUrl}/users/api/getInner`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching inner data:', error);
    throw error;
  }
};

export const fetchPrintedData = async () => {
  try {
    const response = await fetch(`${apiUrl}/users/api/getPrinted`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Error fetching printed data:', error);
    throw error;
  }
};

export const prepareData = async (prepareAmount) => {
    try {
        // console.log(prepareAmount);
        const response = await fetch(`${apiUrl}/users/api/prepare?prepare=${prepareAmount}`);
        // console.log(`${apiUrl}/users/api/prepare?prepare=${prepareAmount}`);
      if (!response.ok) {
        throw new Error('Failed to prepare data');
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error preparing data:', error);
      throw error;
    }
};

export const printData = async (printAmount) => {
    try {
      const response = await fetch(`${apiUrl}/users/api/csvCreate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ limit: printAmount })
      });
      if (!response.ok) {
        throw new Error('Failed to print data');
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error printing data:', error);
      throw error;
    }
};