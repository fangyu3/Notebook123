import React, { useState, useEffect } from 'react';
import Todo from '../components/Todo';
import AddTodoForm from '../components/AddTodoForm'
import EditTodoForm from '../components/EditTodoForm'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    todoListContainer: {
        width: 700,
        margin: "auto"
    }
}))

function TodoList() {

    const classes = useStyles();
    const [todoList, setTodoList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [addTodoFormOpen, setAddTodoFormOpen] = useState(false)
    const [editTodoFormOpen, setEditTodoFormOpen] = useState(false)
    const [todoEdit, setTodoEdit] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        fetch("/api/todo/", {
            method: "GET",
        })
            .then(res => res.json())
            .then(res => {
                setTodoList(res.todos)
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
            })
    }, [])

    const printTodoList = () => {
        return todoList.map(todo => (
            <Todo key={todo.id} todo={todo} setTodoList={setTodoList} setEditTodoFormOpen={setEditTodoFormOpen} setTodoEdit={setTodoEdit}></Todo>
        ))
    }

    const toggleAddTodoForm = () => {
        setAddTodoFormOpen(prevState => {
            return !prevState
        })
    }

    const toggleEditTodoForm = () => {
        setEditTodoFormOpen(false)
    }


    if (isLoading) {
        return <CircularProgress disableShrink />
    }

    return (
        <Grid container className={classes.todoListContainer}>
            <Grid container item xs={12} justify="center">
                <Grid item xs={2}><Typography>TodoList</Typography></Grid>
                <Grid item xs={1}>
                    {
                        editTodoFormOpen ? <EditIcon onClick={toggleEditTodoForm}/> :
                                           <AddCircleIcon onClick={toggleAddTodoForm} />
                    }
                </Grid>
            </Grid>
            { addTodoFormOpen &&
                <AddTodoForm setTodoList={setTodoList} setAddTodoFormOpen={setAddTodoFormOpen}></AddTodoForm>
            }
            { editTodoFormOpen &&
                <EditTodoForm todo={todoEdit} setEditTodoFormOpen={setEditTodoFormOpen} setTodoList={setTodoList} />
            }
            { !addTodoFormOpen && !editTodoFormOpen && printTodoList()}
        </Grid>
    )

}

export default TodoList;