import React, { useState, useRef } from "react";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dragging, setDragging] = useState(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const addTask = () => {
    const text = inputValue.trim();
    if (!text) return;
    const newTask = { id: crypto.randomUUID(), text, dueDate: dueDate || null };
    setTasks([...tasks, newTask]);
    setInputValue("");
    setDueDate("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDragStart = (index) => {
    dragItem.current = index;
    setDragging(index);
  };

  const handleDragEnter = (index) => {
    if (dragItem.current === index) return;
    dragOverItem.current = index;
  };

  const handleDrop = () => {
    const from = dragItem.current;
    const to = dragOverItem.current;
    if (from === null || to === null || from === to) {
      setDragging(null);
      dragItem.current = null;
      dragOverItem.current = null;
      return;
    }
    const updated = [...tasks];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setTasks(updated);
    setDragging(null);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="text-4xl">✓</span>
            Professional Task Manager
          </h1>
          <p className="text-green-100 text-sm mt-1">Organize your day efficiently</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-4 sm:p-8">
          <div className="space-y-3 mb-6 sm:mb-8">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a new task..."
              className="w-full border-2 border-green-200 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="flex-1 border-2 border-green-200 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
              <button
                onClick={addTask}
                disabled={!inputValue.trim()}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md whitespace-nowrap"
              >
                Add Task
              </button>
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700">Your Tasks</h2>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {tasks.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-5xl sm:text-6xl mb-3">📝</div>
                <p className="text-gray-400 text-base sm:text-lg">No tasks yet. Start adding!</p>
              </div>
            ) : (
              tasks.map((task, index) => (
                <li
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className={`flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 border-2 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing group touch-none ${
                    dragging === index ? 'opacity-50 scale-95 border-green-600' : 'border-green-200 hover:border-green-400'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <span className="text-green-600 text-lg sm:text-xl flex-shrink-0">●</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-gray-800 font-medium block text-sm sm:text-base break-words">{task.text}</span>
                      {task.dueDate && (
                        <span className="text-green-600 text-xs sm:text-sm flex items-center gap-1 mt-1">
                          📅 {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="ml-2 sm:ml-3 w-8 h-8 flex-shrink-0 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all sm:opacity-0 sm:group-hover:opacity-100 opacity-100"
                    aria-label="Delete task"
                  >
                    ✕
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm">© 2024 Professional Task Manager | Built with React & Vite</p>
        </div>
      </footer>
    </div>
  );
}
