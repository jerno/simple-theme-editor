# Diary

## [Day1] Understanding the task

I have investigated the objective of the application. As I understood the goal is to create a theme editor which allows the user to customize a theme with the desired colors, sizes, and other parameters.

Given the fact that the task is quite open-ended and abstract, the first challenge is to define the scope of the task. There are details which are quite obvious and clear after reading the document, but there are things which can be interpreted in many different ways.

_Things which are clear_:  
- When the circumstance is given, that the theme is already loaded and displayed to the user (regardless how it was loaded), the user can read all the variables, and edit those values.
- Each variable description of the section is displayed with its name, its 'resolved state' and its variable reference.
- Each variable of the section can be edited by clicking the text displayed, which opens an in-place editor. The editor allows the user to change the variable value and its type.
- While editing a variable, two actions are possible, user can either keep the modified values or drop them.
- Valid variable values can be a fixed string, a numeric constant, or an expression composed by using other variables (as a variable reference) of the theme.
- To support flexibilty (allow users to use other variables in expressions) the unit of the variable values are stored separately.
- According the document, valid types can be plain text, "em", "px" or color. The color type is special in a way that besides the color code it also diplays the color itself visually to the user.
- variables are grouped on the UI into sections, and they are collapsable.
- Edited theme variable values can be saved all together in the browser local storage (using the "Save" button).
- The editor content is initialized from the browser local storage.
- When the variable values or types are modified, the 'resolved state' of the variable descriptions should be updated.
- The 'resolved state' of the variable descriptions should be also updated when its variable references are modified.
- The variable values needs to be validated and displayed the problem to the user upon keeping the values. (closing the in-place editor with "OK")
- (In an advanced verison) the validation should be triggered automatically after 300ms of inactivity.

_Things which are undefined_:
- What are the limitations of the editor? Whether the user can open his/her own theme or it has a fixed/hardcoded structure and content.
- The user can remove / add a property to a section or not.
- The user can remove / add sections or not.
- The user can clear the saved theme or not.
- What should be the initial state of the editor? (should it be filled with any kind of sample/default values or not)

_Assumptions I have made_:
- Given the fact that the provided document and its screenshots didn't show any UI elements for adding / removing properties or sections, I'm assuming that the theme template is fixed.
- The initial state of the editor contains the fixed structure, where all the fields are empty.
- The user cannot remove a property from a section.
- I have interpreted the "x" button in the in-place editor as a cancel.
- The user can clear the saved theme property values.
- There will be a "Use preset" button to fill up the form using a preset.
- I assume that this theme editor is used as a part of a CSS theme generator software to generate custom CSS stylesheet for a UI framework. The user is able to edit a specific / fixed structure (structure of the UI framework) to customize its appearance. The customization can be saved locally to support further editing. The user can download the CSS stylesheets using the theme generator, which is not in the scope of this application.
