import React from 'react'
import NavFunctions from './navFunctions/NavFunction'
import "./Functions.css"
import { Outlet } from 'react-router-dom'
import FooterFunction from './navFunctions/FooterFunction'

function Functions() {
    return (
        <div className='function'>
            <NavFunctions />
            <Outlet />
            <FooterFunction />
        </div>
    )
}
export default Functions