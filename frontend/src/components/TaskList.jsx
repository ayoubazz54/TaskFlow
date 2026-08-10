import TaskItem from "./TaskItem";

function TaskList({tasks, supprimer, toggleTask}) {
    
    return (

        <ul>

            {tasks.map((task, index) => 
            <TaskItem 
                key={task.id}
                task={task}
                onDelete={() => supprimer(task.id)}
                onToggle={() => toggleTask(task)}
            />
            )}

        </ul>

    );

}

export default TaskList;