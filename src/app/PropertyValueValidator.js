import { PropertyTypeDefinitions } from "../config/Definitions";

export default class PropertyValueValidator {
  constructor(property, definitions) {
    this.property = property;
    this.definitions = definitions;
  }

  static validatePropertyAgainstDefinitions(property, definitions) {
    const validator = new PropertyValueValidator(property, definitions);

    if (PropertyTypeDefinitions.find((def) => property.type === def.value)) {
      return validator.validateProperty();
    }
    return validator.validateUndefinedProperty();
  }

  validateProperty() {
    const references = this.findReferences(this.property.value);
    const resolvedRefs = this.resolveReferences(references);
  
    const missingReferences = resolvedRefs.filter((variable) => variable.resolved === undefined);
    if (missingReferences.length > 0) {
      const missingReferenceNames = missingReferences.map((ref) => ref.variableRefrence);
      return `Undefined property: ${missingReferenceNames.join(', ')}`;
    }

    const concatenatedResolvedValues = resolvedRefs.map((ref) => ref.resolved).join(' ');
    const chainedVariables = this.findReferences(concatenatedResolvedValues);
    if (chainedVariables.length > 0) {
      return `Chaining not spported: You can only reference variables with fixed values`;
    }

    return false;
  }

  resolveReferences(references) {
    return references.map((variableRefrence) => {
      const resolved = this.definitions[variableRefrence]?.value;
      return {
        variableRefrence,
        resolved
      };
    });
  }

  findReferences(value) {
    let references = [];
    const myRegexp = /{([a-z1-9_.]+)}/ig;
    let match = myRegexp.exec(value);
    while (match != null) {
      references.push(match[1]);
      match = myRegexp.exec(value);
    }
    return references;
  }

  validateUndefinedProperty() {
    return 'Undefined type: Type does\'n exist!';
  }
}
