import { useState, useEffect } from "react";
import { useUpdateTaskMutation, useDeleteTaskMutation } from "./tasksApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { EditTaskContainer } from "../../config/theme/styles";
import {
  TextField,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const EditTaskForm = ({ task, users }) => {
  const { t } = useTranslation();
  const { isAdmin, isParent } = useAuth();
  const [updateTask, { isLoading, isSuccess, error }] = useUpdateTaskMutation();

  const [deleteTask, { isSuccess: isDelSuccess, error: delerror }] =
    useDeleteTaskMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(task?.title);
  const [text, setText] = useState(task?.text);
  const [completed, setCompleted] = useState(task?.completed);
  const [userId, setUserId] = useState(task?.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/tasks");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveTaskClicked = async (e) => {
    if (canSave) {
      await updateTask({ id: task.id, user: userId, title, text, completed });
    }
  };

  const onDeleteTaskClicked = async () => {
    await deleteTask({ id: task?.id });
  };

  let deleteButton = null;
  if (isAdmin || isParent) {
    deleteButton = (
      <button title="Delete" onClick={onDeleteTaskClicked}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  const created = new Date(task?.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(task?.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = users.map((user) => {
    return (
      <MenuItem key={user.id} value={user.id}>
        {" "}
        {user.username}
      </MenuItem>
    );
  });

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <EditTaskContainer>
      <p>{errContent}</p>

      <FormControl onSubmit={(e) => e.preventDefault()}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h2>
            {t("editTask")} #{task?.ticket}
          </h2>
          <div>
            <button
              title="Save"
              onClick={onSaveTaskClicked}
              disabled={!canSave}
              style={
                !canSave
                  ? { opacity: "0.4", marginRight: "15px" }
                  : { marginRight: "15px" }
              }
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {deleteButton}
          </div>
        </div>
        <label htmlFor="task-title">{t("title")}:</label>
        <span>
          <TextField
            id="task-title"
            name="title"
            type="text"
            autoComplete="off"
            value={title}
            onChange={onTitleChanged}
            fullWidth
          />
        </span>

        <label htmlFor="task-text">{t("text")}:</label>
        <span>
          <TextField
            id="task-text"
            name="text"
            multiline
            maxRows={4}
            value={text}
            onChange={onTextChanged}
            fullWidth
          />
        </span>
        <div>
          <div>
            <label htmlFor="task-completed">
              {t("workComplete")}:
              <span>
                <Checkbox
                  id="task-completed"
                  name="completed"
                  type="checkbox"
                  checked={completed}
                  onChange={onCompletedChanged}
                />
              </span>
            </label>

            <label htmlFor="task-username">{t("assignedTo")}:</label>
            <span>
              <Select
                id="task-username"
                name="username"
                value={userId}
                onChange={onUserIdChanged}
              >
                {options}
              </Select>
            </span>
          </div>
          <div>
            <span>
              <p>
                {t("created")}:
                <br />
                {created}
              </p>
            </span>
            <span>
              <p>
                {t("updated")}:
                <br />
                {updated}
              </p>
            </span>
          </div>
        </div>
      </FormControl>
    </EditTaskContainer>
  );

  return content;
};

export default EditTaskForm;
