// DashboardController.js

import { fetchData } from '../models/ApiService';
import { fetchInnerData } from '../models/ApiService';
import { fetchPrintedData } from '../models/ApiService';
import { prepareData } from '../models/ApiService';
import { printData } from '../models/ApiService';

export const getDashboardData = async () => {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    throw error;
  }
};

export const getInnerData = async () => {
  try {
    const data = await fetchInnerData();
    return data;
  } catch (error) {
    console.error('Error getting inner data:', error);
    throw error;
  }
};

export const getPrintedData = async () => {
  try {
    const data = await fetchPrintedData();
    return data;
  } catch (error) {
    console.error('Error getting printed data:', error);
    throw error;
  }
};

export const prepareDashboardData = async (prepareValue) => {
    try {
      const preparedData = await prepareData(prepareValue);
      return preparedData;
    } catch (error) {
      console.error('Error preparing dashboard data:', error);
      throw error;
    }
};

export const printedDashboardData = async (printedValue) => {
    try {
      const printedData = await printData(printedValue);
      return printedData;
    } catch (error) {
      console.error('Error printing dashboard data:', error);
      throw error;
    }
};