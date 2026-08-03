const API_URL = import.meta.env.VITE_API_URL;

export async function chargerTasks() {
    const res = await fetch(`${API_URL}/tasks`);
    return await res.json();
}


export async function ajouterTache(title) {

    const res = await fetch(
      `${API_URL}/tasks`,
      {
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify( {title} )
      }
    );

    return await res.json();

}


export async function vider() {
    await fetch(
      `${API_URL}/tasks`,
      {
        method: "DELETE"
      }
    );
}


export async function supprimer(id) {

    await fetch(
      `${API_URL}/tasks/${id}`,
      {
        method: "DELETE"
      }
    );
}

export async function toggleTask(task) {

    const res = await fetch(
      `${API_URL}/tasks/${task.id}`,
      {
        method:"PUT",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify( { completed: !task.completed } )
      }
    );
    return await res.json();
}