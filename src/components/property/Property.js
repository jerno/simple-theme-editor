import React from 'react'
import PropTypes from 'prop-types'

export default function Property({definition, prefix}) {
  return (
    <div role="row">
      {definition.displayName}:
      {definition.value}
      {`${prefix}.${definition.variableReference}`}
    </div>
  );
}

Property.propTypes = {
  definition: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    variableReference: PropTypes.string.isRequired,
  }).isRequired
}
