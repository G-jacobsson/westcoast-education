import { settings } from '../utilities/config.js';

export default class Course {
  #id = 0;
  #imageUrl = '';
  #title = '';
  #startDate = '';
  #endDate = '';
  #cost = '';
  #description = '';

  constructor(id, imageUrl, title, startDate, endDate, cost, description = '') {
    this.#id = id;
    this.#imageUrl = imageUrl;
    this.#title = title;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#cost = cost;
    this.#description = description;
  }

  get id() {
    return this.#id;
  }
  get imageUrl() {
    return this.#imageUrl;
  }
  get title() {
    return this.#title;
  }
  get startDate() {
    return this.#startDate;
  }
  get endDate() {
    return this.#endDate;
  }
  get cost() {
    return this.#cost;
  }
  get description() {
    return this.#description;
  }
}
