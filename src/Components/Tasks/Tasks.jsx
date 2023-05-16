/* eslint-disable no-unused-vars */
import React from "react";
import ModalTask from "./ModalTask/ModalTask";
import { useState } from "react";
import styles from "./tasks.module.css";
import Modal from "react-overlays/Modal";

function Tasks({ tasks, changeState, deleteTask, editTask }) {
  const [showModal, setShowModal] = useState(false);
  const [flagEditing, setFlagEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [idToDelete, setIdToDelete] = useState("");

  const renderBackdrop = (props) => <div className="backdrop" {...props} />;
  var handleClose = () => {
    setShowModal(false);
  };
  function turnToEdit(idx) {
    setFlagEditing(true);
    setIdEdit(idx);
  }
  function turnToTask() {
    setFlagEditing(false);
  }
  function submitInput(id) {
    editTask(id, inputValue);
    setInputValue("");
    turnToTask();
  }
  return (
    <section className={styles.tasks}>
      <ul id="taskDisplay" className={styles.taskList}>
        {tasks.map((item) => {
          return (
            <li
              key={item.id}
              className={item.isDone ? styles.doneTask : styles.undoneTask}
            >
              <div>
                <button
                  className={styles.btnDoneState}
                  onClick={() => changeState(item.id)}
                >
                  <i
                    className={
                      item.isDone
                        ? `fa-solid fa-circle-check ${styles.doneBtn}`
                        : `fa-regular fa-circle ${styles.undoneBtn}`
                    }
                    style={{ color: "#14bba6" }}
                  ></i>
                </button>
              </div>
              <div>
                {flagEditing && idEdit == item.id && !item.isDone ? (
                  <input
                    autoFocus
                    key={item.id}
                    className={styles.editInpt}
                    onBlur={() => submitInput(item.id)}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    value={inputValue}
                  />
                ) : (
                  <p
                    key={item.id}
                    onDoubleClick={() => {
                      setInputValue(item.task);
                      turnToEdit(item.id);
                    }}
                  >
                    {item.task}
                  </p>
                )}
                <span>{item.assignee}</span>
              </div>
              <div className={styles.delEditBtn}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => {
                    setShowModal(true);
                    setIdToDelete(item.id);
                  }}
                >
                  <i
                    className="fa-solid fa-trash"
                    style={{ color: "#FF0000" }}
                  ></i>
                </button>
                <button
                  className={styles.btnEdit}
                  onClick={() => {
                    setInputValue(item.task);
                    turnToEdit(item.id);
                  }}
                  disabled={item.isDone}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <Modal
        className={styles.modal}
        show={showModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
        body={idToDelete}
      >
        <ModalTask
          handleClose={handleClose}
          deleteTask={deleteTask}
          tasks={tasks}
          id={idToDelete}
        />
      </Modal>
    </section>
  );
}

export default Tasks;
