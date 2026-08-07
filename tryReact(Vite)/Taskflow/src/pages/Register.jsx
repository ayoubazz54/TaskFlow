import { useState } from "react";
import { register } from "../api/authApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleRegister() {
        try {
            await register(email, password);
            alert("Compte créé.");
            navigate("/home");
            setError("");
        }
        catch(error) {
            setError("Impossible de s'inscrire.");
        }
    }

    return (
        <div>

            {error &&(
                <p style={{color:"red"}}>{error}</p>
            )}

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