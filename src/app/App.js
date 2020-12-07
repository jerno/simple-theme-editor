import { useState } from "react";
import Section from "../components/section/Section";
import { SectionDefinitions } from "../config/Definitions";
import PropertyValueValidator from "./PropertyValueValidator";
import { getPreset, loadValues, saveValues } from "./storage/Storage";

function App() {
  const [sections,] = useState(sortById(SectionDefinitions));
  const [values, setValues] = useState(loadValues());

  return (
    <div className="p-3">
      <h1 className="text-primary">Simple Theme Editor</h1>
      { sections.map((sectionDefinition) => (
        <Section 
          key={sectionDefinition.id} 
          definition={sectionDefinition}
          resolvedReferences={values}
          updateSectionDefinition={requestUpdateSectionDefinition}
        />
      )) }
      <button onClick={() => saveValues(values)()} type="button" class="btn btn-primary">Save</button>
      <button onClick={() => setValues(getPreset())} type="button" class="btn btn-light">loadPreset</button>
      <button type="button" class="btn btn-danger" disabled>Clear</button>
    </div>
  );

  function requestUpdateSectionDefinition({variableReference, updatedProperties}) {
    const errorMessage = validate(updatedProperties);
    if (!errorMessage) {
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

export default App;
