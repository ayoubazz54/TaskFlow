import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import "../styles/App.css";
import {chargerTasks, ajouterTache, vider, supprimer, toggleTask} from "../api/tasksApi";
import TaskCounter from "../components/TaskCounter";
import TaskFilters from "../components/TaskFilters";
import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";


function Home() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    try {
      setLoading(true);
      const data = await chargerTasks();
      setTasks(data);
      setError("");
    }
    catch(error) {
      setError("Impossible de connecter au serveur.");
    }
    finally {
      setLoading(false);
    }
  }

  async function handleAjouter() {
    if(newTask.trim()==="")
      return;
    try {
      setLoading(true);
      const task = await ajouterTache(newTask);
      setTasks(prev => [
          ...prev,
          task
      ]);
      setNewTask("");
      setError("");
    }
    catch(error) {
      setError("Impossible d'ajouter la tâche.");
    }
    finally{
      setLoading(false);
    }
  }

  async function handleSupprimer(id) {
    try {
      setLoading(true);
      await supprimer(id);
      await load();
    }
    catch(error) {
      setError("Impossible de supprimer la tâche.");
    }
    finally{
      setLoading(false);
    }
  }

  async function handleToggle(task) {
    try {
      setLoading(true);
      await toggleTask(task);
      await load();
    }
    catch(error) {
      setError("Impossible de modifier la tâche.");
    }
    finally{
      setLoading(false);
    }
  }

  async function handleVider() {
    try {
      setLoading(true);
      await vider();
      await load();
    }
    catch(error) {
      setError("Impossible de vider la liste.");
    }
    finally{
      setLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleAjouter();
    }
  }

  function logout() {
      localStorage.removeItem("token");
      navigate("/login");
  }

  useEffect(() => {
    console.log('Le composant Home est créé !');
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
      <Navbar logout={logout}/>

      {loading && <p>Chargement...</p>}

      {error &&(
        <p style={{color:"red"}}>{error}</p>
      )}

      <TaskForm 
        loading={loading}
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

export default Home;