import { nanoid } from "nanoid";
import { Option } from "./option";

export class Poll {
  constructor(id, question, options) {
    this.id = id;
    this.question = question;
    this.options = options;
  }

  static copy(poll) {
    const options = [];
    poll.options.forEach(op => options.push(Option.copy(op)));

    return new Poll(poll.id, poll.question, options);
  }

  static empty(optionsNum = 2) {
    const options = [];
    for (let i = 0; i < optionsNum; i++) {
      options.push(Option.empty(i));
    }
    return new Poll(nanoid(), "", options);
  }

  addOption() {
    const newPoll = Poll.copy(this);
    newPoll.options.push(Option.empty(this.options.length));
    return newPoll;
  }

  removeOption(id) {
    const newOptions = [];
    let curNum = 0;
    for (const op of this.options) {
      if (op.id !== id) {
        const newOption = Option.copy(op);
        newOption.num = curNum++
        newOptions.push(newOption);
      }
    }

    const newPoll = Poll.copy(this);

    newPoll.options = newOptions;
    return newPoll;
  }

  updateOption(id, optionValue) {
    const newPoll = Poll.copy(this);
    newPoll.options.find(op => op.id === id).value = optionValue;
    return newPoll;
  }

  updateQuestion(question) {
    const newPoll = Poll.copy(this);
    newPoll.question = question;
    return newPoll;
  }

  isEmpty() {
    return !this.question.trim() && this.options.every(op => op.isEmpty());
  }
}
