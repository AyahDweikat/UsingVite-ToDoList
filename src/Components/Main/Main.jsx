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

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) setAllTasks(todos);
  }, []);

  setTimeout(()=>{
    localStorage.setItem('todos', JSON.stringify(allTasks));
  }, 1000)

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
    setAllTasks((allTasks) => [...allTasks, task]);
  }

  function changeState(id) {
    let _tasks = allTasks.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          isDone: !item.isDone,
        };
      } else {
        return item;
      }
    });
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
  }
  function deleteTask(id, allTasks) {
    let _tasks = allTasks.filter((item) => {
      return item.id !== id;
    });
    setAllTasks(_tasks);
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
