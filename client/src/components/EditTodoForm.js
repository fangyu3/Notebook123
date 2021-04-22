import React from 'react';
import TodoForm from './TodoForm';

function EditTodoForm({setEditTodoFormOpen,todo,setTodoList}) {

    const url=`/api/todo/${todo.id}`
    const httpMethod="PUT"

    return (
        <TodoForm setTodoList={setTodoList} setFormOpen={setEditTodoFormOpen} url={url} httpMethod={httpMethod} todo={todo}></TodoForm>
    )
}

export default EditTodoForm;