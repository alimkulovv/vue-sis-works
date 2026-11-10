import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000
})

export const getStudents = () => api.get('/users').then((res) => res.data.users)
export const getTasks = () => api.get('/todos').then((res) => res.data.todos)
export const getPosts = () => api.get('/posts').then((res) => res.data.posts)
