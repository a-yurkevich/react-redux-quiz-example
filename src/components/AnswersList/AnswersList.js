import React from 'react';
import AnswerItem from './AnswerItem/AnswerItem';
import './AnswersList.scss';

const AnswersList = props => (
  <ul className='AnswersList'>
    {props.answers.map((answer, index) => {
      return (
        <AnswerItem
          key={index}
          state={props.state ? props.state[answer.id] : null}
          answer={answer}
          onAnswerClick={props.onAnswerClick}
        />
      );
    })}
  </ul>
);

export default AnswersList;
