import axios from 'axios';

class RoomAPI {
  public static fetchAll(token: string) {
    return axios.get('/rooms', {
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default RoomAPI;
