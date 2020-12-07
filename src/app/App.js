import { useState } from "react";
import styled from "styled-components";
import Section from "../components/section/Section";
import { SectionDefinitions } from "../config/Definitions";
import PropertyValueValidator from "./PropertyValueValidator";
import { EMPTY_STATE, getPreset, loadValues, saveValues } from "./storage/Storage";

function App() {
  const [sections,] = useState(sortById(SectionDefinitions));
  const [values, setValues] = useState(loadValues());

  return (
    <div className="p-3">
      <Header>Simple Theme Editor</Header>
      { sections.map((sectionDefinition) => (
        <Section 
          key={sectionDefinition.id} 
          definition={sectionDefinition}
          resolvedReferences={values}
          updateSectionDefinition={requestUpdateSectionDefinition}
        />
      )) }
      <button onClick={() => saveValues(values)} type="button" className="btn btn-sm pl-4 pr-4 mr-1 btn-primary">Save</button>
      <button onClick={() => setValues(getPreset())} type="button" className="btn btn-sm pl-4 pr-4 mr-1 btn-light">Load preset</button>
      <button onClick={() => setValues(EMPTY_STATE)} type="button" className="btn btn-sm pl-4 pr-4 mr-1 btn-danger">Clear form</button>
    </div>
  );

  function requestUpdateSectionDefinition({variableReference, updatedProperties}, dryRun) {
    const errorMessage = validate(updatedProperties);
    if (!dryRun && !errorMessage) {
      setValues({
        ...values,
        [variableReference]: updatedProperties
      });
    }
    return errorMessage;
  }

  function validate(updatedProperties) {
    const errorMessage = PropertyValueValidator.validatePropertyAgainstDefinitions(updatedProperties, values);
    return errorMessage;
  }

  function sortById(sections) {
    return sections.sort((s1, s2) => `${s1.id}`.localeCompare(`${s2.id}`));
  }
}

const Header = styled.h1.attrs({
  className: "text-primary",
})`
  text-transform: lowercase;
`;

export default App;
