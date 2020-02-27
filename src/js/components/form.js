import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../../stylesheets/bootstrap.min.css';
import '../../form.css';
import data from '../../quiz.json';
import CustomDropDown from './custom-dropdown';

import { Button } from 'reactstrap';

class FormComponent extends Component {
  constructor() {
    super();
    this.state = {
      data: data && data.quiz ? data.quiz : [],
      submit_flag: false,
      clear_flag: false
    };
    this.renderQuiz = this.renderQuiz.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.submitAction = this.submitAction.bind(this);
    this.clearAction = this.clearAction.bind(this);
  }

  submitAction(e) {
    let { submit_flag } = this.state;
    this.setState({
      submit_flag: !submit_flag
    })
  }

  clearAction(e) {
    let { data } = this.state;
    data.forEach(d => {
      d['select'] = "";
    });
    this.setState({
      submit_flag: false,
      data
    })
  }


  selectAnswer(object, index) {
    let { data } = this.state;
    let selected_ques = null;
    data.forEach(d => {
      if (d.question === object.question) {
        selected_ques = d;
      }
    });
    selected_ques['select'] = object['options'][index];
    this.setState({
      data
    })
  }

  renderQuiz() {
    let self = this;
    let { data, submit_flag } = this.state;
    let mappedData = data.map(function (d, i) {
      return (
        <CustomDropDown
          key={i}
          data={{ ...d }}
          submit_flag={submit_flag}
          extra={{
            selectAnswer: self.selectAnswer,
          }}
        />
      )
    })
    return mappedData;

  }

  render() {
    return (
      <div className="quiz_container">
        {this.renderQuiz()}
        <div className="btn-container">
          <Button className="submit" onClick={() => this.submitAction(event)}>Submit</Button>
          <Button onClick={() => this.clearAction(event)}>Clear</Button>
        </div>
      </div>
    );
  }
}

export default FormComponent;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<FormComponent />, wrapper) : false;