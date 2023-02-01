import React from 'react'
import styled from 'styled-components';
import { Label } from 'reactstrap';

// Styled Components 
const Title = styled.h1`
  font-size: 1.em;
  text-align: center;
  color: palevioletred;
  font-family: 'Pacifico', cursive;
`;


export default function Intro() {
    return (
        <header>
            <Title>To Do List</Title>
            <Label>What do you need to get done today?</Label>
        </header>
    )
}