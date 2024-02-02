export default class Course {
  #id: number;
  #imageUrl: string;
  #title: string;
  #startDate: string;
  #endDate: string;
  #cost: string;
  #description: string;
  #rating: number;

  constructor(
    id: number,
    imageUrl: string,
    title: string,
    startDate: string,
    endDate: string,
    cost: string,
    description: string,
    rating: number
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

  get id(): number {
    return this.#id;
  }
  get imageUrl(): string {
    return this.#imageUrl;
  }
  get title(): string {
    return this.#title;
  }
  get startDate(): string {
    return this.#startDate;
  }
  get endDate(): string {
    return this.#endDate;
  }
  get cost(): string {
    return this.#cost;
  }
  get description(): string {
    return this.#description;
  }
  get rating(): string {
    return this.#rating.toFixed(1) + ' / 5';
  }
}
