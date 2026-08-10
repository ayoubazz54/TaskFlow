function TaskForm({loading, newTask, setNewTask, handleAjouter, handleKeyDown, handleVider}) {
    return (
    <>
        <input 
            disabled={loading}
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Nouvelle tâche"
            onKeyDown={handleKeyDown}
        />

        <button onClick={handleAjouter} disabled={loading}>Ajouter</button>

        <button onClick={handleVider} disabled={loading}>Vider la liste</button>
    </>
    );
}

export default TaskForm;