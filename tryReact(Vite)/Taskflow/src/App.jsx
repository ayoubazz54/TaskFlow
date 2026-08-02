import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import "./styles/App.css";


function App() {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter(task => {
    if(filter === "all") {
      return true;
    }
    return task.completed === (filter === "done");
  });

  useEffect(() => {
    console.log('Le composant App est créé !');
  }, []);

  async function chargerTasks() {
    const res = await fetch("http://localhost:3000/tasks");
    const data = await res.json();
    setTasks(data);
  }

  // Remplir tasks depuis le backend:
  useEffect(() => {
      chargerTasks();
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

  async function ajouterTache() {
    
    if(newTask.trim() === "")
      return;

    const res = await fetch(
      "http://localhost:3000/tasks",
      {
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify( { title: newTask } )
      }
    );

    const task = await res.json();

    setTasks(prevTasks => [
      ...prevTasks,
      task
    ]);

    setNewTask("");

  }

  function vider() {
    setTasks([]);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      ajouterTache();
    }
  }

  async function supprimer(id) {

    await fetch(
      "http://localhost:3000/tasks/" + id,
      {
        method: "DELETE"
      }
    );

    chargerTasks();
  }

  async function toggleTask(task) {

    await fetch(
      "http://localhost:3000/tasks/" + task.id,
      {
        method:"PUT",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify( { completed: !task.completed } )
      }
    );

    chargerTasks();

  }

  console.log(filteredTasks);
  return (
    <div>
      <Navbar />

      <input 
        type="text"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
        placeholder="Nouvelle tâche"
        onKeyDown={handleKeyDown}
      />

      <button onClick={ajouterTache}>Ajouter</button>

      <button onClick={vider}>Vider la liste</button>

      <button onClick={() => setFilter("all")}>
          Toutes
      </button>

      <button onClick={() => setFilter("todo")}>
          À faire
      </button>

      <button onClick={() => setFilter("done")}>
          Terminées
      </button>

      <p>Nombre des tâches : {tasks.length}</p>

      <TaskList 
        tasks={filteredTasks}
        supprimer={supprimer}
        toggleTask={toggleTask}
      />
    </div>
  );
}

export default App;