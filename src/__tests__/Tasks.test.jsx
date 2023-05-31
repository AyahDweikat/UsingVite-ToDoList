/* eslint-disable no-unused-vars */
import * as React from 'react';
import { describe, test, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Tasks from '../Components/Tasks/Tasks.jsx';



describe("Task Component")
describe("task", ()=>{
    test("task title", ()=>{
      render(<Tasks/>)
      const btnState = document.getElementById("btnState")
      expect(btnState).toBeInTheDocument();
    })
  })
