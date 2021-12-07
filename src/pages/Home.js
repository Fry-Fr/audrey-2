// list of plants
import React from "react";
import styled from "styled-components";
import PlantCard from "../components/PlantCard";
import {Heading} from "../styles/StyledComponents";


const Card = styled.div`
  text-align: center;
  width: 75%;
  margin: 3rem auto;
  padding: 10px;
  background-color: #d4d4aa;
  color: #000;
  transition: all 0.3s ease-in;

  &:hover {
    background-color: #a9a9d4;
    color: #0000fff;
  }
`;

const Home = ({ plants }) => {

    return (
        (!plants) ?
            <div>
                <Heading>My Plants</Heading>
                <Card>
                    <h2>No plants added yet</h2>
                </Card>
            </div>
            :
            <div>
                <Heading>My Plants</Heading>
                {plants.map((plant, index) => {
                    return (
                        <Card key={index}>
                        <PlantCard
                            title={plant.nickname}
                            species={plant.species}
                            schedule={plant.h20_frequency}
                            image={plant.image_url}
                            id={plant.plant_id}
                            key={plant.plant_id}
                        />
                        </Card>
                    );
                })}
            </div>
    );
}

export default Home;