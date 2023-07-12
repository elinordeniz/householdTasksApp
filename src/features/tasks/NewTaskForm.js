import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewTaskMutation } from "./tasksApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { AddUserContainer,ErrorHeader } from "../../config/theme/styles";
import {
  TextField,

  FormControl,
  Select,
  MenuItem,

} from "@mui/material";
import { useTranslation } from "react-i18next";

const NewTaskForm = ({ users }) => {
    const {t}=useTranslation();
    const [addNewTask, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewTaskMutation()

    const navigate = useNavigate()
    const errRef= useRef()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0]?.id)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/tasks')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveTaskClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewTask({ user: userId, title, text })
        }
    }

    const options = users?.map(user => {
        return (
            <MenuItem
                key={user.id}
                value={user.id}
            > {user.username}</MenuItem >
        )
    })



    const content = (
        <AddUserContainer>
    
            {error && (
          <ErrorHeader ref={errRef} aria-live="assertive">
            {error?.data?.message || error}
          </ErrorHeader>
        )}

            <FormControl 
             sx={{width:"300px", gap: 2 }}
          >
                <div style={{display:"flex", flexDirection:'row', justifyContent:'space-between'}}>
                    <h2>{t('newTask')}</h2>
                    <div >
                        <button
                            title="Save"
                            disabled={!canSave}
                            onClick={onSaveTaskClicked}
              style={ !canSave ? {opacity:"0.4"} : null}

                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label  htmlFor="title">
                    {t('title')}:</label>
                <TextField
                    
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label  htmlFor="text">
                {t('text')}:</label>
                <TextField
                   
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <label  htmlFor="username">
                {t('assignedTo')}:</label>
                <Select
                    id="username"
                    name="username"
                   
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </Select>

            </FormControl>
        </AddUserContainer>
    )

    return content
}

export default NewTaskForm