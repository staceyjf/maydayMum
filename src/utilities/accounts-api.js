import sendRequest from './send-request'

// the base path of the Express route 
const BASE_URL = '/api/accounts';

export async function updateUser(userData) {
   return sendRequest(`${BASE_URL}/update`,'POST', userData);
}