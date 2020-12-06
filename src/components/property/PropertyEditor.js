import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Property from './Property'
import { PropertyTypeDefinitions } from '../../config/Definitions';

export default function PropertyEditor({definition, prefix, updateSectionDefinition, onCancel}) {
  const [propertyValue, setPropertyValue] = useState(definition.value);
  const [propertyType, setPropertyType] = useState(definition.type);
  const [error, setError] = useState(false);

  return (
    <>
      <Property definition={definition} prefix={prefix} updateSectionDefinition={noop} onEdit={noop}/>

      <label htmlFor="valueField">Value:</label>
      <input id="valueField" type="text" name="valueField" value={propertyValue} onChange={(e) => {setPropertyValue(e.target.value)}}/>

      <div>
        <form>
        { PropertyTypeDefinitions.map((typeDef) => (
          <label key={ typeDef.value }>
            <input
              type="radio"
              name="typeField"
              value={ typeDef.value }
              defaultChecked={ propertyType === typeDef.value }
              onChange={() => setPropertyType(typeDef.value)}
            />
            { typeDef.label }
          </label>
        )) }
        </form>
      </div>

      { error && <p>{ error }</p> }

      <button onClick={() => onCancel()}>cancel</button>
      <button onClick={() => requestUpdate()}>OK</button>
    </>
  );

  function requestUpdate() {
    const errorMessage = updateSectionDefinition({ value: propertyValue, type: propertyType });
    setError(errorMessage);
  }
}

function noop() {}

PropertyEditor.propTypes = {
  definition: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    variableReference: PropTypes.string.isRequired,
  }).isRequired
}
