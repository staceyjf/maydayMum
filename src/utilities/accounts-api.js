import sendRequest from './send-request'

// the base path of the Express route 
const BASE_URL = '/api/accounts';

export async function getNannyData() {
   return sendRequest(`${BASE_URL}/nanny`);
}

export async function updateNannyProfile(userData) {
   return sendRequest(`${BASE_URL}/nanny-profile`, 'POST', userData);
 }

export async function updateParentProfile(accountData) {
   return sendRequest(`${BASE_URL}/parent-profile`, 'POST', accountData);
 }