import React from "react";
import generalConfig from "../../../../../../config/general-config";
import { styled } from "styled-components";

export const ProjectTitle = styled.div`
  font-size: 2em;
  text-align: center;
  color: #fff;
  font-weight: 600;
`;
export const SampleAppTitle = () => {
    return (
    <ProjectTitle>
        <h1>Sample ReactJs App</h1>
        <h5>mode: {generalConfig.env}</h5>
    </ProjectTitle>
    )
}
   
