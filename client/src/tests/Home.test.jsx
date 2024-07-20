import React from 'react';
import {render,screen,fireEvent} from '@testing-library/react';
import Home from "../components/Home";
import useProfile from "../hooks/useProfile.js"
import { useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import '@testing-library/jest-dom'

jest.mock("@auth0/auth0-react");
jest.mock("react-router-dom",()=>({useNavigate:jest.fn(),}));
jest.mock("../hooks/useProfile.js");
jest.mock("../AuthTokenContext")

describe('Home component tests',()=>{
    const mockLoginWithRedirect = jest.fn()
    const mockNavigate = jest.fn()
    const user = {name: "Joe"}

    const mockProfile={
        id     : 1,
        email  :"Joe@gmail.com",
        auth0Id :"auth0|123456",
        name  : "Joe",
        order  : []
    }

    beforeEach(()=>{
        useAuth0.mockReturnValue({
            isAuthenticated : false,
            loginWithRedirect : mockLoginWithRedirect,
            user: user,
        })
        useNavigate.mockReturnValue(mockNavigate);
        useProfile.mockReturnValue([mockProfile]);
    })

    test('render without crashing',()=>{
        render(<Home />);
        expect(screen.getByText("Home")).toBeInTheDocument();
    });

    test('Login/Create account button triggers loginWithDirect',()=>{
        render(<Home />);
        fireEvent.click(screen.getByText("Login/Create account"));
        expect(mockLoginWithRedirect).toHaveBeenCalled();
    });

    test('Showing profile name after login',()=>{
        useAuthToken.mockReturnValue({accessToken:"fakeToken"});
        useAuth0.mockReturnValue({
            isAuthenticated : true,
            loginWithRedirect : mockLoginWithRedirect,
        });
        render(<Home />);
        expect(screen.getByText("Welcome 👋 Joe")).toBeInTheDocument();
    });
    
});
