// service modules export business/ app logic such as storing and managing tokens
// service modules often depend on API modules for making AJAX requests to the server
import * as usersAPI from './users-api'

export async function signUp(userData) {
    const token = await usersAPI.signUp(userData);
    // persist the token by using the browser's local storage
    // only accepts strs
    // setItem takes two args - name of key & what we want to store
    localStorage.setItem('token', token);
    // TODO: still need to return user object from token instead
    // return token;
    // refactor
    return getUser();
}

// save the token in the browsers local storage
export async function login(userData) {
  const token = await usersAPI.login(userData);
  localStorage.setItem('token', token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {
    // getItem returns null if there's no string
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

  // don't need this in the real-world
  export function checkToken() {
    // need to use a .then (not everything is async await)
    return usersAPI.checkToken()
    .then(dateStr => new Date(dateStr)); //make it a date object via new Date()
    // promise resolves in the .then
  }