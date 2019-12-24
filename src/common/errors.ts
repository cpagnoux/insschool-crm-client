import { AxiosError } from 'axios';

export const handleAxiosError = (
  error: AxiosError,
  message: string,
  setToken: (token: any) => void,
) => {
  console.error(message, error.message);

  if (error.response && error.response.status === 401) {
    sessionStorage.removeItem('token');
    setToken({});
  }
};
