import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function TodoDetails() {
  const { id } = useParams();

  const [todo, setTodo] = useState(null);

  useEffect(() => {
    loadTodo();
  }, []);

  const loadTodo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/todos/${id}`
      );

      setTodo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!todo) {
    return (
      <div className="container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container">

      <h1>Todo Details</h1>

      <div className="card">

        <h2>{todo.title}</h2>

        <p>
          <strong>Description :</strong> {todo.description}
        </p>

        <p>
          <strong>Status :</strong>{" "}
          {todo.completed ? "Completed ✅" : "Pending ⏳"}
        </p>

        <p>
          <strong>Todo ID :</strong>
          <br />
          {todo.id}
        </p>

        <p>
          <strong>Created At :</strong>
          <br />
          {todo.createdAt || "Not Available"}
        </p>

        <p>
          <strong>Updated At :</strong>
          <br />
          {todo.updatedAt || "Not Available"}
        </p>

        <br />

        <Link to="/">
          <button>⬅ Back</button>
        </Link>

      </div>

    </div>
  );
}

export default TodoDetails;