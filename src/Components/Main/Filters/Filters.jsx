/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from './filters.module.css'
function Filters({tasks, filteringTasks}) {
  const [doneTasks, setDoneTaks] = useState([])
  const [pendingTasks, setPendingTasks] = useState([])
  const [flagDone, setFlagDone] = useState(false)
  const [flagPending, setFlagPending] = useState(false)
  // const [tasks, setAllTasks] = useState([])

  
  // useEffect(()=>{

  // }, [])
  useEffect(()=>{
    filtering(tasks)
  }, [tasks])

  function handleDoneClick(){
    setFlagDone(!flagDone)
    setFlagPending(false)
    if(!flagDone) return filteringTasks({status:"done" ,tasks:doneTasks});
    return filteringTasks({status:"all" ,tasks:tasks});
  }
  function handlePendingClick(){
    filtering(tasks)
    setFlagPending(!flagPending)
    setFlagDone(false)
    if(!flagPending) return filteringTasks({status:"pending" ,tasks:pendingTasks})
    return filteringTasks({status:"all" ,tasks});
  }
  function filtering(tasks){
    if(!tasks.length){
      return [];
    }
    let _doneTasks = tasks.filter((item)=>{
      return item.doingState
    })
    setDoneTaks(_doneTasks)
    let _pendingTasks = tasks.filter((item)=>{
      return !item.doingState
    })
    setPendingTasks(_pendingTasks)
  }
  return (
    <div className={styles.filters}>
      <span className={flagDone? styles.active :""} onClick={()=> handleDoneClick() }>
        Done (<span>{doneTasks.length}</span>)
      </span>
      <span className={flagPending? styles.active:""} onClick={()=> handlePendingClick() }>
        Pending (<span>{pendingTasks.length}</span>)
      </span>
    </div>
  );
}

export default Filters;
