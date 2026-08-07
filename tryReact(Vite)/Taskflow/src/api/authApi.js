const API_URL = import.meta.env.VITE_API_URL;

export async function register(email, password) {
    
    const res = await fetch(
        `${API_URL}/register`,
        {
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({email, password})
        }
    );

    return await res.json();

}

export async function login(email, password) {

    const res = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({email, password})
        }
    );

    return await res.json();
}
