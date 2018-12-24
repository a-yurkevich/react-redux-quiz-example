import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from '../../components/UI/Loader/Loader';
import {fetchQuizes} from '../../store/actions/quiz';
import './QuizList.scss';

class QuizList extends Component {
  componentDidMount() {
    this.props.fetchQuizes();
  }

  renderQuizzes() {
    return this.props.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink
            to={'/quiz/' + quiz.id}
          >
            {quiz.name}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    return (
      <div className='QuizList'>
        <div>
          <h1>Quizzes</h1>
          {this.props.loading && this.props.quizes.length !== 0 ? <Loader/> :
            <ul>
              {this.renderQuizzes()}
            </ul>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
