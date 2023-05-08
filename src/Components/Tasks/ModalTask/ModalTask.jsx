/* eslint-disable no-unused-vars */
import React from "react";
import styles from './modalTask.module.css'
function ModalTask({closeHandle, deleteTask, id, tasks}) {
  return (
    <div>
      <div className={styles.modal}>
        <h3>Delete Task</h3>
        <p>Are you sure you want to delete this task?</p>
        <span>
          This is a permenant deletion, you won&apos;t be able to undo it
        </span>
        <div className={styles.modalBtns}>
          <button
            type="button"
            data-bs-dismiss="modal"
            onClick={()=>closeHandle()}
          >
            Cancel
          </button>
          <button type="button" id="delBtn" 
          onClick={() => {
            deleteTask(id, tasks);
            closeHandle();
          }} 
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalTask;
