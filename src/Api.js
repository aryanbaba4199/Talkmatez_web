'use client'
import axios from "axios";

// export const API_URL = 'http://192.168.31.145:8080';
export const API_URL = 'https://talkmatez-be-1064837086369.asia-east2.run.app'


const Api = {
  getTutorsAPI: `${API_URL}/tutors/getTutors`,
  getCountriesAPI: `${API_URL}/helpers/countries`,
  createUserAPI: `${API_URL}/users/createUser`,
  getUserById: `${API_URL}/users/getUserDetails`,
  userLogInApi: `${API_URL}/users/login`,
  getLanguages : `${API_URL}/helpers/getLanguages`,
  getUsers: `${API_URL}/users/getUsers`,
  updateUser : `${API_URL}/users/updateUser`,

  //Tutors Api
  createTutor : `${API_URL}/tutors/createTutor`,
  removeTutor : `${API_URL}/admin/tutors/deleteTutor`,



  // calls Details 
  getCallLogs : `${API_URL}/users/admincalllogs`,
  getSocketLogs : `${API_URL}/admin/socketlogs`

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

export const posterFunction = async(uri, formData)=>{
  try{
    const res = await api.post(uri, formData)
    return res; 
  }catch(e){
    console.error(e);
    throw {details : e.response.data.message}
  }

}

export const removerFunction = (uri)=>{
  try{
    const res = api.delete(uri)
    return res; 
  }catch(e){
    console.error(e);
    throw e;
  }
}