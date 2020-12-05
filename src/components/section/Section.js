import React from 'react'
import PropTypes from 'prop-types'
import PropertyEditor from '../property/PropertyEditor'

function Section({definition, updateSectionDefinition}) {
  return (
    <div role="rowgroup">
      { definition.title }
      { definition.properties.map((property) => (
        <PropertyEditor 
          key={`${definition.prefix}.${property.variableReference}`}
          definition={property} 
          prefix={definition.prefix} 
          updateSectionDefinition={(updatedProperties) => handleUpdate(property, updatedProperties)}
        />
      )) }
    </div>
  );

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

