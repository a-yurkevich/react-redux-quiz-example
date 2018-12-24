import React, {Component} from 'react';
import {connect} from 'react-redux';
import './QuizCreator.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import {createControl, validate, validateForm} from '../../form/formFramework';
import {serverUrl} from '../../config';
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create';

const controls = {
  question: createControl({
    label: 'Enter a question',
    errorMessage: 'Question can\'t be empty'
  }, {required: true}),
  option1: createControl({
    id: 1,
    label: 'Value 1',
    errorMessage: 'Value can\'t be empty'
  }, {required: true}),
  option2: createControl({
    id: 2,
    label: 'Value 2',
    errorMessage: 'Value can\'t be empty'
  }, {required: true}),
  option3: createControl({
    id: 3,
    label: 'Value 3',
    errorMessage: 'Value can\'t be empty'
  }, {required: true}),
  option4: createControl({
    id: 41,
    label: 'Value 4',
    errorMessage: 'Value can\'t be empty'
  }, {required: true}),
};

function createFormControls() {
  return controls;
}

class QuizCreator extends Component {

  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls()
  };

  submitHandler = event => {
    event.preventDefault();
  };

  addQuestionHandler = event => {
    event.preventDefault();

    const {question, option1, option2, option3, option4} = this.state.formControls;
    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    });
  };

  createQuizHandler = event => {
    event.preventDefault();

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    });
    this.props.finishCreateQuiz();
  };

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Auxiliary>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => this.changeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr/> : null}
        </Auxiliary>
      );
    });
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    });
  };

  render() {
    const select = <Select
      label='Enter right answer'
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />;

    return (
      <div className='QuizCreator'>
        <div>
          <h1>Test creation</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderInputs()}
            {select}

            <Button
              type='primary'
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >Add question</Button>

            <Button
              type='success'
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >Create test</Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: item => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
