import sendRequest from './send-request'

// the base path of the Express route 
const BASE_URL = '/api/accounts';

export async function updateUser(userData) {
   return sendRequest(`${BASE_URL}/update`,'POST', userData);
}

export async function getNannyAvailability() {
   return sendRequest(`${BASE_URL}/availability`);
}

export async function updateNannyAvailability(userData) {
   return sendRequest(`${BASE_URL}/nanny-availability`, 'POST', userData);
}