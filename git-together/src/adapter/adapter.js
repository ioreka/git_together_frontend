const createUser = (username, password) => {
  return fetch('http://localhost:3001/api/v1/users', {
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

export { createUser }




//questions:
// - does the fetch url need to include the /api/v1
// - changing the login/signup links to be buttons; for later
// -
// -
// -
