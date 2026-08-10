import { apiFetch } from "./apiClient";


export async function getMe() {
    return apiFetch("/users/me");
}
