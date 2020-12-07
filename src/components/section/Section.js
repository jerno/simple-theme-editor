import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PropertyEditor from '../property/PropertyEditor'
import Property from '../property/Property';

function Section({definition, updateSectionDefinition, resolvedReferences}) {
  const [inPlaceEditors, setInPlaceEditors] = useState({});

  return (
    <div role="rowgroup" className="mt-4 mb-4">
      <a href={`#collapse${definition.id}`} role="button" data-toggle="collapse" aria-expanded="false" aria-controls={`collapse${definition.id}`}>
        <h2 style={{fontSize: '1.3rem'}}>{ definition.title }</h2>
      </a>
      <div class="collapse" id={`collapse${definition.id}`}>
        { definition.properties.map((propertyDefinition) => renderProperty(propertyDefinition)) }
      </div>
    </div>
  );

  function renderProperty(propertyDefinition) {
    if (!!inPlaceEditors[propertyDefinition.variableReference]) {
      return (
        <PropertyEditor 
          key={`${definition.prefix}.${propertyDefinition.variableReference}`}
          definition={assembleProperty(propertyDefinition)} 
          prefix={definition.prefix} 
          resolvedReferences={resolvedReferences}
          updateSectionDefinition={(updatedProperties) => handleUpdate(propertyDefinition, updatedProperties)}
          onCancel={() => closeEditor(propertyDefinition.variableReference)}
        />
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

  function handleUpdate(property, updatedProperties) {
    const variableReference = `${definition.prefix}.${property.variableReference}`;
    const errorMessage = updateSectionDefinition({variableReference, updatedProperties});
    if (!errorMessage) {
      closeEditor(property.variableReference);
    }
    return errorMessage;
  }

  function closeEditor(variableReference) {
    setInPlaceEditors({...inPlaceEditors, [variableReference]: false})
  }
}

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

