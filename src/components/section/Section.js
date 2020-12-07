import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PropertyEditor from '../property/PropertyEditor'
import Property from '../property/Property';
import styled from 'styled-components';

function Section({definition, updateSectionDefinition, resolvedReferences}) {
  const [inPlaceEditors, setInPlaceEditors] = useState({});

  return (
    <Wrapper role="rowgroup">
      <SectionHeader href={`#collapse${definition.id}`} role="button" data-toggle="collapse" aria-expanded="true" aria-controls={`collapse${definition.id}`}>
      { definition.title }
      </SectionHeader>
      <div className="collapse show" id={`collapse${definition.id}`}>
        { definition.properties.map((propertyDefinition) => renderProperty(propertyDefinition)) }
      </div>
    </Wrapper>
  );

  function renderProperty(propertyDefinition) {
    if (!!inPlaceEditors[propertyDefinition.variableReference]) {
      return (
        <Box key={`${definition.prefix}.${propertyDefinition.variableReference}`}>
          <PropertyEditor 
            definition={assembleProperty(propertyDefinition)} 
            prefix={definition.prefix} 
            resolvedReferences={resolvedReferences}
            updateSectionDefinition={(updatedProperties, dryRun) => handleUpdate(propertyDefinition, updatedProperties, dryRun)}
            onCancel={() => closeEditor(propertyDefinition.variableReference)}
          />
        </Box>
      );
    } else {
      return (
        <Property
          key={`${definition.prefix}.${propertyDefinition.variableReference}`}
          definition={assembleProperty(propertyDefinition)}
          prefix={definition.prefix}
          resolvedReferences={resolvedReferences}
          onEdit={() => setInPlaceEditors({...inPlaceEditors, [propertyDefinition.variableReference]: true})}
        />
      );
    }
  }

  function assembleProperty(propertyDefinition) {
    const values = resolvedReferences[`${definition.prefix}.${propertyDefinition.variableReference}`];
    return {
      ...propertyDefinition, 
      value: values?.value || "",
      type: values?.type || "text",
    }
  }

  function handleUpdate(property, updatedProperties, dryRun) {
    const variableReference = `${definition.prefix}.${property.variableReference}`;
    const errorMessage = updateSectionDefinition({variableReference, updatedProperties}, dryRun);
    if (!dryRun && !errorMessage) {
      closeEditor(property.variableReference);
    }
    return errorMessage;
  }

  function closeEditor(variableReference) {
    setInPlaceEditors({...inPlaceEditors, [variableReference]: false})
  }
}

const SectionHeader = styled.a`
  color: #5d5d5d;
  font-weight: 500;
  font-size: 1.3rem;

  &::before {
    content: "►";
    position: absolute;
    left: 0;
    margin-left: -1em;
  }
  
  &:not(.collapsed)::before {
    content: "▼";
  }
`;

const Box = styled.div.attrs({
  className: "open-inplace-editor",
})`
  background-color: #eaeaea;
  padding: 0.5em;
  border-radius: 5px;
`;

const Wrapper = styled.div.attrs({
  className: "mt-4 mb-4 ml-3",
})`
  position: relative;
`;

Section.propTypes = {
  definition: PropTypes.shape({
    title: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      variableReference: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  }).isRequired
}

export default Section

