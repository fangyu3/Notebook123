import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment-timezone'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

function TodoForm({setTodoList,setFormOpen,url,httpMethod,todo}) {
    const [todoName, setTodoName] = useState(todo===null?"":todo.name)
    const [todoDescription, setTodoDescription] = useState(todo===null?"":todo.description)
    const [selectedDate, setSelectedDate] = useState(todo===null?moment().format("YYYY-MM-DD"):moment(todo.due_date).tz("UTC").format("YYYY-MM-DD"))
    const [todoCategory, setTodoCategory] = useState(todo===null?"personal":todo.category)

    const categories = [
        "work",
        "personal"
    ]

    const handleNameChange = (e) => {
        setTodoName(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setTodoDescription(e.target.value)
    }

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setTodoCategory(e.target.value)
    }

    const closeTodoForm = () => {
        setFormOpen(false)
    }

    const submitForm = () => {
        let status = 500
        fetch(url, {
            method: httpMethod,
            body: JSON.stringify({
                name: todoName,
                description: todoDescription,
                dueDate: selectedDate,
                category: todoCategory
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => {
                status = res.status
                if (status < 500)
                    return res.json()

                throw Error("Server error")
            })
            .then(res => {

                if (status === 400)
                    throw Error(res.msg)

                alert(res.success)
                setTodoList((prevState) => {
                    let newTodoList = prevState.filter(e=>e.id !== res.todo.id)
                    newTodoList.push(res.todo)
                    return newTodoList
                })
                setFormOpen(false)
            })
            .catch(err => alert(err))
    }

    return (
        <Grid container item xs={12} alignItems="center" direction="column" spacing={3}>
            <Grid item container xs={8} >
                <TextField fullWidth={true} label="Task" value={todoName} onChange={handleNameChange} />
            </Grid>
            <Grid item container xs={8}>
                <TextField fullWidth={true} label="Note" value={todoDescription} onChange={handleDescriptionChange} />
            </Grid>

            <Grid item container xs={8} justify="space-between">

                <Grid item xs={5}>
                    <TextField
                        label="Due date"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth={true}
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControl>
                        <InputLabel shrink>Category</InputLabel>
                        <Select
                            value={todoCategory}
                            onChange={handleCategoryChange}
                        >
                            {
                                categories.map((e,idx) => {
                                    return <MenuItem value={e} key={idx}>{e}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid item container xs={12} justify="space-evenly">
                <Button onClick={submitForm}>{httpMethod==="POST"?"Add":"Save"}</Button>
                <Button onClick={closeTodoForm}>Close</Button>
            </Grid>
        </Grid>
    )
}

export default TodoForm;