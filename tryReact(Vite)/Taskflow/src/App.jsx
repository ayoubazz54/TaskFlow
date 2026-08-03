import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import "./styles/App.css";
import {chargerTasks, ajouterTache, vider, supprimer, toggleTask} from "./api/tasksApi";
import TaskCounter from "./components/TaskCounter";
import TaskFilters from "./components/TaskFilters";
import TaskForm from "./components/TaskForm";



function App() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter(task => {
    if(filter === "all") {
      return true;
    }
    if(filter === "todo") {
      return !task.completed;
    }
    if(filter === "done") {
      return task.completed;
    }
  });



  async function load() {
    const data = await chargerTasks();
    setTasks(data);
  }

  async function handleAjouter() {
    if(newTask.trim()==="")
        return;
    const task = await ajouterTache(newTask);
    setTasks(prev => [
        ...prev,
        task
    ]);
    setNewTask("");
  }

  async function handleSupprimer(id) {
    await supprimer(id);
    const data = await chargerTasks();
    setTasks(data);
  }

  async function handleToggle(task) {
    await toggleTask(task);
    const data = await chargerTasks();
    setTasks(data);
  }

  async function handleVider() {
    await vider();
    const data = await chargerTasks();
    setTasks(data);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleAjouter();
    }
  }

  useEffect(() => {
    console.log('Le composant App est créé !');
  }, []);

  // Remplir tasks depuis le backend:
  useEffect(() => {
      load();
  }, []);


  useEffect(() => {
    if(tasks.length === 0){
      console.log("Aucunne tâche !");
    }
  }, [tasks]);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  // changer le titre du navigateur
  useEffect(() => {
    document.title =
        "TaskFlow (" + tasks.length + ")";
  }, [tasks]);


  console.log(filteredTasks);
  return (
    <div>
      <Navbar />

      <TaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        handleAjouter={handleAjouter}
        handleKeyDown={handleKeyDown}
        handleVider={handleVider}
      />

      <TaskFilters
        setFilter={setFilter}
      />

      <TaskCounter
        count={tasks.length}
      />

      <TaskList 
        tasks={filteredTasks}
        supprimer={handleSupprimer}
        toggleTask={handleToggle}
      />
    </div>
  );
}

export default App;