import FlluppsApi from '../../api';

//Регистрация пользователя
/**
 * "email": "doe@dope.com",
    "password": "secured",
    "username": "johndoe"
 */
export const Registration = (data) => {
  return FlluppsApi.post('/signup', JSON.stringify(data), { withCredentials: true });
};

//Авторизация
export const Auth = (data) => {
  return FlluppsApi.post('/signin', JSON.stringify(data), { withCredentials: true });
};

//Восстановление акканута (Проверка пользователя)
export const CheckUser = (data) => {
  return FlluppsApi.post('/does_exists', JSON.stringify(data));
};

//Восстановление аккаунта
export const Recovery = (data) => {
  return FlluppsApi.post('/restore_pass', JSON.stringify(data));
};

//Токен Проверочка
export const Token = () => {
  return FlluppsApi.post('/token', JSON.stringify({ token: localStorage.getItem('token') }), {
    withCredentials: true,
  });
};
