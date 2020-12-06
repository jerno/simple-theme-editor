import { useState } from "react";
import Section from "../components/section/Section";
import { SectionDefinitions } from "../config/Definitions";
import PropertyValueValidator from "./PropertyValueValidator";

function App() {
  const [sections, setSections] = useState(sortById(SectionDefinitions));
  
  return (
    <div>
      <h1>Simple Theme Editor</h1>
      { sections.map((sectionDefinition) => (
        <Section 
          key={sectionDefinition.id} 
          definition={sectionDefinition}
          updateSectionDefinition={requestUpdateSectionDefinition}
        />
      )) }
    </div>
  );

  function requestUpdateSectionDefinition({nextSectionDefinition, nextProperty}) {
    const errorMessage = validate(nextProperty);
    if (!errorMessage) {
      updateSectionDefinition(nextSectionDefinition);
    }
    return errorMessage;
  }

  function validate(nextProperty) {
    const errorMessage = PropertyValueValidator.validatePropertyAgainstDefinitions(nextProperty, mapDefinitions());
    return errorMessage;
  }

  function mapDefinitions() {
    const mappedEntries = SectionDefinitions.flatMap((section) => section.properties.map((property) => ([
      `${section.prefix}.${property.variableReference}`,
      property.value
    ])))
    return Object.fromEntries(mappedEntries);
  }

  function updateSectionDefinition(nextSection) {
    const next = [
      ...sections.filter((s) => s.id !== nextSection.id),
      nextSection
    ];
    setSections(sortById(next));
  }

  function sortById(sections) {
    return sections.sort((s1, s2) => `${s1.id}`.localeCompare(`${s2.id}`));
  }
}

export default App;
