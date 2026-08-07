import { useState } from "react";
import { login } from "../api/authApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogin() {
        try {
            const res = await login(email, password);
            localStorage.setItem("token", res.token);
            navigate("/home");
            setError("");
        }
        catch(error) {
            setError("Impossible de se connecter.");
        }
    }

    return (
        <div>

            {error &&(
                <p style={{color:"red"}}>{error}</p>
            )}

            <p>Connexion</p>

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

            <button onClick={handleLogin}>Se connecter</button>

            <Link to="/register">Créer un compte</Link>

        </div>
    );
}

export default Login;