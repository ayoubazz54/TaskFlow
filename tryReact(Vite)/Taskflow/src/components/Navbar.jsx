function Navbar({logout}) {

    return (
        <nav>
            <h1>TaskFlow</h1>
            <button onClick={logout}>Déconnexion</button>
        </nav>
    );

}

export default Navbar;