import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import userProfileSchema from '../validation/userProfileSchema';
import styled from 'styled-components';
import '../App.css';
import {
    Input,
    Button,
    Heading,
} from '../styles/StyledComponents'

const initialUserProfileFormValues = {
    username: '',
    password: '',
    password2: '',
}

const initialFormValues = {
    username: '',
}

const initialFormErrors = {
    username: '',
    password: '',
    errMessage: '',
}

const CurrentProfile = styled.div`
 display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70%;
  padding: .5rem 0;
  margin: 1rem auto;
  background-color: #C1FFA6;
  color: #000;
  border: 1px solid grey;
  border-radius: 2rem;
  -webkit-box-shadow:0 .5rem .5rem grey;
  -moz-box-shadow:0 .5rem .5rem grey;
  box-shadow:0 1rem 1rem grey;
`;

const FormSection = styled.div`
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
`;

const ErrorDiv = styled.div`
    color: red;
`;

const ProfileHeading = styled(Heading)`
  padding-top: 1rem;
`;


// pull in errors or create them here
export default function UserProfile(props) {
    const { user, updateUser, errs } = props;
    const updatedUserProfileObject = initialFormValues;
    const [UserProfileFormValues, setUserProfileFormValues] = useState(initialUserProfileFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(true);
    
    updatedUserProfileObject.username = user.username;
    formErrors.errMessage = errs;

    const onChange = e => {
        let name = e.target.name;

        // Validation
        yup.reach(userProfileSchema, name)
            .validate(e.target.value)
            .then(() => {
                setFormErrors({ ...formErrors, [name]: "" })
            })
            .catch(err => {
                setFormErrors({ ...formErrors, [name]: err.message })
            })

        setUserProfileFormValues({
            ...UserProfileFormValues,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = e => {
        e.preventDefault();
        updateUser(user.user_id, UserProfileFormValues);
        setUserProfileFormValues(initialUserProfileFormValues);
    }

    useEffect(() => {
        // ADJUST THE STATUS OF `disabled` EVERY TIME values CHANGE
        userProfileSchema.isValid(UserProfileFormValues)
            .then(valid => {
                setDisabled(!valid)
            })
    }, [UserProfileFormValues])

    return (<div>
        <ProfileHeading>Your Profile</ProfileHeading>
        <CurrentProfile >
            <p>Username: {updatedUserProfileObject.username}</p>
        </CurrentProfile>
        <section>
            <ProfileHeading>Update Your Profile</ProfileHeading>
            <FormSection>
                <form onSubmit={handleSubmit}>
                    <ErrorDiv>{formErrors.errMessage}</ErrorDiv>
                    <div>
                        <label>
                            <Input
                                value={UserProfileFormValues.username}
                                onChange={onChange}
                                name='username'
                                type='text'
                                placeholder="New Username"
                            />
                        </label>
                    </div>
                    <ErrorDiv>{formErrors.username}</ErrorDiv>
                    <div>
                        <label>
                            <Input
                                value={UserProfileFormValues.password}
                                onChange={onChange}
                                name='password'
                                type='password'
                                placeholder="Current Password"
                            />
                        </label>
                    </div>
                    <ErrorDiv>{formErrors.password}</ErrorDiv>
                         <div>
                            <label>
                                <Input
                                    value={UserProfileFormValues.password2}
                                    onChange={onChange}
                                    name='password2'
                                    type='password'
                                    placeholder="New Password"
                                />
                            </label>
                        </div>
                        <ErrorDiv>{formErrors.password2}</ErrorDiv>
                    <Button className="user-update" type="submit" disabled={disabled}>Update</Button>
                </form>
            </FormSection>
        </section>
    </div>)
}