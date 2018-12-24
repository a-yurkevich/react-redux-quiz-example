import React from 'react';
import {Link} from 'react-router-dom';
import Button from '../UI/Button/Button';
import './FinishedQuiz.scss';

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className='FinishedQuiz'>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const classes = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times error' : 'fa-check success'
          ];

          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <i className={classes.join(' ')}/>
            </li>
          );
        })}
      </ul>

      <p>Right {successCount} from {props.quiz.length}</p>
      <div>
        <Button onClick={props.onRetry} type='primary'>Repeat</Button>
        <Link to='/'><Button type='success'>Go to test list</Button></Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
