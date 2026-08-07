import { useState } from "react";
import { register } from "../api/authApi";

function Register() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    async function handleRegister() {
        try {
            await register(email, password);
            alert("Compte créé.");
            setError("");
        }
        catch(error) {
            setError("Impossible de s'inscrire.");
        }
    }

    return (
        <div>
            <p>Inscription</p>

            <input 
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="L'email"
            />

            <input 
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Le mot de passe"
            />

            <button onClick={handleRegister}>S'inscrire</button>
            
            <Link to="/login">Déjà un compte ? Se connecter</Link>
        </div>
    );
}

export default Register;