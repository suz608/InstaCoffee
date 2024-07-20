import React from 'react';
import {render,screen,fireEvent} from '@testing-library/react';
import Order from "../components/Order";
import {useAuth0} from "@auth0/auth0-react";
import useProducts from "../hooks/useProducts.js"
import { useAuthToken } from "../AuthTokenContext";
import { useNavigate } from "react-router-dom"
import '@testing-library/jest-dom'

jest.mock("@auth0/auth0-react");
jest.mock("react-router-dom");
jest.mock("../AuthTokenContext")
jest.mock("../hooks/useProducts.js");

describe('Menu Component Tests',()=>{

    const mockNavigate = jest.fn();

    const mockUser={
        name : "Joe",
        email : "Joe@gmail.com",
        picture : "http://example.com/picture.jpg",
        sub : "auth0|123456",
        email_verified : true,
    }

    const mockProduct = {
        id:1,
        name   : "strawberry smoothie",
        category   :"Cold Beverages",
        price :   5.8,
        detail:   "Fresh and chilling"
    }

    const mockProduct2 = {
        id:2,
        name   : "strawberry latte",
        category   :"Hot Beverages",
        price :   5.8,
        detail:   "Fresh and chilling"
    }

    beforeEach(()=>{
        useAuthToken.mockReturnValue({accessToken:"fakeToken"});
        useAuth0.mockReturnValue({
            user : mockUser,
        });
        useProducts.mockReturnValue([[mockProduct,mockProduct2]]);
        useNavigate.mockReturnValue(mockNavigate);
    })

    test('Showing items',()=>{
        render(<Order />);
        expect(screen.getByText("Cold Beverages")).toBeInTheDocument();
    });

    test('Showing save button',()=>{
        render(<Order />);
        expect(screen.getByText("Save comment")).toBeInTheDocument();
    });

    test('Showing check out button',()=>{
        render(<Order />);
        expect(screen.getByText("Check out")).toBeInTheDocument();
    });

    test('display back to homepage button',()=>{
        render(<Order />);
        expect(screen.getByText('Back to homepage')).toBeInTheDocument();
    });
    
});
