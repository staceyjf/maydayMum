import sendRequest from './send-request'

// the base path of the Express route 
const BASE_URL = '/api/accounts';

// export async function getNannyData() {
//    return sendRequest(`${BASE_URL}/nanny`);
// }

export async function getNannyAvailability() {
   return sendRequest(`${BASE_URL}/availability`);
}

export async function getParentData() {
   return sendRequest(`${BASE_URL}/parent`);
}

export async function updateNannyProfile(userData) {
   return sendRequest(`${BASE_URL}/nanny-profile`, 'POST', userData);
 }

export async function updateNannyAvailability(userData) {
   return sendRequest(`${BASE_URL}/nanny-availability`, 'POST', userData);
}
 
export async function updatedParent(userData) {
   return sendRequest(`${BASE_URL}/parent-profile`, 'POST', userData);
 }