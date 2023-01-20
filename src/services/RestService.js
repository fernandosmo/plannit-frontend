import axios from 'axios';

const RestService = {
  async POST(path, data) {
    const baseUrl = process.env.REACT_APP_API_URL;
    const parseUrl = baseUrl + path;
    try {
      const res = await axios.post(parseUrl, data);
      return res.data;
    } catch (e) {
      return e;
    }
  },
  async GET(path, auth) {
    const baseUrl = process.env.REACT_APP_API_URL;
    const parseUrl = baseUrl + path;
    const res = await axios.get(parseUrl, {
      headers: { authorization: `Bearer ${auth}` },
    });
    return res.data;
  },
  async DELETE(path) {
    const baseUrl = process.env.REACT_APP_API_URL;
    const parseUrl = baseUrl + path;
    const res = await axios.delete(parseUrl);
    return res.data;
  },
};
export default RestService;
