# Professional Task Manager

A modern, responsive todo list application built with React and Vite, featuring drag-and-drop functionality and a clean green-themed UI.

## Features

-  **Add Tasks** - Create new tasks with optional due dates
-  **Delete Tasks** - Remove completed or unwanted tasks
-  **Drag & Drop** - Reorder tasks by dragging and dropping
-  **Due Dates** - Set and display due dates for tasks
-  **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
-  **Modern UI** - Clean green color scheme with smooth animations

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "ToDoList- React"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

- **Add a task**: Type in the task input field, optionally select a due date, and click "Add Task" or press Enter
- **Delete a task**: Hover over a task and click the red ✕ button
- **Reorder tasks**: Click and drag a task to a new position in the list
- **View task count**: See the total number of tasks in the badge at the top of the list

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Project Structure

```
ToDoList- React/
├── src/
│   ├── components/
│   │   └── todolist.jsx    # Main todo list component
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
└── package.json             # Dependencies and scripts
```
Deployment link: https://to-do-list-react-pkm4.vercel.app/

