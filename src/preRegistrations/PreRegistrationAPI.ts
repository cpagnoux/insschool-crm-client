import axios from 'axios';

class PreRegistrationAPI {
  public static fetchAll(token: string) {
    return axios.get('/pre-registrations', {
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default PreRegistrationAPI;
