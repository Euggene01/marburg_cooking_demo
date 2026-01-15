import axios from "axios";
import { ENDPOINTS } from "../config/api";


export const createEvent = async (payload, token) => {
   
  try {
    const response = await axios.post(ENDPOINTS.EVENTS, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
     
    // console.log(err)
    throw err;
  }
};
