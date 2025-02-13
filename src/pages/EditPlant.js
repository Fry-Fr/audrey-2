import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { EditContainer, FormSection, Input, Heading} from '../styles/StyledComponents';

const EditPlant = (props) => {
    const { push } = useHistory();
    const { id: idParams } = useParams();
    const { plants, deletePlant, updatePlant } = props;
    const uid = localStorage.getItem('uid');
    const [edit, setEdit] = useState(idParams ? plants.filter(plant => plant.plant_id === Number(idParams)) : [...plants]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const id = parseInt(event.target.id);

        setEdit(
            edit.map((item) => {
                if (item.plant_id === id) {
                    return { ...item, [name]: value }
                } else {
                    return item
                }
            })
        )
    }

    const handleSave = (event) => {
        event.preventDefault();
        const plantID = edit.map( item => item.plant_id);
        plantID.forEach((id, i) => {
            updatePlant(uid, id, edit[i])
        })
        push("/home");
    }

    const handleDeletePlant = (event) => {
        event.preventDefault();
        const uid = localStorage.getItem('uid');
        deletePlant(uid, idParams);
        push("/home");
        
    }

    return (
        <EditContainer>
            {!idParams && plants ?
                plants.map((plant, i) => {
                    return (
                        <FormSection key={i} onSubmit={handleSave} className="edit-forms" >
                            <Heading style={{fontSize: "1.75rem"}}>Edit {plant.nickname}</Heading>
                            <label htmlFor="nickname"></label>
                            <Input
                                id={plant.plant_id}
                                type="text"
                                name="nickname"
                                value={edit[i].nickname}
                                onChange={handleChange}
                                placeholder="Nickname"
                            />
                            <label htmlFor="species"></label>
                            <Input
                                id={plant.plant_id}
                                type="text"
                                name="species"
                                value={edit[i].species}
                                onChange={handleChange}
                                placeholder="Species"
                            />
                            <label htmlFor="h20_frequency"></label>
                            <Input
                                id={plant.plant_id}
                                type="text-field"
                                name="h20_frequency"
                                value={edit[i].h20_frequency}
                                onChange={handleChange}
                                placeholder="Schedule"
                            />                            
                        </FormSection>)
                }) : edit.map((plant, i) => {
                    return (
                        <FormSection key={i} onSubmit={handleSave} className="edit-forms" >
                            <Heading style={{fontSize: "1.75rem"}}>Edit {plant.nickname}</Heading>
                            <label htmlFor="nickname"></label>
                            <Input
                                id={plant.plant_id}
                                type="text"
                                name="nickname"
                                value={edit[i].nickname}
                                onChange={handleChange}
                                placeholder="Nickname"
                            />
                            <label htmlFor="species"></label>
                            <Input
                                id={plant.plant_id}
                                type="text"
                                name="species"
                                value={edit[i].species}
                                onChange={handleChange}
                                placeholder="Species"
                            />
                            <label htmlFor="h20_frequency"></label>
                            <Input
                                id={plant.plant_id}
                                type="text-field"
                                name="h20_frequency"
                                value={edit[i].h20_frequency}
                                onChange={handleChange}
                                placeholder="Schedule"
                            />                            
                        </FormSection>)
                })}
            <button onClick={handleSave}>save</button>
            {!idParams ? <button onClick={()=> push("/addplant") }>add plant</button> : <button onClick={handleDeletePlant}>delete plant</button>}
        </EditContainer>
    )
}

export default EditPlant;