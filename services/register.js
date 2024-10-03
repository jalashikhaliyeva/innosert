
import { instanceAxios } from "@/shared/helpers/instanceAxios";

export const postRegisterData = async (firstName, lastName, email, password, mobile) => {
  try {
    const response = await instanceAxios({
      method: "POST",
      url: "register",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        mobile,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
