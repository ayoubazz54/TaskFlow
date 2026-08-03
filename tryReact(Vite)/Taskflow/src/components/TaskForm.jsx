function TaskForm({newTask, setNewTask, handleAjouter, handleKeyDown, handleVider}) {
    return (
    <>
        <input 
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Nouvelle tâche"
            onKeyDown={handleKeyDown}
        />

        <button onClick={handleAjouter}>Ajouter</button>

        <button onClick={handleVider}>Vider la liste</button>
    </>
    );
}

export default TaskForm;