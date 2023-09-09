import React from 'react'
import Todo  from './Todo'

//Todo is parent of TodoList
export default class TodoList extends React.Component {
  render() {
    return (
      <div id="todos">
        <h2>Todos:
          {
            //use reduce to show hide all completed's
            this.props.todos.reduce((acc, td) => {
              if (this.props.displayCompleteds || !td.completed) return acc.concat(//Cmd X out to Todo.js already
                <Todo
                key={td.id} 
                toggleCompleted={this.props.toggleCompleted}
                todo={td}

                />
              )
              return acc
            //<div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name}{td.completed ? "[x]" : ''}</div>
            }, [])
          }
        </h2>
      </div>
    )
  }
}
