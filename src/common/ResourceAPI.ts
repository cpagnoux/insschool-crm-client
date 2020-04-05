import axios from 'axios';

export type Resource =
  | 'contacts'
  | 'lessons'
  | 'orders'
  | 'pre-registrations'
  | 'products'
  | 'rooms'
  | 'seasons'
  | 'teachers';

class ResourceAPI {
  public static fetchAll(resource: Resource, token: string) {
    return axios.get(
      `/${resource}`,
      this.getAxiosConfig(token),
    );
  }

  public static fetchBySeason(
    resource: Resource,
    season: number,
    token: string,
  ) {
    return axios.get(
      `/${resource}?seasonId=${season}`,
      this.getAxiosConfig(token),
    );
  }

  public static fetch(resource: Resource, id: number, token: string) {
    return axios.get(
      `/${resource}/${id}`,
      this.getAxiosConfig(token),
    );
  }

  public static post(resource: Resource, body: any, token: string) {
    return axios.post(
      `/${resource}`,
      body,
      this.getAxiosConfig(token),
    );
  }

  private static getAxiosConfig(token: string) {
    return {
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  }
}

export default ResourceAPI;
