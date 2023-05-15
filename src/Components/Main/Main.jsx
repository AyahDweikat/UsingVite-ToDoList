/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Filters from "./Filters/Filters";
import { useState } from "react";
import Tasks from "../Tasks/Tasks";
import styles from "./main.module.css";
import AddModal from "./AddModal/AddModal";

function Main({ searchValue }) {
  const [showModal, setShowModal] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [ActiveFilter, setActiveFilter] = useState("all");

  function fetchData(){
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('https://todolist-backend-app-nodb.onrender.com/getTasks', requestOptions)
    .then((response) => response.json())
       .then((data) => {
        if(data.status === 200) setAllTasks(data.todos);
       })
       .catch((err) => {
          console.log(err);
       });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const tasks = getSearchResults(searchValue, allTasks);
  function filterTasks(tasks, ActiveFilter) {
    if (!tasks.length) return [];
    else if (ActiveFilter == "all") return tasks;
    else if (ActiveFilter === "done")
      return tasks.filter(({ isDone }) => isDone);
    else if (ActiveFilter === "pending")
      return tasks.filter(({ isDone }) => !isDone);
  }

  function getSearchResults(searchValue, allTasks) {
    if (searchValue === "") {
      return filterTasks(allTasks, ActiveFilter);
    } else {
      return filterTasks(
        allTasks.filter(
          (task) =>
            task.task.toLowerCase().includes(searchValue.toLowerCase()) ||
            task.assignee.toLowerCase().includes(searchValue.toLowerCase())
        ),
        ActiveFilter
      );
    }
  }

  function addTask(task) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    };
    fetch('https://todolist-backend-app-nodb.onrender.com/addTasks', requestOptions)
    .then(response => response.json())
    .then(data =>data);
    setAllTasks([...allTasks, task])
  }
  function changeState(id) {
    let newState;
    let _tasks = allTasks.map((item) => {
      if (item.id == id) {
        newState= item.isDone;
        return {
          ...item,
          isDone: !item.isDone,
        };
      } else {
        return item;
      }
    });
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({isDone: id.isDone})
    };
    fetch(`https://todolist-backend-app-nodb.onrender.com/changedoneState/${id}`, requestOptions)
    .then(response => response.json())
    .then(data =>data);
    setAllTasks(_tasks);
  }
  function editTask(id, newTask) {
    let _tasks = allTasks.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          task: newTask,
        };
      } else {
        return item;
      }
    });
    setAllTasks(_tasks);
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({task: newTask})
    };
    fetch(`https://todolist-backend-app-nodb.onrender.com/editTask/${id}`, requestOptions)
    .then(response => response.json())
    .then(data =>data);
  }
  function deleteTask(id, allTasks) {
    let _tasks = allTasks.filter((item) => {
      return item.id !== id;
    });
    setAllTasks(_tasks);
    const requestOptions = {
      method: 'DELETE',
    };
    fetch(`https://todolist-backend-app-nodb.onrender.com/deleteTask/${id}`, requestOptions)
    .then(response => response.json())
    .then(data =>data);
    closeHandle();
  }


  var closeHandle = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.mainSection}>
      <section className={styles.heroSection}>
        <div className={styles.heading}>
          <h2>
            You Got{" "}
            <span className={styles.taskNum}>{allTasks.length} Tasks </span>
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
        <Filters
          tasks={allTasks}
          ActiveFilter={ActiveFilter}
          setActiveFilter={setActiveFilter}
        />
      </section>
      {showModal && (
        <AddModal
          showModal={showModal}
          setShowModal={setShowModal}
          addTask={addTask}
        />
      )}
      <Tasks
        tasks={tasks}
        changeState={changeState}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

export default Main;
