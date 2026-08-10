import { useAuth } from "../context/AuthContext";


function Navbar() {

    const {user, logout} = useAuth();

    return (
        <nav>
            <h1>TaskFlow</h1>

            {user && (
                <span>{user.email}</span>
            )}

            <button onClick={logout}>Déconnexion</button>
        </nav>
    );

}

export default Navbar;