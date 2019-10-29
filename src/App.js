import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';

// vrne vsa števila, ki so bila do sedaj vnešena
function AllNumbers(props) {
  const numbers = props.numbers.join(", ");
  return(
    <div>Vnešena števila: {numbers}</div>
  );
}

// vrne gumb za dodajanje števil
function AddNumberButton(props) {
  return (
    <Button variant="info" type="submit">
      Dodaj
    </Button>
  );
}

// vrne gumb za izračun zahtevanih vrednosti
function ComputeButton(props) {
  return (
    <Button variant="info" onClick={props.onClick}>
      Izračunaj
    </Button>
  );
}

// vrne gumb za brisanje do sedaj vnešenih števil
function ClearButton(props) {
  return (
    <Button variant="info" onClick={props.onClick}>
      Počisti
    </Button>
  );
}

// če je vrednost številska vrne true, drugače false
function validateValue(value) {
  if (!value || isNaN(value)) {
    return false;
  }
  return true;
}

// vrne aritmetično sredino
function ArithmeticMean(values) {
    const count = values.length;
    let sum = 0;
    for(var i in values) {
      sum += values[i]; console.log(i);
    }
    const mean = sum/count;
    return mean.toFixed(10);
}

// vrne števila razvrščena od največjega do najmanjšega
function BubbleSort(values) {
  // naredi kopijo števil v values
    let sortValues = values.slice();
    let n = sortValues.length;
    // izvajaj dokler niso vsa števila na urejena (dokler ni tudi število z najmanjšim indeksom na pravem mestu)
    while(n > 1) {
      let newn = 0;
      // preglej vsa števila od leve proti desni
      for (let i = 1; i < n; i++) {
        // če je prejšnje število manjše od trenutnega ju zamenjaj (porini manjše število na desno)
        if (sortValues[i-1] < sortValues[i]) {
          let firstValue = sortValues[i-1];
          sortValues[i-1] = sortValues[i];
          sortValues[i] = firstValue;
          // shrani index števila, ki je bilo na zadnje premaknjeno (vsa števila desno od tega so že urejena po velikosti)
          newn = i;
        }
      }
      // samo števila do indeksa newn še niso na svojem mestu (levo od tega indeksa)
      n = newn;
    }
    return sortValues;
}

// vrne standardni odklon
function StandardDeviation(values, arithmeticMean) {
    // število vnesenih števil
    const n = values.length;
    // standardnega odklona ne moremo izračunati, če imamo samo eno vneseno število
    if (n === 1) {
      return false;
    }
    let compute = 0;
    // pojdi čez vsa števila v tabeli values
    for (let i in values) {
      // v spremenljivko compute prištej kvadrat razlike trenutne vrednosti in aritmetične sredine
      compute += Math.pow((values[i]-arithmeticMean), 2);
    }
    // vrni koren vrednosti compute deljene z vrednostjo n - 1
    // vse skupaj zaokroži na 10 decimalk
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

// shrani novo vnešeno število
  addNumber() {
    const values = this.state.values.slice();
    const currentValue = this.state.inputValue;
    const validationOk = validateValue(currentValue);
    if (!validationOk) {
      // če vnesen podatek ni število prikaže obvestilo
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

// izračuna željene vrednosti
  compute() {
    const values = this.state.values;
    // za izračun morata biti vneseni vsaj dve števili
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

// počisti vsa vnešena števila in izračunane vrednosti
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
