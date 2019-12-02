import axios from 'axios';

class ProductAPI {
  public static fetchAll(token: string) {
    return axios.get('/products', {
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default ProductAPI;
