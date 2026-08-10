function TaskFilters({setFilter}) {
    return (
        <>
            <button onClick={() => setFilter("all")}>
                Toutes
            </button>

            <button onClick={() => setFilter("todo")}>
                À faire
            </button>

            <button onClick={() => setFilter("done")}>
                Terminées
            </button>
        </>
    );
}

export default TaskFilters;