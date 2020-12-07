const KEY = "savedState";

export function loadValues() {
  const savedState = localStorage.getItem(KEY);
  const values = savedState ? JSON.parse(savedState) : {};
  return values;
}

export function saveValues(values) {
  localStorage.setItem(KEY, JSON.stringify(values))
}

export function getPreset() {
  return {
    "colors.primary": {
      value: "#000000",
      type: 'color',
    },
    "colors.primaryBackground": {
      value: "#ffffff",
      type: 'color',
    },
    "sizes.text": {
      value: "1.1",
      type: 'em',
    },
    "textfield.border": {
      value: "1px solid {colors.primary}",
      type: 'text',
    },
  };
}