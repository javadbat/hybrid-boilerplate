import React from "react";
import generalConfig from "@config/GeneralConfig";

export const SampleAppTitle = () => (
  <div className="project-title">
    <h1>Sample ReactJs App</h1>
    <h5>mode: {generalConfig.env}</h5>
  </div>
);
