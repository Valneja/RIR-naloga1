import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';


function AllNumbers(props) {
  const numbers = props.numbers.join(", ");
  return(
    <div>Vnešena števila: {numbers}</div>
  );
}

function AddNumberButton(props) {
  return (
    <Button variant="info" onClick={props.onClick}>
      Dodaj
    </Button>
  );
}

function ComputeButton(props) {
  return (
    <Button variant="info" onClick={props.onClick}>
      Izračunaj
    </Button>
  );
}

function validateValue(value) {
  if (isNaN(value)) {
    return false;
  }
  return true;
}

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      inputValue: '',
      errors:'',
      sortedValues: [],
      arithmeticMean: '',
      standardDeviation: '',
    }
  }

  addNumber() {
    const values = this.state.values.slice();
    const currentValue = this.state.inputValue;
    const validationOk = validateValue(currentValue);
    if (!validationOk) {
      this.setState({
        errors:"Vnesen podatek ni število. Prosimo vnesite število.",
      });
      return;
    }
    this.setState({
      values: values.concat([parseFloat(currentValue)]),
      inputValue: '',
      errors:"",
    });
  }

  compute() {
    // TODO: validate when to compute (if empty then not)
    // TODO: do actual computing of values

    const sortedValues = this.state.values.slice();
    const arithmeticMean = sortedValues[0];
    const standardDeviation = 312;
    this.setState({
      sortedValues: sortedValues,
      arithmeticMean: arithmeticMean,
      standardDeviation: standardDeviation,
    });
  }

  updateInputValue(evt) {
    this.setState({
        inputValue: evt.target.value
      });
  }

  render() {
    return (
      <div className="Panel">
        <div className="row">
          <div className="col-sm-2">
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Poljubno realno število"
                onChange={evt => this.updateInputValue(evt)}
                value={this.state.inputValue}
                />
            </div>
          </div>
          <div className="col-sm-10 errors">
          {this.state.errors}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-1">
            <AddNumberButton
            onClick={() => this.addNumber()}
            />
          </div>
          <div className="col-sm-1">
            <ComputeButton
            onClick={() => this.compute()}
            />
          </div>
        </div>
        <div className="allNumbers">
          <AllNumbers
          numbers={this.state.values}
          />
        </div>
        <br/>
        <div className="allNumbers">
          Vnesena števila po velikosti: {this.state.sortedValues}
        </div>
        <div className="allNumbers">
          Aritmetična sredina: {this.state.arithmeticMean}
        </div>
        <div className="allNumbers">
          Standardni odklon: {this.state.standardDeviation}
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return(
      <MainPanel />
    );
  }
}

export default App;
