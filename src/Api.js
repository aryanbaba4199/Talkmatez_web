"use client";
import axios from "axios";

// export const API_URL = "http://192.168.31.105:8080";
export const API_URL = 'https://talkmatez-be-1064837086369.asia-east2.run.app'

const Api = {
  getTutorsAPI: `${API_URL}/tutors/getTutors`,
  getCountriesAPI: `${API_URL}/helpers/countries`,
  createUserAPI: `${API_URL}/users/createUser`,
  getUserById: `${API_URL}/users/getUserDetails`,
  userLogInApi: `${API_URL}/users/login`,
  login: `${API_URL}/admin/login`,

  getUsers: `${API_URL}/users/getUsers`,
  updateUser: `${API_URL}/users/updateUser`,

  //Tutors Api
  createTutor: `${API_URL}/tutors/createTutor`,
  removeTutor: `${API_URL}/admin/tutors/deleteTutor`,
  updateTutor: `${API_URL}/admin/tutors/updateTutor`,

  // calls Details
  getCallLogs: `${API_URL}/users/admincalllogs`,
  getSocketLogs: `${API_URL}/admin/socketlogs`,

  // Languages
  deleteLanguage: `${API_URL}/helpers/deleteLanguage`,
  getLanguages: `${API_URL}/helpers/getLanguages`,
  createLanguage: `${API_URL}/helpers/createLanguages`,

  // Guides
  getGuides: `${API_URL}/helpers/getGuide`,
  createGuide: `${API_URL}/helpers/createGuide`,
  deleteGuide: `${API_URL}/helpers/deleteGuide`,

  //country
  getCountries: `${API_URL}/helpers/getCountry`,
  createCountry: `${API_URL}/helpers/createCountry`,
  deleteCountry: `${API_URL}/helpers/deleteCountry`,

  //Packages
  getPackages: `${API_URL}/admin/packages/getPackage`,
  createPackage: `${API_URL}/admin/packages/createPackage`,
  deletePackage: `${API_URL}/admin/packages/deletePackage`,
  updatePackage: `${API_URL}/admin/packages/updatePackage`,

  //users
  addCoins: `${API_URL}/admin/users/updateCoinsByAdmin`,
  removeUser: `${API_URL}/users/removeUser`,

  //sliders

  sliderApi: `${API_URL}/admin/sliders`,

  // transaction
  transaction: `${API_URL}/admin/transactions`,
  txnById: `${API_URL}/admin/transactionById`,
};

export default Api;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "ngrok-skip-browser-warning": "true", // Potentially bypass ngrok warning (unconfirmed)
  },
});
export const callerFunction = async (uri) => {
  
  try {
    const token = localStorage.getItem("token");
    const res = await api.get(uri, {headers : {
      Authorization : `Bearer ${token}`
    }});
    return res;
  } catch (e) {
    console.error(e);
    throw e.message;
  }
};

export const posterFunction = async (uri, formData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.post(uri, formData, {headers : {
      Authorization : `Bearer ${token}`
    }});
    return res;
  } catch (e) {
    console.error(e);
    throw { details: e?.response?.data?.message };
  }
};

export const removerFunction = (uri) => {
  try {
    const token = localStorage.getItem("token");
    const res = api.delete(uri, {headers : {
      Authorization : `Bearer ${token}`
    }});
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const updaterFunction = (uri, formData) => {
  try {
    const token = localStorage.getItem("token");
    const res = axios.put(uri, formData, {headers : {
      Authorization : `Bearer ${token}`
    }});
    return res;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
