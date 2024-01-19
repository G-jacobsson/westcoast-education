import { settings } from '../utilities/config.js';

export default class Course {
  #id = 0;
  #imageUrl = '';
  #title = '';
  #description = '';
  #startDate = '';
  #endDate = '';
  #cost = '';

  constructor(id, imageUrl, title, description, startDate, endDate, cost) {
    this.#id = id;
    this.#imageUrl = imageUrl;
    this.#title = title;
    this.#description = description;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#cost = cost;
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
  get description() {
    return this.#description;
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
}
