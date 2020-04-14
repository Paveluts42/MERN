import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {useRouts} from "./routs";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/auth.context";
import "materialize-css"
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";


function App() {
    const {token, userId, login, logout, ready} = useAuth()
    const isAuth = !!token
    const routes = useRouts(isAuth)
    if (!ready) {
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            token, userId, login, logout, isAuth
        }}>
            <BrowserRouter>
                {isAuth && <Navbar/>}
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>

    );
}

export default App;
