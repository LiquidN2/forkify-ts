import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://forkify-api.herokuapp.com/api/v2',
  timeout: 10000,
});

export const getJSON = async (url: string) => {
  try {
    const res = await client.get(url);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
