import sendRequest from './send-request'

// the base path of the Express route 
const BASE_URL = '/api/team';

export async function getAllNannies() {
   return sendRequest (`${BASE_URL}/nannies`);
}

export async function createBooking() {
   return sendRequest(`${BASE_URL}/booking`);
}

export async function addNannyToBooking(nanny) {
   return sendRequest(`${BASE_URL}/add-nanny`, 'POST', nanny);
}

export async function updateBooking(booking) {
   return sendRequest(`${BASE_URL}/updateBooking`, 'POST', booking );
 }
