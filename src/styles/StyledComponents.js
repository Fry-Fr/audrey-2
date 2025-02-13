// import { Form, Field } from "formik";
import styled from "styled-components";

export const EditContainer = styled.div`
 display: flex;
  flex-direction: column;
  text-align: center;
  width: 70%;
  padding: 1rem 0;
  margin: 1rem auto;
  background-color: #C1FFA6;
  color: #000;
  border: 1px solid grey;
  border-radius: 2rem;
  -webkit-box-shadow:0 .5rem .5rem grey;
  -moz-box-shadow:0 .5rem .5rem grey;
  box-shadow:0 1rem 1rem grey;
  button {
    border: .2rem groove #d4d4aa;
    border-radius: .2rem;
    background-color: #d4d4aa;
    font-size: 1rem;
    margin-top: .3rem;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
  }
  @media(max-width:800px) {
    width: 80%;
  }
  @media(max-width:600px) {
    width: 100%;
    padding: .2rem;
  }
`;

export const FormDiv = styled('form')`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 2rem 0;
  margin: 2rem auto;
  background-color: #C1FFA6;
  color: #000;
  border: 1px solid grey;
  border-radius: 2rem;
  -webkit-box-shadow:0 .5rem .5rem grey;
  -moz-box-shadow:0 .5rem .5rem grey;
  box-shadow:0 1rem 1rem grey;
`;

export const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 300;
  text-align: center;
  padding-top: 4rem;
`;

export const Header = styled.h1`
  font-size: 3rem;
  font-weight: 300;
  text-align: center;
  padding-top: 4rem;
`;

export const Input = styled('input')`
  margin: 1rem auto;
  width: 70%;
  height: 1.5rem;
  border: none;
  padding: 1.25rem;
  font-size: 1.25rem;
  background-color: #B0B0B0;
  color: #fff;
  &::placeholder {
    color: #fff;
  }
`;

export const Button = styled.button`
  height: 2.5rem;
  margin: 0.5rem auto;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
  text-decoration: none;
  border: none;
  background-color: #fff;
  transition: all 0.3s ease-in;
  &.user-update {
    background-color: #d4d4aa;
    border: .2rem groove #d4d4aa;
  }
  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

export const Error = styled.p`
  width: 70%;
  height: 1.5rem;
  font-size: 0.75rem;
  text-align: center;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 5px 10px;
  margin: -8px auto -1rem;
  z-index: 3;
`;

export const FormSection = styled.div`
 display: flex;
  flex-direction: column;
  text-align: center;
  width: 70%;
  padding: 1rem 0;
  margin: 1rem auto;
  background-color: #C1FFA6;
  color: #000;
  border: 1px solid grey;
  border-radius: 2rem;
  -webkit-box-shadow:0 .5rem .5rem grey;
  -moz-box-shadow:0 .5rem .5rem grey;
  box-shadow:0 1rem 1rem grey;
  &.edit-forms {
    @media(max-width:600px) {
      width: 90%;
    }
  }
`;