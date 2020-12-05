import React from 'react'
import PropTypes from 'prop-types'
import Property from '../property/Property'

function Section({definition}) {
  return (
    <div role="rowgroup">
      { definition.title }
      { definition.properties.map((property) => (
        <Property definition={property} prefix={definition.prefix} key={`${definition.prefix}.${property.variableReference}`}/>
      )) }
    </div>
  )
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

