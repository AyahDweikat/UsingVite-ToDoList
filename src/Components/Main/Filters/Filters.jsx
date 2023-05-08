/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./filters.module.css";
function Filters({ tasks, ActiveFilter, setActiveFilter }) {
  const doneCount = tasks.filter(({ isDone }) => isDone).length;
  const pendingCount = tasks.length - doneCount;

  function handleDoneClick() {
    if (ActiveFilter == "done") setActiveFilter("all");
    else setActiveFilter("done");
  }
  function handlePendingClick() {
    if (ActiveFilter == "pending") setActiveFilter("all");
    else setActiveFilter("pending");
  }
  return (
    <div className={styles.filters}>
      <span
        className={ActiveFilter === "done" ? styles.active : ""}
        onClick={handleDoneClick}
      >
        Done (<span>{doneCount}</span>)
      </span>
      <span
        className={ActiveFilter === "pending" ? styles.active : ""}
        onClick={handlePendingClick}
      >
        Pending (<span>{pendingCount}</span>)
      </span>
    </div>
  );
}

export default Filters;
