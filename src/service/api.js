import axios from 'axios';
import { setCookie, getCookie } from '../cookieLib/cookieLib';

const FlluppsApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, //Здесь путь до бэка,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow': 'Origin, X-Requested-With, Content-Type, Accept',
  },
});

//Интерцепторы
// FlluppsApi.interceptors.request.use(
//     (config) => {
//         // Получаем токен
//         const token = localStorage.getItem('token'); //Получение токена из loacalStorage;
//         if (token) {
//             // Если JWT существует, добавляем его в заголовки запроса
//             setCookie('FlluppsSessionToken', token);
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

FlluppsApi.interceptors.response.use(
  (res) => {
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }

    return Promise.resolve(res.data || res);
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.pathname = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  },
);

export default FlluppsApi;
