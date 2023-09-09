import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
      todos: [],
      error: "",
      todoNameInput: "",
      displayCompleteds: true,
  }
  //helper to change input name
  onTodoNameInputChange = evt => {
    const {value} = evt.target
    this.setState({...this.state, todoNameInput: value}) //extract value before set state bc who knows what will react reset evt to instead of this.evt.target
  }

  //reset form clean way
  resetForm = () =>   this.setState({...this.state, todoNameInput: ""})

  //clean up set axios error
  setAxiosResponseError = (err) =>  this.setState({...this.state, error: err.response.data.message }) 

  //he;per to post new todo
  postNewTodo = () => {
    console.log(this.state.todoNameInput)
    axios.post(URL, {name: this.state.todoNameInput})
    .then(res => {
      this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
      this.resetForm()
    })
    .catch(this.setAxiosResponseError)
    
  }

  onTodoFormSubmit = (evt) => {
    evt.preventDefault()
    this.postNewTodo()
  }

  //helper to fetch todos
  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(this.setAxiosResponseError)
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res =>{
        //lazy way which will send 2 requests: this.fetchAllTodos()
        //correct way to do only one request:
        this.setState({...this.state, todos: this.state.todos.map(td =>{
          if (td.id !== id)return td //if td is not td of interest, return it as is, otherwise replace it with the td from server as a result of patching
          return res.data.data
        })
      })
      })
      .catch(this.setAxiosResponseError)
  }
  toggleDisplayCompleteds = () => {
    this.setState({...this.state, displayCompleteds: !this.state.displayCompleteds})
  }
  componentDidMount(){
    this.fetchAllTodos()
  }
  
  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
       
        <TodoList
        todos={this.state.todos}
        displayCompleteds={this.state.displayCompleteds}
        toggleCompleted={this.toggleCompleted}
        />
        
        <Form 
          onTodoFormSubmit={this.onTodoFormSubmit}
          onTodoNameInputChange={this.onTodoNameInputChange}
          toggleDisplayCompleteds={this.toggleDisplayCompleteds}
          todoNameInput={this.state.todoNameInput}
          displayCompleteds={this.state.displayCompleteds}

        />
      </div>
    )
  }
}
