import React, { Component } from 'react'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      equation: '',
      period: 0,
      firstNumberIndex: 0,
      isReturned: false
    };
  }

  updateEquation = (value) => {
    let lastIndexOfStr = this.state.equation.length;
    if(value === '0'){
      if(this.state.equation[lastIndexOfStr - 1] === '0'){
          if(this.state.equation.charAt(this.state.firstNumberIndex) !== '0'){
            this.setState({
              equation: this.state.equation + value
            });
          }
      }
      else if(this.state.equation.length === 0 || (this.state.equation === '0') || this.state.isReturned === true){
        this.setState({
          equation: value,
          isReturned: false
        });
      }
      else{
        this.setState({
          equation: this.state.equation + value
        });
      }
    }
    else if(this.state.equation[lastIndexOfStr - 1] === '+' || 
    this.state.equation[lastIndexOfStr - 1] === '-' || 
    this.state.equation[lastIndexOfStr - 1] === '/' ||
    this.state.equation[lastIndexOfStr - 1] === '*' ||
    this.state.equation[lastIndexOfStr - 1] === '.'){
      if(value !== '+' && value !== '-' && value !== '/' && value !== '*' && value !== '.'){
        this.setState({
          equation: this.state.equation + value
        });
      }
    }
    else if(this.state.equation.length < 1){
      if(value !== '+' && value !== '-' && value !== '/' && value !== '*' && value !== '.'){
        this.setState({
          equation: this.state.equation + value
        });
      }
    }
    else if(value === '.'){
      console.log(this.state.period)
      if(this.state.period === 0 && this.state.isReturned === false){
        this.setState({
          equation: this.state.equation + value,
          period: this.state.period + 1
        });
      }
    }
    else if(value === '+' || value === '-' || value === '*' || value === '/'){
      this.setState({
        equation: this.state.equation + value,
        period: 0,
        firstNumberIndex: this.state.equation.length + 1
      });
    }
    else{
      if(this.state.equation[lastIndexOfStr - 1] === '0'){
        if(this.state.period > 0 && lastIndexOfStr - 2 >= 0 && 
          (this.state.equation[lastIndexOfStr - 2] !== '+' || 
          this.state.equation[lastIndexOfStr - 2] !== '-' ||
          this.state.equation[lastIndexOfStr - 2] !== '*' ||
          this.state.equation[lastIndexOfStr - 2] !== '/')){
          this.setState({
            equation: this.state.equation + value
          });
        }
        else{
          if(this.state.period === 0 && this.state.equation.length -1 === this.state.firstNumberIndex){
            let eqautionStr = this.state.equation.split('');
            eqautionStr[lastIndexOfStr - 1] = value;
            this.setState({
              equation: eqautionStr.join('')
            });
          }
          else{
            this.setState({
              equation: this.state.equation + value
            });
          }
        }
      }
      else if(this.state.isReturned === true){
        this.setState({
          equation: value,
          isReturned: false
        });
      }
      else{
        this.setState({
          equation: this.state.equation + value
        });
      }

    }

  }

  clearEquation = () => {
    this.setState({
      equation: '',
      period: 0,
      firstNumberIndex: 0,
      isReturned: false
    });
  }

  getAnswer = () => {
    let answer = 0.0;
    let isFirstOperation = true;
    let numbers = this.state.equation.split(/\D/);
    let operators = this.state.equation.split(/\d/);
    let clearedOperators = [];
    for(let i = 0; i < operators.length; i++){
      if(operators[i] !== ''){
        clearedOperators.push(operators[i]);
      }
    }
    for(let i = 0; i < clearedOperators.length; i++){
      if(clearedOperators[i] === '+'){
        if(isFirstOperation){
          let firstNumber = parseFloat(numbers.splice(0, 1));
          let secondNumber = numbers.splice(0, 1);

          if(i + 1 < clearedOperators.length){
            if(clearedOperators[i + 1] === '.'){
              secondNumber += '.' + numbers.splice(0, 1);
            }
          }
          
          answer = firstNumber + parseFloat(secondNumber);
          isFirstOperation = false;
        }
        else{
          let secondNumber = numbers.splice(0, 1);
          if(i + 1 < clearedOperators.length){
            if(clearedOperators[i + 1] === '.'){
              secondNumber += '.' + numbers.splice(0, 1);
            }
          }
          answer += parseFloat(secondNumber);
        }
      }
      else if(clearedOperators[i] === '-'){
        if(isFirstOperation){
          let firstNumber = parseFloat(numbers.splice(0, 1));
          let secondNumber = numbers.splice(0, 1);

          if(i + 1 < clearedOperators.length){
            if(clearedOperators[i + 1] === '.'){
              secondNumber += '.' + numbers.splice(0, 1);
            }
          }
          
          answer = firstNumber - parseFloat(secondNumber);
          isFirstOperation = false;
        }
        else{
          let secondNumber = numbers.splice(0, 1);
          if(i + 1 < clearedOperators.length){
            if(clearedOperators[i + 1] === '.'){
              secondNumber += '.' + numbers.splice(0, 1);
            }
          }
          answer -= parseFloat(secondNumber);
        }
      }
      else if(clearedOperators[i] === '*'){
        if(isFirstOperation){
          let firstNumber = parseFloat(numbers.splice(0, 1));
          let secondNumber = numbers.splice(0, 1);

          if(i + 1 < clearedOperators.length){
            if(clearedOperators[i + 1] === '.'){
              secondNumber += '.' + numbers.splice(0, 1);
            }
          }
          
          answer = firstNumber * parseFloat(secondNumber);
          isFirstOperation = false;
        }
        else{
          let secondNumber = numbers.splice(0, 1);
          if(i + 1 < clearedOperators.length){
            if(clearedOperators[i + 1] === '.'){
              secondNumber += '.' + numbers.splice(0, 1);
            }
          }
          answer *= parseFloat(secondNumber);
        }
      }
      else if(clearedOperators[i] === '/'){
        if(isFirstOperation){
          let firstNumber = parseFloat(numbers.splice(0, 1));
          let secondNumber = numbers.splice(0, 1);

          if(i + 1 < clearedOperators.length){
            if(clearedOperators[i + 1] === '.'){
              secondNumber += '.' + numbers.splice(0, 1);
            }
          }
          
          answer = firstNumber / parseFloat(secondNumber);
          isFirstOperation = false;
        }
        else{
          let secondNumber = numbers.splice(0, 1);
          if(i + 1 < clearedOperators.length){
            if(clearedOperators[i + 1] === '.'){
              secondNumber += '.' + numbers.splice(0, 1);
            }
          }
          answer /= parseFloat(secondNumber);
        }
      }
      else if(clearedOperators[i] === '.'){
        let integer = numbers.splice(0, 1);
        let decimal = numbers[0];

        numbers[0] = integer + '.' + decimal;
      }
    }
    this.setState({
      equation: answer,
      firstNumberIndex: 0,
      isReturned: true
    });

  }

  render() {
    return (
      <div className="page-container">
      <div className="main-container">
        <div className="calculator">
          <h1>Calculator</h1>
          <input value={this.state.equation} readOnly id="number-input" />
          <div id="button-container">
            <div className="button-row">
              <button className="primary" onClick={() => this.updateEquation('7')}>7</button>
              <button className="primary" onClick={() => this.updateEquation('8')}>8</button>
              <button className="primary" onClick={() => this.updateEquation('9')}>9</button>
              <button className="secondary" onClick={() => this.updateEquation('+')}>+</button>
            </div>
            <div className="button-row">
              <button className="primary" onClick={() => this.updateEquation('4')}>4</button>
              <button className="primary" onClick={() => this.updateEquation('5')}>5</button>
              <button className="primary" onClick={() => this.updateEquation('6')}>6</button>
              <button className="secondary" onClick={() => this.updateEquation('-')}>-</button>
            </div>
            <div className="button-row">
              <button className="primary" onClick={() => this.updateEquation('1')}>1</button>
              <button className="primary" onClick={() => this.updateEquation('2')}>2</button>
              <button className="primary" onClick={() => this.updateEquation('3')}>3</button>
              <button className="secondary" onClick={() => this.updateEquation('*')}>*</button>
            </div>
            <div className="button-row">
              <button className="primary" onClick={() => this.updateEquation('0')}>0</button>
              <button className="primary" onClick={() => this.updateEquation('.')}>.</button>
              <button className="primary" onClick={() => this.clearEquation()}>C</button>
              <button className="secondary" onClick={() => this.updateEquation('/')}>/</button>
            </div>
            <button id="equal" onClick={() => this.getAnswer()}>=</button>
          </div>
        </div>
      </div>

    </div>
    );
    
  }
}

export default App;
