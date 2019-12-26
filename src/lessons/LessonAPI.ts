import axios from 'axios';

class LessonAPI {
  public static fetchBySeason(season: number, token: string) {
    return axios.get(`/lessons?seasonId=${season}`, {
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default LessonAPI;
