function TaskItem({task, onDelete, onToggle}) {

    return (
        <li>
            <span 
                onClick={onToggle}
                style={{
                    cursor: "pointer",
                    textDecoration: task.completed ? "line-through" : "none"
                }}
            >
                {task.title}
            </span>
            <button onClick={onDelete}>Supprimer</button>
        </li>
    );

}

export default TaskItem;