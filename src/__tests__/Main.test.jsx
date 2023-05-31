/* eslint-disable no-unused-vars */
import * as React from 'react';
import { describe, test, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Main from '../Components/Main/Main.jsx';
import Filters from '../Components/Main/Filters/Filters.jsx';



describe("Main Component/ AddModal Component", ()=>{
  test("no. of tasks", ()=>{
    const { getByText } = render(<Main />);
    expect(getByText(/today/i)).toBeInTheDocument();
  })
  test("button of add modal is found", ()=>{
    const { getByText } = render(<Main />);
    expect(getByText(/New Task/i)).toBeInTheDocument();
  })
  test("Clicking button of add modal", ()=>{
    const { getByText } = render(<Main />);
    const addModal = getByText(/New Task/i)
    fireEvent.click(addModal)
    const sectionAddModal= document.getElementById("sectionAddModal")
    expect(sectionAddModal).toBeInTheDocument()
  })
  test("cancel button", ()=>{
    render(<Main/>);
    const addModal = screen.getByText(/New Task/i)
    fireEvent.click(addModal)
    const cancelBtn = document.getElementById("cancel");
    const sectionAddModal= document.getElementById("sectionAddModal")
    fireEvent.click(cancelBtn);
    expect(sectionAddModal).not.toBeInTheDocument()
  })
  test("add task button", async()=>{
    render(<Main/>);
    const addModal = screen.getByText(/New Task/i)
    fireEvent.click(addModal)
    const addTask = document.getElementById("taskInpt");
    const addAssignee = document.getElementById("AssigneeInpt")
    const addSubmit = document.getElementById("submit");
    const sectionAddModal= document.getElementById("sectionAddModal")
    addTask.value = 'My new todo';
    expect(addTask.value).toBe(`${addTask.value}`)
    addAssignee.value = 'ayah';
    expect(addAssignee.value).toBe(`${addAssignee.value}`)
    fireEvent.click(addSubmit);
    await waitFor(()=> expect(sectionAddModal).not.toBeInTheDocument())
  })
})

describe("Filters Component", ()=>{
  test("filter done button", ()=>{
      render(<Filters />)
      expect(screen.getByText(/done/i)).toBeInTheDocument()
  })
  test("filter pending button", ()=>{
      render(<Filters />)
      expect(screen.getByText(/Pending/i)).toBeInTheDocument()
  })
})





