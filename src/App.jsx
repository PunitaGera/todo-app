//import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [darkMode, setDarkMode] = useState(() => {
  const savedMode = localStorage.getItem("darkMode");
  return savedMode ? JSON.parse(savedMode) : false;
  
});
  const [editIndex, setEditIndex] = useState(null);
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});
useEffect(() => {
  console.log("Saving tasks:", tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
useEffect(() => {
  localStorage.setItem(
    "darkMode",
    JSON.stringify(darkMode)
  );
}, [darkMode]);
  const addTask = () => {
  if (!task.trim()) return;

 if (editIndex !== null) {
  const updatedTasks = [...tasks];
  updatedTasks[editIndex].text = task;
  updatedTasks[editIndex].dueDate = dueDate;
  updatedTasks[editIndex].priority = priority;

  setTasks(updatedTasks);
  setEditIndex(null);
}
  else {
    setTasks([
  ...tasks,
  {
    text: task,
    completed: false,
    dueDate: dueDate,
    priority: priority ,
  },
]);
  }

  setTask("");
  setDueDate("");
  setPriority("Medium");
};

  const deleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter(
      (_, index) => index !== indexToDelete
    );

    setTasks(updatedTasks);
  };
    const toggleComplete = (index) => {
      const updatedTasks = [...tasks];

      updatedTasks[index].completed =
        !updatedTasks[index].completed;

      setTasks(updatedTasks);
    };
    const clearAllTasks = () => {
        setTasks([]);
      };
 console.log(tasks);
  return (
  <div
  className={`min-h-screen flex justify-center items-center ${
    darkMode ? "bg-gray-900" : "bg-gray-100"
  }`}
>
    <div
      className={`p-6 rounded-xl shadow-lg w-[650px] ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
          <button
      onClick={() => setDarkMode(!darkMode)}
      className="mb-4 bg-gray-700 hover:bg-gray-800 hover:scale-105 transition text-white px-4 py-2 rounded"
    >
      {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
    </button>
      <h1 className="text-3xl font-bold text-center mb-4">
        To-Do App
      </h1>

      <div className="flex gap-2 mb-4">
  <input
    type="text"
    placeholder="Enter a task"
    value={task}
    onChange={(e) => setTask(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        addTask();
      }
    }}
    className="flex-1 border rounded px-3 py-2"
  />

  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
    className="border rounded px-2 py-2"
  />
      <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      className="border rounded px-2 py-2"
    >
      <option value="High">🔴 High</option>
      <option value="Medium">🟡 Medium</option>
      <option value="Low">🟢 Low</option>
    </select>

  <button
    onClick={addTask}
    className="bg-blue-500 hover:bg-blue-600 hover:scale-105 transition text-white px-4 py-2 rounded"
  >
    {editIndex !== null ? "Update" : "Add"}
  </button>
</div>
       <p className="mb-3 text-gray-600">
      Total Tasks: {tasks.length}
       </p>
       <p className="mb-3 text-green-600">
        Completed Tasks: {
          tasks.filter(task => task.completed).length
        }
      </p>
      <div className="mb-4">
  <p className="mb-2 font-semibold">
    Progress: {tasks.filter(task => task.completed).length} / {tasks.length}
  </p>

  <div className="w-full bg-gray-300 rounded-full h-4">
    <div
      className="bg-green-500 h-4 rounded-full"
      style={{
        width: `${
          tasks.length === 0
            ? 0
            : (tasks.filter(task => task.completed).length / tasks.length) * 100
        }%`,
      }}
    ></div>
  </div>
</div>
          <p className="mb-3 text-blue-600">
      Pending Tasks: {
        tasks.filter(task => !task.completed).length
      }
    </p>
        {tasks.length > 0 &&
    tasks.every(task => task.completed) && (
      <p className="text-center text-green-600 font-bold mb-4">
        🎉 Congratulations! All tasks completed.
      </p>
    )}
       <button
        onClick={clearAllTasks}
       className="bg-red-600 hover:bg-red-700 hover:scale-105 transition text-white px-4 py-2 rounded mb-4"
      >
        Clear All Tasks
      </button>
      <input
      type="text"
      placeholder="Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
     className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
    />
      <ul className="space-y-2">
  {tasks.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  ).length === 0 ? (

    <p className="text-center text-gray-500 py-4">
      📋 No tasks found.
    </p>

  ) : (

    tasks
      .filter((item) =>
        item.text.toLowerCase().includes(search.toLowerCase())
      )
      .map((item, index) => (
          <li
            key={index}
           className="flex justify-between items-center border border-gray-300 p-3 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div>
           <p
              className={
                item.completed
                  ? "line-through text-gray-500 font-semibold"
                  : "font-medium"
              }
            >
              {item.text}
            </p>

            <p className="text-xs text-gray-500">
              📅 {item.dueDate || "No Date"}
            </p>
          <span
  className={`inline-block text-xs font-bold px-3 py-1 rounded-full mt-1 ${
    item.priority === "High"
      ? "bg-red-100 text-red-700"
      : item.priority === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700"
  }`}
>
  {item.priority}
</span>
                </div>

            <div className="flex gap-2">
             <button
        onClick={() => toggleComplete(index)}
            className={`text-white px-3 py-1 rounded hover:scale-105 transition ${
      item.completed
        ? "bg-gray-500"
        : "bg-green-500 hover:bg-green-600"
    }`}
          >
        {item.completed ? "✔ Completed" : "Complete"}
      </button>

              <button
                  onClick={() => {
                    setTask(item.text);
                    setDueDate(item.dueDate || "");
                    setPriority(item.priority || "Medium");
                    setEditIndex(index);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 hover:scale-105 transition text-white px-3 py-1 rounded"
                >
                Edit
              </button>
              <button
                onClick={() => {
                if (window.confirm("Delete this task?")) {
                  deleteTask(index);
                }
              }}
                className="bg-red-500 hover:bg-red-600 hover:scale-105 transition text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        )))}
      </ul>
    </div>
  </div>
);
}

export default App;