import React, {useContext, useState} from 'react' 
import { TabContext } from '../App'
import './SingleTodo.css'
import {AiOutlineStar, AiFillStar, AiFillDelete} from 'react-icons/ai'
import {TiTickOutline, TiTick} from 'react-icons/ti'
// import {FaPen} from 'react-icons/fa'

const SingleTodo = (props) => {
    const {tab} = useContext(TabContext)
    // const [starred, setStarred] = useState(false)
    // console.log(props.todo.completed)
    const [starred, setStarred] = useState(props.todo.starred)
    const [completed, setCompleted] = useState(props.todo.completed)

    const star = ()=>{
        fetch('https://api-mern-todo-app.herokuapp.com/api/star', {
            method: 'POST',
            body: JSON.stringify(props.todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res=>res.json())
        .then(data=>{return})

        setStarred(true)
        props.setUseLess(!props.useLess)
    }

    const unstar = ()=>{
        fetch('https://api-mern-todo-app.herokuapp.com/api/unstar', {
            method: 'POST',
            body: JSON.stringify(props.todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res=>res.json())
        .then(data=>{return})

        setStarred(false)
        props.setUseLess(!props.useLess)
    }

    const complete = ()=>{
        fetch('https://api-mern-todo-app.herokuapp.com/api/complete', {
            method: 'POST',
            body: JSON.stringify(props.todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            setCompleted(!completed)
        })
        props.setUseLess(!props.useLess)
        
    }
    const uncomplete = ()=>{
        fetch('https://api-mern-todo-app.herokuapp.com/api/incomplete', {
            method: 'POST',
            body: JSON.stringify(props.todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            setCompleted(!completed)
        })
        props.setUseLess(!props.useLess)
        
    }

    const deleteFunction = ()=>{
        fetch('https://api-mern-todo-app.herokuapp.com/api/delete', {
            method: 'POST',
            body: JSON.stringify(props.todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res=>res.json())
        .then(data=>{return})
        props.setUseLess(!props.useLess)
    }

    return (
        <div>
            {
                tab==='general' &&
                <div className="todo">
                    <h5>{props.todo.todo}</h5>
                    <div>
                        {
                            starred ? 
                            <AiFillStar className="starred-icon" onClick={unstar} size={19}/> 
                            : 
                            <AiOutlineStar className="star-icon" onClick={star} size={19}/>
                        }

                        <AiFillDelete className="trash-icon" onClick={deleteFunction} size={18}/>
                        
                        {
                            completed ?
                            <TiTick className="ticked-icon" onClick={uncomplete} size={20}/>
                            :
                            <TiTickOutline className="tick-icon" onClick={complete} size={20}/>
                        }
                        
                    </div>

                </div>
            }
            {
                tab==='starred' &&
                props.todo.starred && 
                <div className="todo">
                    <h5>{props.todo.todo}</h5>
                    <div>
                        {
                            starred ? 
                            <AiFillStar className="starred-icon" onClick={unstar} size={19}/> 
                            : 
                            <AiOutlineStar className="star-icon" onClick={star} size={19}/>
                        }

                        <AiFillDelete className="trash-icon" onClick={deleteFunction} size={18}/>
                        
                        {
                            completed ?
                            <TiTick className="ticked-icon" onClick={uncomplete} size={20}/>
                            :
                            <TiTickOutline className="tick-icon" onClick={complete} size={20}/>
                        }
                        
                    </div>
                </div>
                
            }
            {
                tab==='completed'&&
                props.todo.completed && 
                <div className="todo">
                    <h5>{props.todo.todo}</h5>
                    <div>
                        {
                            starred ? 
                            <AiFillStar className="starred-icon" onClick={unstar} size={19}/> 
                            : 
                            <AiOutlineStar className="star-icon" onClick={star} size={19}/>
                        }

                        <AiFillDelete className="trash-icon" onClick={deleteFunction} size={18}/>
                        
                        {
                            completed ?
                            <TiTick className="ticked-icon" onClick={uncomplete} size={20}/>
                            :
                            <TiTickOutline className="tick-icon" onClick={complete} size={20}/>
                        }
                        
                    </div>
                </div>
            }

        </div>
    )
}

export default SingleTodo
