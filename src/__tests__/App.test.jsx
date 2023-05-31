/* eslint-disable no-unused-vars */
import * as React from 'react';
import { describe, test, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Header from '../Components/Header/Header.jsx';
import App from "../App.jsx"
import { createRenderer } from 'react-dom';
import Tasks from '../Components/Tasks/Tasks.jsx';

describe("todolist", ()=>{
    test("todolist working properly", ()=>{
        const component = render.createRenderer(<Tasks />)
        const tree  = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})
describe('Header Component', () => {
    test("search", ()=>{
        render(<Header />)
        const searchInpt = screen.getByPlaceholderText(/search/i)
        expect(searchInpt).toBeInTheDocument()
    })
    test("logo img", ()=>{
        render(<Header />)
        const img = screen.getByRole('img')
        expect(img).toBeInTheDocument()
    })
    test("toggler Theme", async()=>{
        render(<Header />)
        const themeToggler = screen.getByPlaceholderText("themeToggler");
        const dashboardBackground = screen.getByTestId("dashboard-menu");
        expect(themeToggler).toBeInTheDocument();
        // expect(dashboardBackground).toBeInTheDocument();
        expect(themeToggler.value).toBe('light')
        // expect(dashboardBackground).toHaveStyle(
        //     "background-color: rgba(255,255,255,1)"
        // );
        // await fireEvent.change(themeToggler);
        // expect(dashboardBackground).toHaveStyle("background-color: rgba(0,0,0,0)");
    })
});



