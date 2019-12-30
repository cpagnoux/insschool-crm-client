import axios from 'axios';

class TeacherAPI {
  public static fetchAll(token: string) {
    return axios.get('/teachers', {
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public static fetch(id: number, token: string) {
    return axios.get(`/teachers/${id}`, {
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default TeacherAPI;
