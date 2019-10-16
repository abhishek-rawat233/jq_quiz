export class UserAnswer {
  constructor(userInput) {
    this.userAnswer = parseInt(userInput.val(), 10);
    if (this.userAnswer != 0 && !this.userAnswer){
      this.userAnswer = 'no answer provided';
    }
  }

  getUserAnswer = () => {
    return this.userAnswer;
  };
}
