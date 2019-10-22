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

function ClearButton(props) {
  return (
    <Button variant="info" onClick={props.onClick}>
      Počisti
    </Button>
  );
}

function validateValue(value) {
  if (!value || isNaN(value)) {
    console.log('n');
    return false;
  }
  return true;
}

class MainPanel extends React.Component {
  // TODO: add button for clear all
  // TODO:
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

  bubbleSort(values) {
    let sortValues = values.slice();
    let n = sortValues.length;
    while(n > 1) {
      let newn = 0;
      for (let i = 1; i < n; i++) {
        if (sortValues[i-1] > sortValues[i]) {
          let firstValue = sortValues[i-1];
          sortValues[i-1] = sortValues[i];
          sortValues[i] = firstValue;
          newn = i;
        }
      }
      n = newn;
    }
    return sortValues;
  }

  arithmeticMean(values) {
    const count = values.length;
    let sum = 0;
    for(var i in values) { sum += values[i]; console.log(i);}
    const mean = sum/count;
    console.log(sum);
    console.log(count);
    console.log(mean);
    return mean.toFixed(10);
  }

  standardDeviation(values, arithmeticMean) {
    const n = values.length;
    if (n === 1) {
      return false;
    }
    let compute = 0;
    for (let i in values) {
      compute += Math.pow((values[i]-arithmeticMean), 2);
    }
    return Math.sqrt(compute/(n-1)).toFixed(10);
  }

  compute() {
    const values = this.state.values;
    if (values.length < 2) {
      this.setState({
        errors:"Vnesite vsaj dva števila.",
      });
      return;
    }
    const sortedValues = this.bubbleSort(values).join(", ");
    const arithmeticMean = this.arithmeticMean(values);
    const standardDeviation = this.standardDeviation(values, arithmeticMean);

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

  clear() {
    this.setState({
      values: [],
      inputValue: '',
      errors:'',
      sortedValues: [],
      arithmeticMean: '',
      standardDeviation: '',
    })
  }

  render() {
    return (
      <div className="Panel">
        <div className="row">
          <div className="col-sm-2">
            <div className="form-group input-field">
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
        <div className="row button-row">
          <div className="button">
            <AddNumberButton
            onClick={() => this.addNumber()}
            />
          </div>
          <div className="button">
            <ComputeButton
            onClick={() => this.compute()}
            />
          </div>
          <div className="button">
            <ClearButton
            onClick={() => this.clear()}
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
