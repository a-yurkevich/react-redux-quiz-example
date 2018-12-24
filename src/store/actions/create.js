import axios from 'axios';
import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from './actionsType';
import {serverUrl} from '../../config';
import {getState} from 'redux';

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  }
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION
  }
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    console.log(getState().create.quiz);
    await axios.post(`${serverUrl}/quizes`, getState().create.quiz);
    dispatch(resetQuizCreation());
  }
}