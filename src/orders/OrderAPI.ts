import axios from 'axios';

class OrderAPI {
  public static fetchAll(token: string) {
    return axios.get('/orders', {
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default OrderAPI;
