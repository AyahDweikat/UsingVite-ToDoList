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

function AddModal({ showModal, setShowModal, addTask }) {
  const [task, setTask] = useState("");
  const [assignee, setAssignee] = useState("");

  function submitHandle(e) {
    e.preventDefault();
    addTask({ id: getID(), task, assignee, isDone: false });
    resetHandle();
    setShowModal(false);
  }
  function resetHandle() {
    setTask("");
    setAssignee("");
  }
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

  return (
    <div>
      <Modal
        className={styles.modal}
        show={showModal}
        renderBackdrop={renderBackdrop}
      >
        <section>
          <div className={styles.modal}>
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
                  placeholder="Assignee"
                />
              </div>
              <div className={styles.modalBtns}>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </section>
      </Modal>
    </div>
  );
}

export default AddModal;
