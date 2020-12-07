const KEY = "savedState";

export function loadValues() {
  const savedState = localStorage.getItem(KEY);
  const values = savedState ? JSON.parse(savedState) : EMPTY_STATE;
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
    "colors.secondary": {
      value: "#ffffff",
      type: 'color',
    },
    "colors.secondaryBackground": {
      value: "#4a86e8",
      type: 'color',
    },
    "colors.highlight1": {
      value: "#4a86e8",
      type: 'color',
    },
    "colors.highlight2": {
      value: "#ffab40",
      type: 'color',
    },
    "sizes.text": {
      value: "1.1",
      type: 'em',
    },
    "sizes.h1": {
      value: "1.4",
      type: 'em',
    },
    "sizes.h2": {
      value: "1.2",
      type: 'em',
    },
    "sizes.borderWidth": {
      value: "1",
      type: 'px',
    },
    "textfield.textSize": {
      value: "{sizes.text}",
      type: 'text',
    },
    "textfield.color": {
      value: "{colors.primary}",
      type: 'color',
    },
    "textfield.border": {
      value: "1px solid {colors.primary}",
      type: 'text',
    },
    "textfield.background": {
      value: "{colors.primaryBackground}",
      type: 'color',
    },
    "buttons.fontSize": {
      value: "calc({sizes.text}*{sizes.h2})",
      type: 'em',
    },
    "buttons.color": {
      value: "{colors.primary}",
      type: 'color',
    },
    "buttons.background": {
      value: "{colors.secondaryBackground}",
      type: 'color',
    },
  };
}

export const EMPTY_STATE = {
  "colors.primary": {
    value: "",
    type: 'color',
  },
  "colors.primaryBackground": {
    value: "",
    type: 'color',
  },
  "colors.secondary": {
    value: "",
    type: 'color',
  },
  "colors.secondaryBackground": {
    value: "",
    type: 'color',
  },
  "colors.highlight1": {
    value: "",
    type: 'color',
  },
  "colors.highlight2": {
    value: "",
    type: 'color',
  },
  "sizes.text": {
    value: "",
    type: 'em',
  },
  "sizes.h1": {
    value: "",
    type: 'em',
  },
  "sizes.h2": {
    value: "",
    type: 'em',
  },
  "sizes.borderWidth": {
    value: "",
    type: 'px',
  },
  "textfield.textSize": {
    value: "",
    type: 'text',
  },
  "textfield.color": {
    value: "",
    type: 'color',
  },
  "textfield.border": {
    value: "",
    type: 'text',
  },
  "textfield.background": {
    value: "",
    type: 'color',
  },
  "buttons.fontSize": {
    value: "",
    type: 'em',
  },
  "buttons.color": {
    value: "",
    type: 'color',
  },
  "buttons.background": {
    value: "",
    type: 'color',
  },
};