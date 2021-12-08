import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Image = styled.img`
    max-width: 30%;
    @media(max-width:1000px) {
        max-width: 50%;
    }
`;

const PlantCard = (props) => {
    const history = useHistory();
    const {title, id, species, schedule, image} = props;

    return (
        <div>
            <div key={id} onClick={()=>history.push(`/plants/${id}`)}>
                <Image src={image} alt={''} />
                <h1>{title}</h1>
                <p>{species}</p>
                <h4>{schedule}</h4>
            </div>
        </div>
    );
};

export default PlantCard;