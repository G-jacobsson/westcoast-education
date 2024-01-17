import { settings } from '../utilities/config.js';

export default class HttpClient {
  constructor() {
    this.baseUrl = settings.BASE_URL;
  }
  async get(endpoints, id) {
    try {
      const endpoint = settings.ENDPOINTS[endpoints];
      const url = `${this.baseUrl}${endpoint}${id}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Error fetching data from', endpoint, ':', error);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async fetchData(endpoint) {
    const data = await this.get(endpoint);
    console.log(`${endpoint}:`, data);
    return data;
  }
}
