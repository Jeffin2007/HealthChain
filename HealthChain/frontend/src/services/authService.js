import API from './api';

export async function login(username, password) {
  const res = await API.post('/auth/login', { username, password });
  return res.data?.data || res.data;
}
