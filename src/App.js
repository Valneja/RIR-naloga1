import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';


function AllNumbers(props) {
  const numbers = props.numbers.join(", ");
  return(
    <div>Vnešena števila: {numbers}</div>
  );
}

function AddNumber (props) {
  return (
    <Button variant="info" onClick={props.onClick}>
      Dodaj
    </Button>
  );
}

class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      inputValue: '',
    }
  }

  handleClick() {
    const values = this.state.values.slice();
    const currentValue = parseFloat(this.state.inputValue);
    if (!currentValue) {
      return;
    }
    this.setState({
      values: values.concat([currentValue]),
      inputValue: ''
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
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Poljubno realno število"
            onChange={evt => this.updateInputValue(evt)}
            value={this.state.inputValue}
            />
        </div>
        <div className="row">
          <div className="col-sm-1">
            <AddNumber
            onClick = {() => this.handleClick()}
            />
          </div>
          <div className="col-sm-1">
            <Button variant="info">
              Končano
            </Button>
          </div>
        </div>
        <div>
          <AllNumbers
          numbers={this.state.values}
          />
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
