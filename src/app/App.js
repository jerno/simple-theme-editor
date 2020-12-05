import { useState } from "react";
import Section from "../components/section/Section";
import { SectionDefinitions } from "../config/Definitions";

function App() {
  const [sections, setSections] = useState(sortById(SectionDefinitions));
  const updateSectionDefinition = (nextSection) => {
    const next = [
      ...sections.filter((s) => s.id !== nextSection.id),
      nextSection
    ];
    setSections(sortById(next));
  };
  
  return (
    <div>
      <h1>Simple Theme Editor</h1>
      { sections.map((sectionDefinition) => (
        <Section 
          key={sectionDefinition.id} 
          definition={sectionDefinition}
          updateSectionDefinition={updateSectionDefinition}
        />
      )) }
    </div>
  );

  function sortById(sections) {
    return sections.sort((s1, s2) => `${s1.id}`.localeCompare(`${s2.id}`));
  }
}

export default App;
