import axios from 'axios';

class ContactAPI {
  public static fetchAll(token: string) {
    return axios.get('/contacts', {
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default ContactAPI;
