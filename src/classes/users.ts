import fetch from 'node-fetch'

export class Users {
  getUsers = () => fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
  getUser = (id: number) => fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.json())
}
