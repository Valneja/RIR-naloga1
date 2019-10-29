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
    <Button variant="info" type="submit">
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
    return false;
  }
  return true;
}

function ArithmeticMean(values) {
    const count = values.length;
    let sum = 0;
    for(var i in values) { sum += values[i]; console.log(i);}
    const mean = sum/count;
    return mean.toFixed(10);
}

function BubbleSort(values) {
    let sortValues = values.slice();
    let n = sortValues.length;
    while(n > 1) {
      let newn = 0;
      for (let i = 1; i < n; i++) {
        if (sortValues[i-1] < sortValues[i]) {
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

function StandardDeviation(values, arithmeticMean) {
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
    const values = this.state.values;
    if (values.length < 2) {
      this.setState({
        errors:"Vnesite vsaj dva števila.",
      });
      return;
    }
    const sortedValues = BubbleSort(values).join(", ");
    const arithmeticMean = ArithmeticMean(values);
    const standardDeviation = StandardDeviation(values, arithmeticMean);

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
    const handleSubmit = event => {
      this.addNumber();
      event.preventDefault();
    };
    const handleChange = evt => this.updateInputValue(evt);
    return (
      <div className="Panel">
        <p><strong>Naloga:</strong></p>
        <p>Program naj uporabniku omogoča vnos poljubnega števila realnih števil. Pri tem naj preveri vnos in če vnesen podatek ni število, uporabnika opozori in zahteva ponoven vnos. Po koncu vnosa naj program izpiše:</p>
        <ul>
          <li>vnesena števila po velikosti od največjega do najmanjšega,</li>
          <li>aritmetično sredino vnesenih števil,</li>
          <li>standardni odklon vnesenih števil.</li>
        </ul>
        <p>Pri tem napravite lastno proceduro za sortiranje, npr. po Bubble sort metodi, lahko pa poljubni (več o bubble sort metodi lahko npr. preberete tukaj: <a href="https://en.wikipedia.org/wiki/Bubble_sort" className="external" target="_blank" rel="noreferrer noopener"><span>https://en.wikipedia.org/wiki/Bubble_sort</span><span aria-hidden="true" className="ui-icon ui-icon-extlink ui-icon-inline" title="Links to an external site."></span><span className="screenreader-only">&nbsp;(Links to an external site.)</span></a>).</p>
        <p><strong>Rešitev:</strong></p>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-2">
              <div className="form-group input-field">
                <input
                  className="form-control"
                  placeholder="Poljubno realno število"
                  onChange={handleChange}
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
        </form>
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
