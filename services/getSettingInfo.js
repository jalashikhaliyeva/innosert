// services/landingService.js
import { instanceAxios } from '../shared/helpers/instanceAxios';

export const getSettingInfo = async () => {
  try {
    const response = await instanceAxios.get('settings');
    return response.data;
  } catch (error) {
    console.error('Error fetching landing info:', error);
    throw error;
  }
};
