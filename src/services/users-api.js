const BASE_URL = '/api/users';

export function getAll() {
  return fetch(BASE_URL)
  .then(res => res.json());
}

export function create(user) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error creating user');
  });
}

export function update(user) {
  return fetch(`${BASE_URL}/${user.id}`, {
    method: 'PUT',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(user)
  }).then(res => {
    if (res.ok) return res.json();
    throw new Error('Error updating user');
  });
}

export function deleteOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  }).then(res => res.json());
}

