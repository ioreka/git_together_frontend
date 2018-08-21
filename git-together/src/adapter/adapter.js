const urlBase = `http://localhost:3008/api/v1`

const createUser = (username, password) => {
  return fetch(`${urlBase}/users`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  }).then(resp => resp.json())
}


const loginUser = (username, password) => {
  return fetch(`${urlBase}/login`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  }).then(resp => resp.json())
}

const getCurrentUser = (token) => {
  return fetch(`${urlBase}/current_user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
  }).then(resp => resp.json())
}

const getUserEvents = (id, token) => {
  return fetch(`${urlBase}/users/${id}/events`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  }).then(resp => resp.json())
  .then(json => console.log(json))
}

const setUserEvents = (id, token, events) => {
  return fetch(`${urlBase}/users/${id}/events`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    method: 'POST',
    body: JSON.stringify({
      events
    })
  }).then(resp => resp.json())
}



export {
  createUser,
  loginUser,
  getCurrentUser,
  getUserEvents,
  setUserEvents
}




//questions:
// - does the fetch url need to include the /api/v1
// - changing the login/signup links to be buttons; for later
// -
// -
// -
