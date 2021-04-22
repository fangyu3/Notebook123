import React from 'react';
import TodoForm from './TodoForm';


function AddTodoForm({ setTodoList, setAddTodoFormOpen }) {

    const url = "/api/todo"
    const httpMethod = "POST"
    return (
        <TodoForm setTodoList={setTodoList} setFormOpen={setAddTodoFormOpen} url={url} httpMethod={httpMethod} todo={null}></TodoForm>
    )
}

export default AddTodoForm;