import { useEffect, useState } from 'react';

import { useTokenContext } from '../store';
import ResourceAPI, { Resource } from './ResourceAPI';
import { handleAxiosError } from './errors';

const useResourceCollection = (resource: Resource, path: string = resource) => {
  const [token, setToken] = useTokenContext();
  const [resourceCollection, setResourceCollection] = useState<any[]>([]);

  // Fetch resource collection from server.
  useEffect(() => {
    const fetchResourceCollection = async (accessToken: string) => {
      try {
        const res = await ResourceAPI.fetchAll(resource, accessToken);
        const data = res.data.map((item: any) => ({
          ...item,
          url: `/${path}/${item.id}`,
        }));
        setResourceCollection(data);
      } catch (e) {
        handleAxiosError(e, `Fetching of ${resource} failed:`, setToken);
      }
    };

    if (!token || !token.access_token) {
      return;
    }

    fetchResourceCollection(token.access_token);
  }, [resource, path, token, setToken]);

  return resourceCollection;
};

export default useResourceCollection;
