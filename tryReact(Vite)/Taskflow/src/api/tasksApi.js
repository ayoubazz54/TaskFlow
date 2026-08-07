const API_URL = import.meta.env.VITE_API_URL;

export async function chargerTasks() {

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${API_URL}/tasks`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return await res.json();
}


export async function ajouterTache(title) {

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${API_URL}/tasks`,
      {
        method:"POST",
        headers:{
            Authorization: `Bearer ${token}`,
            "content-type":"application/json"
        },
        body: JSON.stringify( {title} )
      }
    );

    return await res.json();

}


export async function vider() {

    const token = localStorage.getItem("token");

    await fetch(
      `${API_URL}/tasks`,
      {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
    );
}


export async function supprimer(id) {

    const token = localStorage.getItem("token");

    await fetch(
      `${API_URL}/tasks/${id}`,
      {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
    );
}

export async function toggleTask(task) {

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${API_URL}/tasks/${task.id}`,
      {
        method:"PUT",
        headers:{
            Authorization: `Bearer ${token}`,
            "content-type":"application/json"
        },
        body: JSON.stringify( { completed: !task.completed } )
      }
    );
    return await res.json();
}