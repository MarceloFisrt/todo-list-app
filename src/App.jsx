import { PlusIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import ThemeToggle from "./components/ThemeToggle";
import { AnimatePresence  } from 'framer-motion';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  // Carregar tarefas salvas do localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  // Salvar no localStorage toda vez que as tarefas mudarem
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (text.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text,
      done: false,
    };
    setTasks([newTask, ...tasks]);
    setText("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="max-w-md w-full mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Qual é sua Tarefa Hoje?</h1>
          <ThemeToggle />
        </div>
        <div className="flex mb-4 gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Nova tarefa..."
            className="flex-1 px-3 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700"
          />
        <button
          onClick={addTask}
           className="relative flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded overflow-hidden transition-transform duration-300 hover:scale-105 shadow-lg"
           >
          <span className="absolute inset-0 bg-white opacity-10 animate-ping"></span>
         <PlusIcon className="relative z-10 w-5 h-5" />
        </button>
     </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">Nenhuma tarefa ainda.</p>
        ) : (
          <AnimatePresence>
  {tasks.map(task => (
    <TaskItem
      key={task.id}
      task={task}
      toggleTask={toggleTask}
      deleteTask={deleteTask}
   />
         ))}
         </AnimatePresence>

        )}
      </div>
    </div>
  );
}

export default App;
