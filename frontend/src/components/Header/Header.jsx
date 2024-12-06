import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import axios from '../../Axios/axios.js';
import TokenContext from '../../context/TokenContext.js';
import "./header.css";
function Header() {

    const token = localStorage.getItem("authToken");
    const { user } = useContext(TokenContext);
    console.log("user", user);
    const logout = async() => {
        try {
            const res = await axios.post("/logout");
            console(res);
          } catch (error) {
            console.log(error);
          }
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    }
    

    return (
        <div>
            <nav className='header bg-zinc-800 flex justify-between items-center'>
                <div className="logo sm:w-1/4 w-1/2 text-zinc-100 font-semibold text-center">
                    <NavLink to="/" className='active'>Todo App</NavLink>
                </div>
                <div className='flex justify-between'>
                    {
                        token ? (
                            <div className='flex items-center justify-center'>
                                <p className='mr-5 sm:text-xl text-sm text-zinc-100'>Welcome, <span className=' sm:text-2xl text-sm text-blue-300 capitalize'>{user.name}</span></p>
                                <button onClick={logout} className="logout mr-2">Logout</button>
                            </div>
                        ) : (
                            <ul className='flex text-zinc-400 justify-end gap-3 w-3/4 pr-6'>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                            </ul>
                        )
                    }
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Header;