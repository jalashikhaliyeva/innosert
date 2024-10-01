import { instanceAxios } from '../shared/helpers/instanceAxios';

export const getServicesInfo = async () => {
  try {
    const response = await instanceAxios.get('services');
    return response.data;
  } catch (error) {
    console.error('Error fetching landing info:', error);
    throw error;
  }
};
