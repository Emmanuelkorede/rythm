import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { handleKeyPressForm } from "../components/handleKeyPress";
import "../styles/Todolist.css";
import { FaClock } from "react-icons/fa";

/*  FORM  */
function Form({ input, setInput, reminder, setReminder, addTask }) {
  return (
    <div className="todo-form">

      {/* Task input */}
      <input
        type="text"
        placeholder="Add a task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => handleKeyPressForm(e, addTask, setInput)}
      />

      {/* Reminder picker */}
      <div className="reminder-picker">
        <button
          type="button"
          className="reminder-icon"
          onClick={() =>
            document.getElementById("task-reminder-input").showPicker()
          }
          aria-label="Pick reminder datetime"
        >
          <FaClock />
        </button>

        <input
          id="task-reminder-input"
          type="datetime-local"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />

        {reminder && (
          <span className="reminder-label">
            {new Date(reminder).toLocaleString()}
          </span>
        )}
      </div>

      {/* Add task button */}
      <button onClick={addTask} disabled={!input.trim()}>
        Add
      </button>
    </div>
  );
}

/*  DISPLAY  */
function Display({ tasks, formatDateTime, toggleTask, deleteTask }) {
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (tasks.length === 0) {
    return <p>No tasks added yet.</p>;
  }

  return (
    <>
      {activeTasks.length > 0 && (
        <>
          <h2>To be completed</h2>
          {tasks.map((task, index) => {
            if (task.completed) return null;

            return (
              <div key={index} className="todo-item">
                <input
                  type="checkbox"
                  onChange={() => toggleTask(index)}
                />

                <span>{task.input}</span>
                <span>{formatDateTime(task.reminder)}</span>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(index)}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </>
      )}

      {completedTasks.length > 0 && (
        <>
          <h2>Completed</h2>
          {tasks.map((task, index) => {
            if (!task.completed) return null;

            return (
              <div key={index} className="todo-item completed">
                <input
                  type="checkbox"
                  checked
                  onChange={() => toggleTask(index)}
                />

                <span>{task.input}</span>
                <span>{formatDateTime(task.reminder)}</span>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(index)}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}


/*  MAIN PAGE  */
function Todolist() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [reminder, setReminder] = useState("");

  /* Persist tasks */
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function formatDateTime(value) {
    if (!value) return "";
    return new Date(value).toLocaleString();
  }

  function toggleTask(index) {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function addTask() {
    if (!input.trim()) return;

    const newTask = {
      input,
      reminder,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
    setReminder("");
  }
  function deleteTask(index) {
  setTasks(tasks.filter((_, i) => i !== index));
}

  return (
    <>
      <Navbar />
      <div className="todo-page">
        <h1>Todo List</h1>

        <Display
          tasks={tasks}
          formatDateTime={formatDateTime}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />

        <Form
          input={input}
          setInput={setInput}
          reminder={reminder}
          setReminder={setReminder}
          addTask={addTask}
        />
      </div>
    </>
  );
}

export default Todolist;
