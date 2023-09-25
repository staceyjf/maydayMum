import sendRequest from './send-request'

// the base path of the Express route 
const BASE_URL = '/api/users';

export async function signUp(userData) {
   return sendRequest(`${BASE_URL}`, 'POST', userData);
}

export async function login(credentials) {
   return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}