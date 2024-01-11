import React, { useState } from 'react'
import "./HomePage.css"
import Header from './header/Header'
import Mainpage from './mainPage/Mainpage'
import NavbarHomePage from './navbarHomePage/NavbarHomePage'
import Introduce from './introduce/Introduce'
import Footer from './footer/Footer'
import { Outlet } from 'react-router-dom'
function HomePage({ setData, setRev }) {



    return (
        <div className='page'>
            <Header />
            <div className="homePage">
                <NavbarHomePage setData={setData} setRev={setRev} />
                <Outlet />
                <Introduce />
                <Footer />
            </div>
        </div>
    )
}

export default HomePage