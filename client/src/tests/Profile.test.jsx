import React from 'react';
import { render,screen } from '@testing-library/react';
import Profile from "../components/Profile";
import {useAuth0} from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import useProfile from "../hooks/useProfile.js"
import useOrder from "../hooks/useOrder.js"
import { useNavigate } from "react-router-dom"
import '@testing-library/jest-dom'


jest.mock("@auth0/auth0-react");
jest.mock("react-router-dom",()=>({useNavigate:jest.fn(),}));
jest.mock("../AuthTokenContext");
jest.mock("../hooks/useOrder.js");
jest.mock("../hooks/useProfile.js");

describe('Profile Component Tests',()=>{

    const mockNavigate = jest.fn()

    const mockUser={
        name : "Joe",
        email : "Joe@gmail.com",
        picture : "http://example.com/picture.jpg",
        email_verified : true,
    }

    const mockProfile={
        id     : 1,
        email  :"Joe@gmail.com",
        auth0Id :"auth0|123456",
        name  : "Joe",
        order  : []
    }

    const mockOrder={
            id: 1,
            createdAt: "20240404",
            comment:"",
            total: 12.34,
            userId:1
    }

    beforeEach(()=>{
        useAuthToken.mockReturnValue({accessToken:"fakeToken"});
        useAuth0.mockReturnValue({
            user : mockUser,
        });
        useProfile.mockReturnValue([mockProfile, jest.fn()]);
        useOrder.mockReturnValue([[mockOrder]]);
        useNavigate.mockReturnValue(mockNavigate);
    })

    test('display profile',()=>{
        render(<Profile />);
        expect(screen.getByText("Joe")).toBeInTheDocument();
    });

    test('display edit name button',()=>{
        render(<Profile />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('display order history',()=>{
        render(<Profile />);
        expect(screen.getByText('Order History')).toBeInTheDocument();
    });

    test('display back to homepage',()=>{
        render(<Profile />);
        expect(screen.getByText('Back to homepage')).toBeInTheDocument();
    });

});
