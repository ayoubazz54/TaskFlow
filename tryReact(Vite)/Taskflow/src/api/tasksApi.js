import { apiFetch } from "./apiClient";


export async function chargerTasks() {
  return await apiFetch("/tasks");
}


export async function ajouterTache(title) {
  return await apiFetch("/tasks", {
    method: "POST",
    body: JSON.stringify({ title })
  });
}


export async function vider() {
    await apiFetch("/tasks", {
      method: "DELETE"
    });
}


export async function supprimer(id) {
  await apiFetch(`/tasks/${id}`, {
    method: "DELETE"
  });
}

export async function toggleTask(task) {
  return await apiFetch(`/tasks/${task.id}`, {
    method:"PUT",
    body: JSON.stringify( { completed: !task.completed } )
  });

        
}