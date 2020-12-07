import React from 'react'
import PropTypes from 'prop-types'

export default function Property({definition, prefix, onEdit, resolvedReferences}) {
  const isValueUnitLike = !(definition.type === 'text' || definition.type === 'color');
  const unitPostfix = isValueUnitLike ? ` (${definition.type})` : '';

  const placeholders = Object.fromEntries([...definition.value.matchAll(/{([a-z1-9_.]+)}/ig)]);
  const resolvedValue = resolvedValues(placeholders);

  return (
    <div role="row" className="d-flex flex-row" onClick={() => onEdit && onEdit()}>
      <span className="mr-1">{`${definition.displayName}${unitPostfix}`}:</span>
      <span className="flex-grow-1 font-weight-bold">{resolvedValue}</span>
      <span className="text-left font-italic">{`${prefix}.${definition.variableReference}`}</span>
    </div>
  );

  function resolvedValues(placeholders) {
    let result = definition.value;
    for (const placeholder in placeholders) {
      const variableReference = placeholders[placeholder];
      result = result.replace(`{${variableReference}}`, resolvedReferences[variableReference].value);
    }
    return result;
  }
}

Property.propTypes = {
  definition: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    variableReference: PropTypes.string.isRequired,
  }).isRequired
}
