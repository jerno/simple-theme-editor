export const SectionDefinitions = [
  {
    id: 1,
    title: 'General colors',
    prefix: 'colors',
    properties: [
      {
        displayName: 'Primary font color',
        value: '#000000',
        type: 'color',
        variableReference: 'primary',
      }
    ]
  },
  {
    id: 2,
    title: 'Global sizes',
    prefix: 'sizes',
    properties: [
      {
        displayName: 'Default text size',
        value: '1.1',
        type: 'em',
        variableReference: 'text',
      }
    ]
  },
]
export const PropertyTypeDefinitions = [
  {
    value: 'text',
    label: 'Plain text',
  },
  {
    value: 'em',
    label: 'em',
  },
  {
    value: 'px',
    label: 'px',
  },
  {
    value: 'color',
    label: 'Color',
  },
]