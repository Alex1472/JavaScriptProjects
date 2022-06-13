import { useState  } from "react";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks"


function App() {
  const [tasks, setTasks] = useState([
    { 
        id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 5th at 2:30pm',
        reminer: true
    },
    { 
        id: 2,
        text: 'Meeting at School',
        day: 'Feb 6th at 1:30pm',
        reminder: true
    },
    { 
        id: 3,
        text: 'Food Shopping',
        day: 'Feb 5th at 2:30pm',
        reminder: false
    }
  ]);
  const [showAddTask, SetShowAddTask] = useState(false);

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }
  const toggleTask = id => {
    setTasks(tasks.map(task => task.id !== id ? task : { ...task, reminder: !task.reminder }))
  }
  const addTask = task => {
    task = { ...task, id: Math.floor(Math.random() * 10000) + 1 };
    setTasks([...tasks, task]);
  }
  const toggleShowAddTask = () => {
    SetShowAddTask(!showAddTask);
  }


  return (
    <div className="container">
        <Header title="Task Tracker" showAddTask={showAddTask} toggleShowAddTask={toggleShowAddTask} />
        {showAddTask && <AddTask addTask={addTask} />}
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleTask}/> : "There is no tasks!"}
    </div>

  );
}

export default App;
