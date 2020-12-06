import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PropertyEditor from '../property/PropertyEditor'
import Property from '../property/Property';

function Section({definition, updateSectionDefinition}) {
  const [inPlaceEditors, setInPlaceEditors] = useState({});

  return (
    <div role="rowgroup">
      { definition.title }
      { definition.properties.map((propertyDefinition) => renderProperty(propertyDefinition)) }
    </div>
  );

  function renderProperty(propertyDefinition) {
    if (!!inPlaceEditors[propertyDefinition.variableReference]) {
      return (
        <PropertyEditor 
          key={`${definition.prefix}.${propertyDefinition.variableReference}`}
          definition={propertyDefinition} 
          prefix={definition.prefix} 
          updateSectionDefinition={(updatedProperties) => handleUpdate(propertyDefinition, updatedProperties)}
        />
      );
    } else {
      return (
        <Property
          key={`${definition.prefix}.${propertyDefinition.variableReference}`}
          definition={propertyDefinition}
          prefix={definition.prefix}
          onEdit={() => setInPlaceEditors({...inPlaceEditors, [propertyDefinition.variableReference]: true})}
        />
      );
    }
  }

  function handleUpdate(property, updatedProperties) {
    const nextProperty = {
      ...property,
      ...updatedProperties
    };
    
    const nextSectionDefinition = {
      ...definition,
      properties: [
        ...definition.properties.filter((p) => p !== property),
        nextProperty
      ]
    };
    
    updateSectionDefinition(nextSectionDefinition);
  }
}

Section.propTypes = {
  definition: PropTypes.shape({
    title: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    properties: PropTypes.arrayOf(PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      variableReference: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  }).isRequired
}

export default Section

