import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Property from './Property'
import { PropertyTypeDefinitions } from '../../config/Definitions';
import { useDebounce } from 'use-debounce/lib';

export default function PropertyEditor({definition, prefix, updateSectionDefinition, onCancel, resolvedReferences}) {
  const [propertyValue, setPropertyValue] = useState(definition.value);
  const [propertyType, setPropertyType] = useState(definition.type);
  const debouncedPropertyValue = useDebounce(propertyValue, 300);
  const [error, setError] = useState(false);

  const requestUpdate = useCallback(({dryRun, value}) => {
    const errorMessage = updateSectionDefinition({ value, type: propertyType }, dryRun);
    setError(errorMessage);
  }, [debouncedPropertyValue]);

  useEffect(() => {
    requestUpdate({dryRun: true, value: debouncedPropertyValue});
  }, [debouncedPropertyValue]);

  return (
    <>
      <Property definition={definition} prefix={prefix} resolvedReferences={resolvedReferences} />

      <div className="d-flex flex-row pt-2 pb-2">
        <label className="mr-3" htmlFor="valueField">Value:</label>
        <input className="flex-grow-1" id="valueField" type="text" name="valueField" value={propertyValue} onChange={(e) => {setPropertyValue(e.target.value)}}/>
      </div>

      <div className="d-flex flex-row align-items-center">
        <form className="pt-2 pb-2 flex-grow-1">
          <span className="mr-3">Type: </span>
          { PropertyTypeDefinitions.map((typeDef) => (
            <label key={ typeDef.value }>
              <input
                type="radio"
                name="typeField"
                value={ typeDef.value }
                defaultChecked={ propertyType === typeDef.value }
                onChange={() => setPropertyType(typeDef.value)}
              />
              <span className="ml-1 mr-3">{ typeDef.label }</span>
            </label>
          )) }
        </form>
        <button onClick={() => requestUpdate({value: propertyValue, dryRun: false})} disabled={error} className="btn btn-sm btn-primary" >OK</button>
        <button onClick={() => onCancel()} className="btn btn-sm btn-light" >cancel</button>
      </div>

      { error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          { error }
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) }
    </>
  );
}

PropertyEditor.propTypes = {
  definition: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    variableReference: PropTypes.string.isRequired,
  }).isRequired
}
