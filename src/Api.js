// export const API_URL = 'http://192.168.31.145:4000';
export const API_URL = 'https://talkmatez-be-w97s.onrender.com';

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
};

export default Api;