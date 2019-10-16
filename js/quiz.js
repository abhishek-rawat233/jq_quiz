import {QuestionFactory} from './question_maker.js';
import {Records} from './user_record.js';
import {UserAnswer} from './user_answer.js';

export class Quiz {
  constructor(selectors) {
    this.container = $(selectors.container);
    this.totalQuestions = selectors.totalQuestions;
    this.totalCorrect = this.container.find(selectors.totalCorrectId);
    this.totalIncorrect = this.container.find(selectors.totalIncorrectId);
    this.totalTimedOut = this.container.find(selectors.totalTimedOutId);
    this.questionCounter = 0;
    this.questionContainer = this.container.find(selectors.questionContainerId);
    this.timerEle = this.container.find(selectors.timerId);
    this.timerDuration = selectors.timerDuration;
    this.userAnswerField = this.container.find(selectors.answerId);
    this.nextButton = this.container.find(selectors.nextEle);
    this.quizContainer = this.container.find(selectors.quizContainer);
    this.operandUpperLimit = selectors.operandUpperLimit;
    this.record = new Records();
  }

  setTimer = (counter) => {
    this.timeOutFlag = false;
    this.timerEle.text(counter);
    if (counter) {
      this.timer = setTimeout(this.setTimer, 1000, --counter);
    } else {
      this.timeOutFlag = true;
      this.userAnswerField.attr('disabled', true);
    }
  };

  loadQuestion = () => {
    this.question = new QuestionFactory(this.operandUpperLimit);
    this.questionContainer.text(this.question.getExpression() + ' ?');
    this.questionCounter++;
    this.userAnswerField.prop('disabled', false).val('');
    this.setTimer(this.timerDuration);
  };

  compareResult(correctAnswer) {
    this.userAnswer = new UserAnswer(this.userAnswerField);
    return this.userAnswer.getUserAnswer() === this.question.getAnswer() ? 1 : 0;
  }

  recordSetup = () => {
    if (this.timeOutFlag) {
      var outcome = -1;
    } else {
      var outcome = this.compareResult();
    }
    this.record.newFeed(outcome);
    var log = {
      question: this.question,
      answer: this.userAnswer
    };
    this.record.setAnswerRecord(log);
  };

  displayRecords = () => {
    this.userProgress = this.record.getRecord();
    this.totalCorrect.html(this.userProgress.correct);
    this.totalIncorrect.html(this.userProgress.incorrect);
    this.totalTimedOut.html(this.userProgress.timedOut);
  };

  displayResult = () => {
    var ans = this.record.getAnswerRecord();
    var questionLog = '';
    ans.forEach((ques, idx) => {
      var singleLog = `${idx + 1} QUESTION: ${ques.question.getExpression()} <br /> correct answer: ${ques.question.getAnswer()} user answer: ${ques.answer.getUserAnswer()}<br />`;
      questionLog = questionLog.concat(singleLog);
    });
    var div = $('<div />')
      .add($('<h5 />').text('you scored ' + this.userProgress.correct + ' out of ' + this.totalQuestions))
      .add($('<p />').html(questionLog));
    this.quizContainer.html(div);
    clearTimeout(this.timer);
  };

  nextSetup = () => {
    clearTimeout(this.timer);
    this.recordSetup();
    this.displayRecords();
    if (this.questionCounter === this.totalQuestions) {
      this.displayResult();
    } else {
      this.loadQuestion();
    }
  };

  inputHandler = () => {
    this.userAnswerField.on("keyup", (event) => {
      if (event.keyCode === 13) { //13 is keycode for Enter key
        this.nextSetup();
      }
    });
  };

  nextHandler = () => {
    this.nextButton.click(this.nextSetup)
  };

  init = () => {
    this.nextHandler();
    this.inputHandler();
    this.loadQuestion();
  };
}
