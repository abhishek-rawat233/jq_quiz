export class QuestionFactory {
  constructor(operandUpperLimit) {
    this.operandUpperLimit = operandUpperLimit;
    this.createExpression();
  }

  randInt = (minNumber, maxNumber) => {
    return Math.round(Math.random() * (maxNumber - minNumber) + minNumber);
  };

  questionCreator = () => {
    var operatorId = this.randInt(1,4);
    while ( this.secondOperand === 0 && operatorId === 2 ) {
      operatorId = this.randInt(1,4);
    }
    this.question = {};
    switch(operatorId) {
      case 1:
        this.operator = ' * ';
        this.answer = this.firstOperand * this.secondOperand;
      break;
      case 2:
        this.operator = ' / ';
        this.answer = Math.round(this.firstOperand / this.secondOperand);
      break;
      case 3:
        this.operator = ' + ';
        this.answer = this.firstOperand + this.secondOperand;
      break;
      case 4:
        this.operator = ' - ';
        this.answer = this.firstOperand - this.secondOperand;
      break;
    }
  };

  createExpression = () => {
    this.firstOperand = this.randInt(0, this.operandUpperLimit);
    this.secondOperand = this.randInt(0, this.operandUpperLimit);
    this.questionCreator();
  };

  getExpression = () => {
    return this.firstOperand + this.operator + this.secondOperand;
  };

  getAnswer = () => {
    return this.answer;
  };
}
