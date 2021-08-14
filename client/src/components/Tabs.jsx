import React, {useEffect, useContext, useState} from 'react'
import { TabContext, AuthContext } from '../App'
import './Tabs.css'

const Tabs = () => {
    const {setTab} = useContext(TabContext)
    const {loggedIn} = useContext(AuthContext)

    let temp = ['general', 'starred', 'completed']

    // const [allTodos, setAllTodos] = useState([])
    useEffect(()=>{
        setTab('general')
    }, [setTab])
    
    const [clickedIndex, setClickedIndex] = useState(0)
    return (
        <div>
            {
                loggedIn &&
                <div className="main-tabs">
                    {
                    temp.map((s, index) => {
                        // console.log(tab)
                        return <button onClick={()=>{
                            setTab(s)
                            setClickedIndex(index)
                            }} key={index} className={clickedIndex===index &&   'active-btn'}>{s}</button>
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Tabs
