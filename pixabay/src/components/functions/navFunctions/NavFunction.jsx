import React from 'react'
import "./NavFunction.css"
import { NavLink } from 'react-router-dom'

function NavFunctions({ setCheckNavFunctions }) {
    return (
        <>
            <div className="nav_funtion">
                <div className="left_nav_function">
                    <NavLink to='/function/createImage'><button>Tải lên</button></NavLink>
                    <button>Tin nhắn</button>
                    <NavLink to="/function/edit"><button>Edit</button></NavLink>
                </div>
            </div>
        </>
    )
}

export default NavFunctions