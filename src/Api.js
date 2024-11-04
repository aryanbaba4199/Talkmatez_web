'use client'
import axios from "axios";

// export const API_URL = 'http://192.168.31.146:4000';
export const API_URL = 'https://465e-2409-40e5-16f-a004-4197-a9b2-287f-fa61.ngrok-free.app'
// export const API_URL = 'https://talkmatez-be-w97s.onrender.com';

const Api = {
  getTutorsAPI: `${API_URL}/tutors/getTutors`,
  getCountriesAPI: `${API_URL}/helpers/countries`,
  createUserAPI: `${API_URL}/users/createUser`,
  getUserById: `${API_URL}/users/getUserDetails`,
  userLogInApi: `${API_URL}/users/login`,
  getLanguages : `${API_URL}/helpers/getLanguages`,
  getUsers: `${API_URL}/users/getUsers`,
  updateUser : `${API_URL}/users/updateUser`,
  createTutor : `${API_URL}/tutors/createTutor`,



  // calls Details 
  getCallLogs : `${API_URL}/users/admincalllogs`

};

export default Api;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true' // Potentially bypass ngrok warning (unconfirmed)
  }
});
export const callerFunction = async(uri)=>{
  try{
    const res = await api.get(uri)
    return res; 
  }catch(e){
    console.error(e);
    throw e;
  }
}