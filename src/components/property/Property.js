import React from 'react'
import PropTypes from 'prop-types'

export default function Property({definition, prefix}) {
  const isValueUnitLike = !(definition.type === 'text' || definition.type === 'color');
  const unitPostfix = isValueUnitLike ? ` (${definition.type})` : '';

  return (
    <div role="row">
      {`${definition.displayName}${unitPostfix}`}:
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
