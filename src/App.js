import React from 'react'
import './App.css'
import { useState } from 'react'

const App = () => {
  const [state, setState] = useState({ input: "", result: "", lastButton: "", number: "" })
  const clearStyle = { background: "#ac3939", width: "160px" }
  const operatorStyle = { background: "#666666" }
  const equalsStyle = {
    background: "#004466",
    position: "absolute",
    height: 130,
    bottom: 0
  }

  const jumboButtonStyle = {
    width: "160px"
  }

  const initialize = () => {
    setState({ input: "", result: "", lastButton: "", number: "" })
  }

  const handleClick = (value) => {
    const regex = new RegExp("[+/*]")
    let newInput = state.input
    if (state.lastButton === "=") {
      newInput = state.result
    }
    if (regex.test(value) && regex.test(state.lastButton)) {
      newInput = newInput.substring(0, newInput.length - 1)
    }
    if (state.lastButton === "-" && isNaN(value)) {
      newInput = newInput.substring(0, newInput.length - 1)
      if (regex.test(newInput.charAt(newInput.length - 1))) {
        newInput = newInput.substring(0, newInput.length - 1)
      }
    }
    if (value === "=") {
      calculate()
    } else if (value === ".") {
      if (!state.number.includes(".")) {
        setState({ ...state, input: newInput + value, lastButton: value, number: state.number + value })
      }
    }
    else {
      let newNumber = isNaN(parseInt(value)) ? "" : state.number + value
      if (newNumber.length === 2) {
        if (state.lastButton === "0") {
          newNumber = newNumber.substring(0, newNumber.length - 1)
          newInput = newInput.substring(0, newInput.length - 1)
        }
      }
      setState({ ...state, input: newInput + value, lastButton: value, number: newNumber })
    }
  }

  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const calc = (Math.round(1000000000000 * eval(state.input)) / 1000000000000).toString()
      setState({ ...state, result: calc, lastButton: "=" })
    } catch (e) {
      setState({ ...state, result: "error" })
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div id="inputDisplay">{state.input.length > 0 ? state.input : ""}</div>
        <div id="display">{state.lastButton === "=" ? state.result : state.number.length > 0 ? state.number : state.lastButton === "" ? "0" : state.lastButton}</div>
        <button style={clearStyle} id="clear" onClick={initialize}>AC</button>
        <button style={operatorStyle} id="divide" value="/" onClick={e => handleClick(e.target.value)}>/</button>
        <button style={operatorStyle} id="multiply" value="*" onClick={e => handleClick(e.target.value)}>X</button>
        <button id="seven" value="7" onClick={e => handleClick(e.target.value)}>7</button>
        <button id="eight" value="8" onClick={e => handleClick(e.target.value)}>8</button>
        <button id="nine" value="9" onClick={e => handleClick(e.target.value)}>9</button>
        <button style={operatorStyle} id="subtract" value="-" onClick={e => handleClick(e.target.value)}>-</button>
        <button id="four" value="4" onClick={e => handleClick(e.target.value)}>4</button>
        <button id="five" value="5" onClick={e => handleClick(e.target.value)}>5</button>
        <button id="six" value="6" onClick={e => handleClick(e.target.value)}>6</button>
        <button style={operatorStyle} id="add" value="+" onClick={e => handleClick(e.target.value)}>+</button>
        <button id="one" value="1" onClick={e => handleClick(e.target.value)}>1</button>
        <button id="two" value="2" onClick={e => handleClick(e.target.value)}>2</button>
        <button id="three" value="3" onClick={e => handleClick(e.target.value)}>3</button>
        <button style={equalsStyle} id="equals" value="=" onClick={e => handleClick(e.target.value)}>=</button>
        <button id="zero" value="0" style={jumboButtonStyle} onClick={e => handleClick(e.target.value)}>0</button>
        <button id="decimal" value="." onClick={e => handleClick(e.target.value)}>.</button>
      </div>
    </div>
  )
}

export default App
