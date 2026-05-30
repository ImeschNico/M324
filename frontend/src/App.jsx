import { useEffect, useState } from "react";
import logo from "./assets/react.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [taskdescription, setTaskdescription] = useState("");
  const [priority, setPriority] = useState("Mittel");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskdescription: taskdescription }),
    })
      .then((response) => {
        console.log(response);
        setTodos([
          ...todos,
          {
            taskdescription: taskdescription,
            priority: priority,
          },
        ]);
        setTaskdescription("");
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    setTaskdescription(event.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  const handleDelete = (event, taskdescription) => {
    fetch("http://localhost:8080/api/v1/delete", {
      method: "POST",
      body: JSON.stringify({ taskdescription: taskdescription }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setTodos(
          todos.filter((todo) => todo.taskdescription !== taskdescription),
        );
      })
      .catch((error) => console.log(error));
  };

  const renderTasks = (todos) => {
    return (
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.taskdescription}>
            <span>{todo.taskdescription}</span>
            <p>Priorität: {todo.priority}</p>
            <button
              onClick={(event) => handleDelete(event, todo.taskdescription)}
            >
              &#10004;
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>ToDo Liste</h1>

        <form onSubmit={handleSubmit} className="todo-form">
          <label htmlFor="taskdescription">Neue Aufgabe hinzufügen:</label>

          <input
            id="taskdescription"
            type="text"
            value={taskdescription}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Hoch">Hoch</option>
            <option value="Mittel">Mittel</option>
            <option value="Tief">Tief</option>
          </select>

          <button type="submit">Hinzufügen</button>
        </form>

        <div>{renderTasks(todos)}</div>
      </header>
    </div>
  );
}

export default App;
