import React, {useContext, useState} from 'react'
import {AuthContext} from '../App'
import './AddTodo.css'

const AddTodo = () => {
    const {userDetails, setUseLess, useLess, loggedIn} = useContext(AuthContext)
    // console.log(userDetails)
    const [todo, setTodo] = useState('')
    const submitForm = (e)=>{
        e.preventDefault()
        fetch('https://api-mern-todo-app.herokuapp.com/api/addtodo', {
            method: 'POST',
            body: JSON.stringify({authorID: userDetails._id, todo: todo}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res=>res.json())
        .then(data=>e.preventDefault())
        setTodo('')
        setUseLess(!useLess)
    }
    return (
        <div className="container-form">
        {
            loggedIn &&
            <div className="form-container">
            <form className="add-todo-form" onSubmit={e=>submitForm(e)}>
                
                <input type="text" id="todo-input" className="form-control" required value={todo} onChange={e=>setTodo(e.target.value)} placeholder="Add Your Task..." style={{height: '40px'}}/>
                <button className="btn btn-info add-btn">Add</button>
                
            </form>
            </div>
        }
        </div>
    )
}

export default AddTodo
