import React, {useEffect, useContext, useState} from 'react'
import { useHistory } from 'react-router-dom'
import {AuthContext} from '../App'
import SingleTodo from './SingleTodo'
import './TodoSection.css'


const TodoSection = () => {

    const {loggedIn, userDetails, useLess, setUseLess} = useContext(AuthContext)
    const [allTodos, setAllTodos] = useState([])
    const history = useHistory()
    
    useEffect(()=>{
        
        const fetchData = ()=>{
            if(loggedIn){
                // console.log('details: ', userDetails)
                fetch(`https://api-mern-todo-app.herokuapp.com/api/todos/${userDetails._id}`)
                    .then(res=>res.json())
                    .then(data=>{
                        // console.log('data: ', data)
                        setAllTodos(data.result)
                    })
                
            }
        }
        setTimeout(fetchData(), 2000)
        fetchData()
        history.push('/')
        
    }, [useLess, setAllTodos, history, loggedIn, userDetails._id])
    // console.log('data from allTodos: ', allTodos)

    return (
        <div className="main-todo-section">
            {
                allTodos?.map((single, index)=>{
                    return <SingleTodo key={index} todo={single} useLess = {useLess} setUseLess={setUseLess}/>
                })
            }
        </div>
    )
}

export default TodoSection
