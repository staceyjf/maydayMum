import sendRequest from './send-request'

// the base path of the Express route 
const BASE_URL = '/api/accounts';

export async function updatedNanny(userData) {
   return sendRequest(`${BASE_URL}/nanny-profile`, 'POST', userData);
 }

export async function updateNannyAvailability(userData) {
   return sendRequest(`${BASE_URL}/nanny-availability`, 'POST', userData);
}
 
export async function updatedParent(userData) {
   return sendRequest(`${BASE_URL}/parent-profile`, 'POST', userData);
 }