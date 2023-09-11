import * as usersAPI from './users-api'

export async function signUp(userData) {
  console.log('Sending userData to server:', userData);
    const token = await usersAPI.signUp(userData);
    localStorage.setItem('token', token);
    return getUser();
}

// save the token in the browsers local storage
export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {

    const token = localStorage.getItem('token');
    if (!token) return null;
    // Obtain the payload of the token
    const payload = JSON.parse(atob(token.split('.')[1]));
    // A JWT's exp is expressed in seconds, not milliseconds, so convert 
    // based on a what we have designated as the exp
    if (payload.ex * 1000 < Date.now()) {
      // Token has expired - remove it from localStorage
      localStorage.removeItem('token');
      return null;
    }
    return token;
  }

  export function getUser() {
    const token = getToken();
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }
