import {Quiz} from './quiz.js';

class QuizManager {
  constructor(quizSelector, quiz1, quiz2) {
    this.selector = quizSelector;
    this.quiz1 = quiz1;
    this.quiz2 = quiz2;
  }

  startQuiz = (containerClass) => {
    this.selector.container = containerClass;
    var quiz = new Quiz(this.selector);
    quiz.init();
  };

  init = () => {
    this.startQuiz(this.quiz1);
    this.startQuiz(this.quiz2);
  };
}

var selector = {
  totalQuestions: 20,
  timerId: '#timer h1',
  timerDuration: 10,
  nextEle: 'button',
  answerId: '#answer',
  quizContainer: '.quiz-container',
  operandUpperLimit: 20,
  totalCorrectId: '#totalCorrect',
  totalIncorrectId: '#totalIncorrect',
  totalTimedOutId: '#totalTimedOut',
  questionContainerId: ('#question'),
};

$(document).ready((new QuizManager(selector, '.container1', '.container2')).init());
