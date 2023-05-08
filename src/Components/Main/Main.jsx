/* eslint-disable no-unused-vars */
import React from "react";
import Filters from "./Filters/Filters";
import { useState } from "react";
import Modal from "react-overlays/Modal";
import Tasks from "../Tasks/Tasks";
import { useEffect } from "react";
import styles from './main.module.css'



function* generateID() {
  while (true) {
    yield Math.random().toString(36).slice(2);
  }
}

function Main({ searchValue }) {
  let genID = generateID();
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState("");
  const [assignee, setAssignee] = useState("");
  const [doingState, setDoingState] = useState(false)
  const [allTasks, setAllTasks] = useState([])
  const [doneTasks, setDoneTasks] = useState([])
  const [pendingTasks, setPendingTasks] = useState([])
  const [searchedTasks, setSearchedTasks] = useState([])
  const [filteringFlag, setFilteringFlag] = useState(0)

  function displayResults(allTasks){
    if (searchValue === "" && filteringFlag == 0){
      return allTasks;
    } else if(searchValue === "" && filteringFlag) {
      if(filteringFlag== 1) return doneTasks;
      if(filteringFlag=== 2) return pendingTasks;
    } else if (searchValue && filteringFlag == 0){
      return searchedTasks;//done
    } else {
      if(filteringFlag==1){
        setSearchedTasks(getSearchResults(searchValue, doneTasks))
        return getSearchResults(searchValue, doneTasks);
      }
      if(filteringFlag==2) {
        setSearchedTasks(getSearchResults(searchValue, pendingTasks))
        return getSearchResults(searchValue, pendingTasks);
      }
    }
  }
  function filtering(tasks){
    if(!tasks.length){
      return [];
    }
    let _doneTasks = tasks.filter((item)=>{
      return item.doingState
    })
    setDoneTasks(_doneTasks)
    let _pendingTasks = tasks.filter((item)=>{
      return !item.doingState
    })
    setPendingTasks(_pendingTasks)
  }
  function filteringTasks(obj){
    if(obj.status =="done"){
      setFilteringFlag(1)
    }
    else if(obj.status =="pending"){
      setFilteringFlag(2)
    } else {
      setFilteringFlag(0)
    }
  }


  useEffect(() => {
    // setSearchedTasks(getSearchResults(searchValue, allTasks))
    // console.log("all")
  console.log(allTasks)

    filtering(allTasks);
  }, [allTasks, searchValue])

  function getSearchResults(searchValue, allTasks){
    if(searchValue === ""){
      return allTasks;
    } else {
      return allTasks.filter(task => task.task.toLowerCase().includes(searchValue.toLowerCase()) || task.assignee.toLowerCase().includes(searchValue.toLowerCase()) )
    }
  }
  function changeState(id){
    let _tasks = allTasks.map((item)=>{
      if(item.id == id){
        return {
          ...item,
          doingState: !item.doingState
        }
      }
      else {
        return item
      }
    })
    setAllTasks(_tasks);
  }
  function editTask(id, newTask){
    let _tasks = allTasks.map((item)=>{
      if(item.id == id){
        return {
          ...item,
          task: newTask,
        }
      }
      else {
        return item
      }
    })
    setAllTasks(_tasks);
    getSearchResults(searchValue, allTasks)
  }
  function submitHandle(e) {
    e.preventDefault();
    setAllTasks([...allTasks, {id:genID.next().value, task, assignee, doingState}]);
    resetHandle();
    closeHandle();
  }
  function resetHandle() {
    setTask("");
    setAssignee("");
  }
  function deleteTask(id, allTasks){
    console.log(id)//error
    let _tasks = allTasks.filter((item)=>{
      return item.id!== id
    })
    setAllTasks(_tasks);
    closeHandle()
  }
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;
  var closeHandle =() =>{
    resetHandle()
    setShowModal(false)
  }
  return (
    <div className={styles.mainSection}>
      <section className={styles.heroSection}>
        <div className={styles.heading}>
          <h2>
            You Got <span className={styles.taskNum}>{allTasks.length} Tasks </span>
            today
          </h2>
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            <span className={styles.plusSign}>
              <i className="fa-solid fa-plus" />
            </span>{" "}
            New Task
          </button>
        </div>
        <Filters tasks={allTasks} 
        filteringTasks={filteringTasks} 
        />
      </section>
      <Modal
        className={styles.modal}
        show={showModal}
        onHide={closeHandle}
        renderBackdrop={renderBackdrop}
      >
        <section>
          <div className={styles.modal}>
            <h3>Add a New Task</h3>
            <form onSubmit={(e) => submitHandle(e)}>
              <div className={styles.formControl}>
                <label htmlFor="task">Task</label>
                <input
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
                  onClick={closeHandle}
                >
                  Cancel
                </button>
                <button type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </section>
      </Modal>
      <Tasks tasks={displayResults(allTasks)} changeState={changeState} deleteTask={deleteTask} editTask={editTask} />
    </div>
  );
}

export default Main;
