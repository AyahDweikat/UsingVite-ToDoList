/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./filters.module.css";
function Filters({ tasks, activeFilter, setActiveFilter }) {
  const doneCount = tasks?.filter(({ isDone }) => isDone).length || 0;
  const pendingCount = (tasks?.length) - doneCount;

  function handleDoneClick() {
    if (activeFilter == "done") setActiveFilter("all");
    else setActiveFilter("done");
  }
  function handlePendingClick() {
    if (activeFilter == "pending") setActiveFilter("all");
    else setActiveFilter("pending");
  }
  return (
    <div className={styles.filters}>
      <span
        className={activeFilter === "done" ? styles.active : ""}
        onClick={handleDoneClick}
      >
        Done (<span>{doneCount}</span>)
      </span>
      <span
        className={activeFilter === "pending" ? styles.active : ""}
        onClick={handlePendingClick}
      >
        Pending (<span>{pendingCount}</span>)
      </span>
    </div>
  );
}

export default Filters;
