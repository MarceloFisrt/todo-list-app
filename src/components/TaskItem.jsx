import { motion } from "framer-motion";

const TaskItem = ({ task, toggleTask, deleteTask }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      layout
      className="flex items-center justify-between bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded shadow mb-2"
    >
    
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        
        
      <span
        onClick={() => toggleTask(task.id)}
        className={`cursor-pointer ${
          task.done ? "line-through text-gray-500" : ""
        }`}
      >
        {task.text}
      </span>
      <button
        onClick={() => {
          if (window.confirm("Deseja realmente excluir esta tarefa?")) {
            deleteTask(task.id);
          }
        }}
        className="text-red-500 font-bold hover:text-red-700 transition"
      >
        🗑️
      </button>
    </motion.div>
  );
};

export default TaskItem;
