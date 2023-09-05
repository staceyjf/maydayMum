//for DRY code
//can update to refactor to other frameworks etc
import { getToken } from "./users-service";

export default async function sendRequest(url, method = 'GET', payload = null) {
    // Fetch accepts an options object as the 2nd argument
    // used to include a data payload, set headers, etc. 
    const options = { method };
    if (payload) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload); // get the payload from res.body
    }
    // if there is a token
    const token = getToken();
    if (token) {
      // need to add Auth header (if there is no payload, we need another way to add a header)
      // logical OR assignment operator (only assign if there isn't a header)
      options.headers ||= {};
      options.headers.Authorization = `Bearer ${token}`;
    }

    // our fetch request
    const res = await fetch(url, options); // this is our result object 
    // res.ok will be false if the status code set to 4xx in the controller action
    if (res.ok) return res.json(); // this returns a promise and the promise will also resolve to data
    throw new Error('Bad Request');
  }