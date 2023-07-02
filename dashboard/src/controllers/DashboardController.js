// DashboardController.js

import { fetchData } from '../models/ApiService';
import { prepareData } from '../models/ApiService';

export const getDashboardData = async () => {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('Error getting dashboard data:', error);
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