export class Records {
  constructor() {
    this.totalCorrect = 0;
    this.totalIncorrect = 0;
    this.totalTimedOut = 0;
    this.wrongAnswerRecord = [];
  }

  newFeed = (outcome) => {
    switch(outcome) {
      case 1: this.totalCorrect++;
      break;
      case 0: this.totalIncorrect++;
      break;
      case -1: this.totalTimedOut++;
      break;
    }
  };

  getRecord = () => {
    return {
      correct: this.totalCorrect,
      incorrect: this.totalIncorrect,
      timedOut: this.totalTimedOut
    };
  };

  setAnswerRecord = (questionObj) => {
    this.wrongAnswerRecord.push(questionObj);
  };

  getAnswerRecord = () => {
    return this.wrongAnswerRecord;
  };
}
