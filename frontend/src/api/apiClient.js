const API_URL = "/api";

export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "content-type":"application/json",
        ...options.headers
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(
          `${API_URL}${endpoint}`,
          {
            ...options,
            headers
          }
        );
    
    if (!res.ok) {
        throw new Error(`Erreur HTTP : ${res.status}`);
    }

    if (res.status === 204) {
        return null;
    }

    return res.json();
    
}
