export default class Course {
  #id = 0;
  #imageUrl = '';
  #title = '';
  #startDate = '';
  #endDate = '';
  #cost = '';
  #description = '';
  #rating = 5;

  constructor(
    id,
    imageUrl,
    title,
    startDate,
    endDate,
    cost,
    description,
    rating
  ) {
    this.#id = id;
    this.#imageUrl = imageUrl;
    this.#title = title;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#cost = cost;
    this.#description = description;
    this.#rating = rating;
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
  get rating() {
    return this.#rating.toFixed(1) + ' / 5';
  }
}
