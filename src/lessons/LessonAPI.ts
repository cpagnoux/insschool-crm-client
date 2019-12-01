import axios from 'axios';

class LessonAPI {
  public static fetchAll(token: string) {
    return axios.get('/lessons', {
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default LessonAPI;
