// import { instanceAxios } from "@/shared/helpers/instanceAxios";

// export const postRegisterData = async () => {
//   try {
//     const response = await instanceAxios({
//       method: "POST",
//       url: "register",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching about info:", error);
//     throw error;
//   }
// };


import { instanceAxios } from "@/shared/helpers/instanceAxios";

export const postRegisterData = async (firstName, lastName, email, password) => {
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
      },
    });

    if (response.data.status === "success") {
      const token = response.data.data.access_token;
      localStorage.setItem("token", token);
      alert("Registration successful!");
      // Assuming you have access to the router here
      router.push("/login");
    } else {
      alert("Registration failed.");
    }

    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
