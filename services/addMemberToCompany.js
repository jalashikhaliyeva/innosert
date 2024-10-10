import { instanceAxios } from "../shared/helpers/instanceAxios";

export const addMemberToCompany = async (email, token, companyId) => {
  try {
    const response = await instanceAxios.post(
      "me/addUser",
      { email: email }, 
      {
        headers: {
          Authorization: `Bearer ${token}`, //  token 
          'X-Company-ID': companyId, //  companyId 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error.response ? error.response.data : error);
    throw error;
  }
};
