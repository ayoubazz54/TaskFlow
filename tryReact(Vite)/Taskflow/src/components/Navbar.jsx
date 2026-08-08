import { useAuth } from "../context/AuthContext";



function Navbar() {

    const {logout} = useAuth();

    return (
        <nav>
            <h1>TaskFlow</h1>
            <button onClick={logout}>Déconnexion</button>
        </nav>
    );

}

export default Navbar;