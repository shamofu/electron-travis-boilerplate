import React from 'react'
import ReactDOM from 'react-dom'

class Foo extends React.Component{
  render(){
    return <div>This is React component</div>
  }
}

var container = document.querySelector("#container")

ReactDOM.render(<Foo />, container)