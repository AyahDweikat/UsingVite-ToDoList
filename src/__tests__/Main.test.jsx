/* eslint-disable no-unused-vars */
import * as React from 'react';
import { describe, test, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Main from '../Components/Main/Main.jsx';
import Filters from '../Components/Main/Filters/Filters.jsx';
import { beforeEach } from 'vitest'
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest'
import AddModal from '../Components/Main/AddModal/AddModal.jsx';



// const task={
//   task:"task1",
//   assignee:"ayah"
// }

// export const addTaskToApp = async(task)=>{
//   const addTask = document.getElementById("taskInpt");
//   const addAssignee = document.getElementById("AssigneeInpt")
//   fireEvent.change(addTask, {target: {value: task.task}})
//   fireEvent.change(addAssignee, {target: {value: task.assignee}})
//   const addSubmit = document.getElementById("submit");
//   fireEvent.click(addSubmit)
// }
describe("Main Component/ AddModal Component", ()=>{
  beforeEach(()=>{
    return render(<Main />);
  })
  test("no. of tasks", ()=>{
    expect(screen.getByText(/today/i)).toBeInTheDocument();
  })
  test("button of add modal is found", ()=>{
    const addModal = screen.getByRole("button", {name:/New Task/i})
    expect(addModal).toBeInTheDocument();
  })
  test("Clicking button of add modal", ()=>{
    const addModal = screen.getByRole("button", {name:/New Task/i})
    fireEvent.click(addModal)
    const sectionAddModal= document.getElementById("sectionAddModal")
    expect(sectionAddModal).toBeInTheDocument()
  })
  test("cancel button", ()=>{
    const addModal = screen.getByText(/New Task/i)
    fireEvent.click(addModal)
    const sectionAddModal= document.getElementById("sectionAddModal")
    expect(sectionAddModal).toBeInTheDocument()
    const cancelBtn = document.getElementById("cancel");
    expect(cancelBtn).toBeInTheDocument()
    fireEvent.click(cancelBtn);
    expect(sectionAddModal).not.toBeInTheDocument()
  })
  test("adding task test", async()=>{
    const addModal = screen.getByText(/New Task/i)
    fireEvent.click(addModal)
    const taskInput = screen.getByLabelText(/Task/);
    const assigneeInput = screen.getByLabelText(/Assignee/);
    fireEvent.change(taskInput, {target: {value: "hello"}})
    fireEvent.change(assigneeInput, {target: {value: "ayah"}})
    const addSubmit = screen.getByText(/Create Task/i);
    fireEvent.click(addSubmit)
    const taskInList = screen.getByText(/hello/);
    expect(taskInList).toBeInTheDocument();
  })
})

describe("Filters Component", ()=>{
  beforeEach(()=>{
    return render(<Filters />);
  })
  test("filter done button", ()=>{
      expect(screen.getByText(/done/i)).toBeInTheDocument()
  })
  test("filter pending button", ()=>{
      expect(screen.getByText(/Pending/i)).toBeInTheDocument()
  })
})





