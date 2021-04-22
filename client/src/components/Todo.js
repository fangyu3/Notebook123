import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment-timezone'

const useStyles = makeStyles((theme) => ({
}))


function Todo({ todo, setTodoList, setEditTodoFormOpen,setTodoEdit }) {

    const classes = useStyles()
    const [open, setOpen] = useState(false)

    const showDetail = () => {
        setOpen(prevState => {
            return !prevState
        })
    }

    const deleteTodo = () => {
        fetch(`/api/todo/${todo.id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => {
                alert(res.success)
                setTodoList(prevState => {
                    return prevState.filter(e => e.id !== todo.id)
                })
            })
            .catch(err => {
                alert(err)
            })
    }

    const toggleEditTodoForm = () => {
        setTodoEdit(todo)
        setEditTodoFormOpen(prevState => {
            return !prevState
        })
    }

    const completeTodo = () => {
        fetch(`/api/todo/${todo.id}/complete`, {
            method: "PUT",
            body: JSON.stringify({
                status: "completed"
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(res => {
                alert(res.success)
                setTodoList(prevState => {
                    return prevState.filter(e => e.id !== todo.id)
                })
            })
            .catch(err => {
                alert(err)
            })
    }

    return (
        <Grid item container xs={12} alignItems="center">

            <Grid item container xs={6} onClick={showDetail} justify="flex-start"><Typography>{todo.name}</Typography></Grid>

            <Grid item container xs={6} alignItems="center" justify="flex-end">
                <Grid item xs={2}><Button onClick={toggleEditTodoForm}>Edit</Button></Grid>
                <Grid item xs={2}><Button onClick={completeTodo}>Done</Button></Grid>
                <Grid item xs={2}><DeleteIcon onClick={deleteTodo}></DeleteIcon></Grid>
            </Grid>

            {open && (
                <>
                    <Grid container item xs={6} justify="flex-start">
                        <Typography>Notes:</Typography>
                    </Grid>
                    <Grid container item xs={6} justify="flex-end">
                        <Typography>Due date: {moment(todo.due_date).tz("UTC").format("YYYY-MM-DD")}</Typography>
                    </Grid>
                    <Grid container item xs={12} justify="flex-start">
                        <Typography>{todo.description}</Typography>
                    </Grid>
                </>
            )}

        </Grid>
    )

}

export default Todo;