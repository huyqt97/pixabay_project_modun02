import React, { useEffect, useState } from 'react'
import "./NavbarHomePage.css"
import axios from 'axios';

function NavbarHomePage({ setData, setRev }) {

    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/user')
            .then(response => {
                setUsers(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleClickF = (e) => {
        console.log(e.target.value)
        setData(e.target.value)
    };
    return (
        <div className='navbar_homepage'>
            <div className="nav_left">
                <button onClick={handleClickF} value={''}>Tất cả</button>
                <button onClick={handleClickF} value={'Thiên Nhiên'}>Thiên Nhiên</button>
                <button onClick={handleClickF} value={'Anime'}>Anime</button>
                <button onClick={handleClickF} value={'Girl'}>Girl</button>
                <button onClick={handleClickF} value={'Việt Nam'}>Việt Nam</button>
                <button onClick={handleClickF} value={'Biển'}>Biển</button>
                <button onClick={handleClickF} value={'Background'}>Background</button>
                <button onClick={handleClickF} value={'Động vật'}>Động vật</button>
            </div>
            <select className='nav_rigth' onChange={(e) => setRev(e.target.value)}>
                <option value={true} >Mới nhất</option>
                <option value={false}>Thịnh hành</option>
            </select>

        </div>
    )
}

export default NavbarHomePage