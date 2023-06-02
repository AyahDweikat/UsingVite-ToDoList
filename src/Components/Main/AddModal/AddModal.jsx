/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./addModal.module.css";
import { useState } from "react";
import { Modal } from "react-overlays";

function* generateID() {
  while (true) {
    yield Math.random().toString(36).slice(2);
  }
}
function getID() {
  return generateID().next().value;
}

function AddModal({ isModalOpen, setIsModalOpen, addTask }) {
  const [task, setTask] = useState("");
  const [assignee, setAssignee] = useState("");

  function submitHandle(e) {
    e.preventDefault();
    addTask({ id: getID(), task, assignee, isDone: false });
    resetHandle();
    setIsModalOpen(false);
  }
  function resetHandle() {
    setTask("");
    setAssignee("");
  }
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  return (
    <div id="addModal">
      <Modal
        className={styles.modal}
        show={isModalOpen}
        renderBackdrop={renderBackdrop}
      >
        <section>
          <div id='sectionAddModal' className={styles.modal}>
            <h3>Add a New Task</h3>
            <form onSubmit={(e) => submitHandle(e)}>
              <div className={styles.formControl}>
                <label htmlFor="task">Task</label>
                <input
                autoFocus
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="task"
                  id="task"
                  placeholder="Task"
                />
              </div>
              <div className={styles.formControl}>
                <label htmlFor="assignee">Assignee</label>
                <input
                  type="text"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="assignee"
                  id="assignee"
                  placeholder="Assignee"
                />
              </div>
              <div className={styles.modalBtns}>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  id="cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button name="Add" id="submit" type="submit">Create Task</button>
              </div>
            </form>
          </div>
        </section>
      </Modal>
    </div>
  );
}

export default AddModal;
