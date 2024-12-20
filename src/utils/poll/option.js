import { nanoid } from "nanoid";

export class Option {
  constructor(id, num, value, voteNumber) {
    this.id = id;
    this.num = num;
    this.value = value;
    this.voteNumber = voteNumber;
  }

  static copy(option) {
    return new Option(option.id, option.num, option.value, option.voteNumber);
  }

  static empty(num) {
    return new Option(nanoid(), num, "", 0);
  }

  isEmpty() {
    return !this.value.trim();
  }
}
