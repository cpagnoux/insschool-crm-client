import axios from 'axios';

class AuthAPI {
  public static login(email: string, password: string) {
    return axios.post('/auth/login', {
      email,
      password,
    }, {
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  public static me(token: string) {
    return axios.post('/auth/me', null, {
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default AuthAPI;
