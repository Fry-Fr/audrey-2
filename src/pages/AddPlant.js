import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import styled from 'styled-components';
import {
    Input,
    Button,
    Heading,
} from '../styles/StyledComponents'

import addPlantSchema from '../validation/addPlantSchema';

const initialPlantValues = {
    nickname: '',
    species: '',
    h2o_frequency: '',
}

const initialFormErrors = {
    nickname: '',
    species: '',
    h2o_frequency: '',
}

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

export default function UserProfile(props) {
    const { addPlant } = props;
    const [addPlantFormValues, setaddPlantFormValues] = useState(initialPlantValues);
    const [disabled, setDisabled] = useState(true)
    const [formErrors, setFormErrors] = useState(initialFormErrors) // object

    const { push } = useHistory();

    const onChange = e => {

        let name = e.target.name;

        // Validation
        yup.reach(addPlantSchema, name)
            .validate(e.target.value)
            .then(() => {
                setFormErrors({ ...formErrors, [name]: "" })
            })
            .catch(err => {
                setFormErrors({ ...formErrors, [name]: err.message })
            })


        setaddPlantFormValues({
            ...addPlantFormValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const uid = localStorage.getItem('uid');
        const body = {
            h20_frequency: addPlantFormValues.h2o_frequency,
            nickname: addPlantFormValues.nickname,
            species: addPlantFormValues.species,
        }
        addPlant(uid, body);
        push("/home");
    }


    useEffect(() => {
        // ADJUST THE STATUS OF `disabled` EVERY TIME values CHANGE
        addPlantSchema.isValid(addPlantFormValues)
            .then(valid => {
                setDisabled(!valid)
            })
    }, [addPlantFormValues])


    return (<div>
        <section>
            <Heading>Add a Plant</Heading>
            <FormSection>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            <Input
                                value={addPlantFormValues.nickname}
                                onChange={onChange}
                                name='nickname'
                                type='text'
                                placeholder="Nick Name"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <Input
                                value={addPlantFormValues.species}
                                onChange={onChange}
                                name='species'
                                type='text'
                                placeholder="Species"
                            />
                        </label>
                    </div>
                    <div>

                        <label>
                            <Input
                                value={addPlantFormValues.h2o_frequency}
                                onChange={onChange}
                                name='h2o_frequency'
                                type='text'
                                placeholder="Water How Often?"
                            />
                        </label>
                        {/*<label>*/}
                        {/*    <Input*/}
                        {/*        value={addPlantFormValues.h2oFrequency}*/}
                        {/*        onChange={onChange}*/}
                        {/*        name='h2oFrequency'*/}
                        {/*        type='text'*/}
                        {/*        placeholder="Water How Often?"*/}
                        {/*    />*/}
                        {/*</label>*/}
                    </div>
                    <Button type="submit" disabled={disabled}>Add Plant</Button>

                </form>
            </FormSection>
        </section>
    </div>)
}
