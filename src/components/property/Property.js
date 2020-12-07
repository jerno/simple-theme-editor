import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

export default function Property({definition, prefix, onEdit, resolvedReferences}) {
  const isValueUnitLike = !(definition.type === 'text' || definition.type === 'color');
  const unitPostfix = isValueUnitLike ? ` (${definition.type})` : '';

  const placeholders = Object.fromEntries([...definition.value.matchAll(/{([a-z1-9_.]+)}/ig)]);
  const resolvedValue = resolvedValues(placeholders);

  return (
    <Wrapper role="row" onClick={() => onEdit && onEdit()}>
      <span className="mr-1">{`${definition.displayName}${unitPostfix}`}:</span>
      <span className="flex-grow-1 font-weight-bold">
        {resolvedValue}
        { definition.type === 'color' ? <StyledColorBadge color={resolvedValue} /> : null }
      </span>
      <VariableReference>{`${prefix}.${definition.variableReference}`}</VariableReference>
    </Wrapper>
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

function Color({className}) {
  return (<span role="presentation" className={`ml-1 mr-1 ${className}`}></span>);
}

const StyledColorBadge = styled(Color)`
  background-color: ${(props => props.color)};
  width: 1em;
  height: 1em;
  display: inline-block;
  border: 2px solid #6f6f6f;
  border-radius: 4px;
`;

const VariableReference = styled.span.attrs({
  className: "text-left font-italic",
})`
  font-size: 0.85em;
  min-width: 200px;
`;

const Wrapper = styled.span.attrs({
  className: "d-flex flex-row",
})`
  cursor: pointer;

  &:hover, .open-inplace-editor & {
    color: var(--primary) !important;
  }
`;

Property.propTypes = {
  definition: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    variableReference: PropTypes.string.isRequired,
  }).isRequired
}
