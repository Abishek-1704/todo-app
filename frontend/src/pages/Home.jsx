import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos");
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const saveTodo = async () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter title and description");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/todos/${editingId}`, {
          title,
          description,
        });

        setIsEditing(false);
        setEditingId("");
      } else {
        await axios.post("http://localhost:5000/todos", {
          title,
          description,
        });
      }

      setTitle("");
      setDescription("");

      fetchTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const editTodo = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingId(todo.id);
    setIsEditing(true);
  };

  const deleteTodo = async (id) => {
    if (!window.confirm("Delete this todo?")) return;

    await axios.delete(`http://localhost:5000/todos/${id}`);

    fetchTodos();
  };

  const completeTodo = async (todo) => {
    await axios.put(`http://localhost:5000/todos/${todo.id}`, {
      completed: !todo.completed,
    });

    fetchTodos();
  };

  return (
    <div className="container">

      <h1>Todo Application</h1>

      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <input
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />

      <button onClick={saveTodo}>
        {isEditing ? "Update Todo" : "Add Todo"}
      </button>

      <hr />

      <input
        type="text"
        placeholder="Search Todo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <hr />

      {todos
        .filter((todo) =>
          todo.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((todo) => (
          <div className="card" key={todo.id}>

            <h2>{todo.title}</h2>

            <p>{todo.description}</p>

            <h4>
              Status :
              {todo.completed ? " ✅ Completed" : " ⏳ Pending"}
            </h4>

            <button onClick={() => completeTodo(todo)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => editTodo(todo)}>
              Edit
            </button>

            <button onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>

            <Link to={`/todo/${todo.id}`}>
              <button>View Details</button>
            </Link>

          </div>
        ))}

      {todos.length === 0 && (
        <h3>No Todos Found</h3>
      )}

    </div>
  );
}

export default Home;