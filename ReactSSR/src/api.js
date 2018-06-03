import fetch from 'isomorphic-fetch';

export function fetchCircuits() {
  return fetch('http://localhost:20000/api')
    .then(res => res.json())
    .then(res => res.data);
}
