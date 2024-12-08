import React, { useState, useEffect } from "react"; 
import axios from "axios";
import TaskCard from "./assets/TaskCard";


const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTask, setNewTask] = useState("");

  // Fetch tasks on mount
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching tasks");
        setLoading(false);
      });
  }, []);

  // Handle adding a new task
  const handleAddTask = () => {
    const taskData = {
      title: newTask,
      completed: false,
    };

    axios
      .post("https://jsonplaceholder.typicode.com/todos", taskData)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask("");
      })
      .catch((err) => {
        setError("Error adding task");
      });
  };

  // Handle editing a task
  const handleEditTask = (id, newTitle) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/todos/ ${id}`, {
        title: newTitle,
      })
      .then((response) => {
        setTasks(tasks.map((task) =>
          task.id === id ? { ...task, title: newTitle } : task
        ));
      })
      .catch((err) => {
        setError("Error updating task");
      });
  };

  // Handle deleting a task
  const handleDeleteTask = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/ ${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((err) => {
        setError("Error deleting task");
      });
  };

  return (
    <div>
      <h1>Task Manager</h1>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <div>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="New Task"
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>

          <div>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskManager;

