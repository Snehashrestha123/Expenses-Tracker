// import axios from "axios";

// const BASE_URL = "http://localhost:8000/api/v2";

// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 8000
// }); 

// // EXPENSE APIS

// export const fetchExpenses = async () => {
//   const res = await api.get("/expense");
//   return (res.data && res.data.data) || [];
// };

// export const createExpense = async () => {
//   const res = await api.post("/expense");
//   return (res.data && res.data.data) || [];
// };

// export const updateExpense = async (id, payload) => {
//   const res = await api.put(`/expense/${id}`, payload);
//   return (res.data && res.data.data) || [];
// };

// export const deleteExpense = async (id) => {
//   const res = await api.delete(`/expense/${id}`);
//   return res.data || null;
// };






// api.js
// import axios from "axios";

// const BASE_URL = "http://localhost:8000/api/v2";

// const api = axios.create({ baseURL: BASE_URL, timeout: 8000 });

// export const fetchExpenses = async () => {
//   const res = await api.get("/expense");
//   return res.data?.data || [];
// };

// export const createExpense = async (payload) => {
//   const res = await api.post("/expense", payload);
//   return res.data?.data;
// };

// export const updateExpense = async (id, payload) => {
//   const res = await api.put(`/expense/${id}`, payload);
//   return res.data?.data;
// };

// export const deleteExpense = async (id) => {
//   const res = await api.delete(`/expense/${id}`);
//   return res.data;
// };










// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v2/expense';

// Fetch all expenses
export const fetchExpenses = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err) {
    console.error('Fetch error:', err);
    throw err;
  }
};

// Create a new expense
export const createExpense = async (payload) => {
  try {
    const res = await axios.post(BASE_URL, payload);
    return res.data;
  } catch (err) {
    console.error('Create error:', err);
    throw err;
  }
};

// Update an expense
export const updateExpense = async (id, payload) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, payload);
    return res.data;
  } catch (err) {
    console.error('Update error:', err);
    throw err;
  }
};

// Delete an expense
export const deleteExpense = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error('Delete error:', err);
    throw err;
  }
};














