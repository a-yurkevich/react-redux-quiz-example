import React from 'react';
import AnswersList from '../AnswersList/AnswersList';
import './ActiveQuiz.scss';

const ActiveQuiz = props => (
  <div className='ActiveQuiz'>
    <p className='Question'>
      <span>
        <strong>{props.answerNumber}.</strong>&nbsp;
        {props.question}
      </span>
      <small>{props.answerNumber} from {props.quizLength}</small>
    </p>
    <AnswersList
      state={props.state }
      answers={props.answers }
      onAnswerClick={props.onAnswerClick}
    />
  </div>
);

export default ActiveQuiz;
