import React, { Fragment,useEffect, useState } from 'react'
import EditTodo from './EditTodo'


const ListTodo = () => {

    const [todos,setTodo] = useState([])

    // delete todo finction
    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method:"DELETE"
            })

            setTodo(todos.filter(todo => todo.todo_id!==id))

        } catch (error) {
            console.log(error);
        }
    }

    const getTodos = async () =>{
        try {
            const response = await fetch('http://localhost:5000/todos')
            const jsonData = await response.json()

            setTodo(jsonData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getTodos()
    },[])
    console.log(todos);
    return (
        <Fragment>
            {" "}
            <table class="table mt-5">
                <thead>
                    <tr>
                        <th>DESCRIPTION</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {/*
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>
                    */}
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo={todo}/>
                            </td>
                            <td><button className='btn btn-danger'
                            onClick={() => deleteTodo(todo.todo_id)}
                            >DELETE</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodo;