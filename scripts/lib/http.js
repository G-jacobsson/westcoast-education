import { settings } from '../utilities/config.js';

export default class HttpClient {
  constructor() {
    this.baseUrl = settings.BASE_URL;
  }
  async get(endpoints, id) {
    try {
      const endpoint = settings.ENDPOINTS[endpoints];
      const url = `${this.baseUrl}${endpoint}${id ? `${id}` : ''}`;
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

  async add(inputData, endpoint) {
    try {
      console.log(inputData);
      const endpoints = settings.ENDPOINTS[endpoint];
      const url = `${this.baseUrl}/${endpoint}`;
      console.log(`Sending POST request to ${url}`);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Ett fel inträffade i add metoden: ${error}`);
    }
  }

  async update(inputData, endpoint, id) {
    try {
      const url = `${this.baseUrl}/${endpoint}/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Ett fel inträffade i update metoden: ${error}`);
    }
  }

  async delete(endpoints, id) {
    try {
      const endpoint = settings.ENDPOINTS[endpoints];
      const url = `${this.baseUrl}${endpoint}${id ? `${id}` : ''}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });
    } catch (error) {
      throw new Error(`Ett fel inträffade i delete metoden: ${error}`);
    }
  }
}
