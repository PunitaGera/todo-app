//import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});
useEffect(() => {
  console.log("Saving tasks:", tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  const addTask = () => {
   if (!task.trim()) return;

    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter(
      (_, index) => index !== indexToDelete
    );

    setTasks(updatedTasks);
  };

 console.log(tasks);
  return (
  <div className="min-h-screen bg-gray-100 flex justify-center items-center">
    <div className="bg-white p-6 rounded-xl shadow-lg w-[450px]">
      <h1 className="text-3xl font-bold text-center mb-4">
        To-Do App
      </h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />

        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
       <p className="mb-3 text-gray-600">
      Total Tasks: {tasks.length}
       </p>
      <ul className="space-y-2">
        {tasks.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span
              className={
       item.completed
            ? "line-through text-gray-500 font-semibold"
             : "font-medium"
            }
            >
              {item.text}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  const updatedTasks = [...tasks];
                  updatedTasks[index].completed =
                    !updatedTasks[index].completed;
                  setTasks(updatedTasks);
                }}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Complete
              </button>

              <button
                onClick={() => deleteTask(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}

export default App;