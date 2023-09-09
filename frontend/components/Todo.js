import React from 'react'
//render todos to todolist
export default class Todo extends React.Component {
  render() {
    return (
      <div onClick={this.props.toggleCompleted(this.props.todo.id)} 
          
      >
          {this.props.todo.name}{this.props.todo.completed ? "[x]" : ''}
      </div>
    )
  }
}
