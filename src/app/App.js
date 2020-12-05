import Section from "../components/section/Section";
import { SectionDefinitions } from "../config/Definitions";

function App() {
  return (
    <div>
      <h1>Simple Theme Editor</h1>
      { SectionDefinitions.map((sectionDefinition) => <Section key={sectionDefinition.id} definition={sectionDefinition} />) }
    </div>
  );
}

export default App;
