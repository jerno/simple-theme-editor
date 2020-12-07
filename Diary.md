# Diary

## [Day1] Understanding the task

I have investigated the objective of the application. As I understood the goal is to create a theme editor that allows the user to customize a theme with the desired colors, sizes, and other parameters.

Given the fact that the task is quite open-ended and abstract, the first challenge is to define the scope of the task. Some details are quite obvious and clear after reading the document, but some things can be interpreted in many different ways.

### Things which are clear: 
- When the circumstance is given, that the theme is already loaded and displayed to the user (regardless of how it was loaded), the user can read all the variables, and edit those values.
- Each variable description of the section is displayed with its name, its 'resolved state', and its variable reference.
- Each variable of the section can be edited by clicking the text displayed, which opens an in-place editor. The editor allows the user to change the variable value and its type.
- While editing a variable, two actions are possible, the user can either keep the modified values or drop them.
- Valid variable values can be a fixed string, a numeric constant, or an expression composed by using other variables (as a variable reference) of the theme.
- To support flexibility (allow users to use other variables in expressions) the unit of the variable values are stored separately.
-According to the document, valid types can be plain text, "em", "px" or color. The color type is special in a way that besides the color code it also displays the color itself visually to the user.
- variables are grouped on the UI into sections, and they are collapsable.
- Edited theme variable values can be saved all together in the browser local storage (using the "Save" button).
- The editor content is initialized from the browser's local storage.
- When the variable values or types are modified, the 'resolved state' of the variable descriptions should be updated.
- The 'resolved state' of the variable descriptions should be also updated when its variable references are modified.
- The variable values need to be validated and the problem needs to be displayed to the user upon keeping the values. (closing the in-place editor with "OK")
- (In an advanced version) the validation should be triggered automatically after 300ms of inactivity.

### Things which are undefined:
- What are the limitations of the editor? Whether the user can open his/her own theme or it has a fixed/hardcoded structure and content.
- The user can remove/add a property to a section or not.
- The user can remove/add sections or not.
- The user can clear the saved theme or not.
- What should be the initial state of the editor? (should it be filled with any kind of sample/default values or not)

### Assumptions I have made:
- Given the fact that the provided document and its screenshots didn't show any UI elements for adding/removing properties or sections, I'm assuming that the theme template is fixed.
- The initial state of the editor contains the fixed structure, where all the fields are empty.
- The user cannot remove a property from a section.
- I have interpreted the "x" button in the in-place editor as a cancel.
- The user can clear the saved theme property values.
- There will be a "Use preset" button to fill up the form using a preset.
- I assume that this theme editor is used as a part of a CSS theme generator software to generate a custom CSS stylesheet for a UI framework. The user can edit a specific/fixed structure (structure of the UI framework) to customize its appearance. The customization can be saved locally to support further editing. The user can download the CSS stylesheets using the theme generator, which is not in the scope of this application.

## [Day2] Planning

Today I had a limited amount of time, thus I decided to plan the development process.

### Planning the development process

I am fond of software quality, so I am planning to have strong test coverage, a clean structure, and high reusability. In my opinion software quality and clean architecture go hand in hand with the ability to refactor (means how confident we are to remove working productive code in favor of a newer more optimal one). To foster these processes **I am going to use TDD**. As a test environment, I am going to use **react testing library and Jest** (which is shipped with Create-React-App).

### Planning the technical environment

As it is a requirement I am going to **use the React JS framework**. As a result, I am **going to create an NPM project**. Given the fact that this project is fairly simple, I am **going to use the Create-React-App** generator to bootstrap the project.

Another interesting question was to decide whether I should use JavaScript or TypeScript.

TypeScript is a language that helps to make code more consistent, clearer, more reusable, and simpler, exactly how I believe something should look like. Usually, I think a TypeScript code base is easier to maintain, but in general, I feel it is better to use it for bigger projects. 
Even though I consider TypeScript as a more proper tool, in my opinion, **JavaScript is a better choice** for this simple software.

## [First development day] Starting agile loops

Having the project generated yesterday evening, I am starting to build the low-level components of the application; The sections. I am creating a configuration file where the structure is defined. Starting with a test case, I expect the App component to render a `region` for each section configured. So far so good. The test is red, it means it is implementation time. The logic is fairly simple, all I need is a map which renders an element with a title for each definition. By finishing this logic, the test became green with satisfying coverage. It gave me enough confidence to start a small refactor. I am moving the region to a brand new component called `Section`.
> I decided to use ARIA roles to distinguish my UI elements. I believe that using React testing library encourages good testing practices by making us think more user-centric. My elements I wanted to target are more like containers, they do not have any good visual identifier. Since we can only target our elements mostly by texts and visuals, I consider it as a good approach to instrument UI elements with semantic values.

The section component is displayed, but it is almost empty. According to the documents I need to display its value, its type, and its variable reference as well. To support this I need to add more logic to the Section component. So I am creating more tests. I expect the component to display its title, for each property a `row` element with its details. This implies that Prop validation needs to be added to the component, the definition needs to be extended and three more expectation is necessary for the tests regarding the displayed values. 
> Note that TypeScript can be a better option than PropType validation. Given the fact that this project is small and simple, I have chosen JavaScript; That is the reason why I need PropType validation.

This time I realized that using the `rowgroup` role for the sections could be a better choice, and it could fit very nicely with the `row` role for the properties. According to the docs, the `rowgroup` is containing one or more `row` elements in a tabular container. Perfect! What a nice moment. As the evolution of the Section component has begun it is obvious that it should be a separate logical element. Time to move it to a new component with its test case.

Depending on the type, the display value should present the unit. According to the docs, there are 4 types (Text, color, em, px). Text is straightforward. Color is one of a kind, besides the hex representation it should also display the color visually, I will deal with it later. The em and px are types which are representing "units". 
> As an improvement, I believe that instead of "em" and "px", a unit option would be a more adequate choice. For this, I would suggest an input where the user can type the desired unit. It is also more flexible in the sense that future browser updates could introduce newer CSS units which will be automatically supported in that case. 

Creating a test for the text type quickly showed that this case is already covered. No implementation is needed, it is already done. The color is skipped for now. The rest of the cases need the same expectation, they should be displayed next to the property name. The implementation was a single condition and a concatenation.

Let's create the in-place editor. The editor should display the property values. Almost the same way as it is displayed in view mode. I am creating a test for that to check. The test result went red again. Next phase: implementation. I quickly included the Property component. Bumm! It was already enough to satisfy the tests. I am adding a new test to expect a textbox with the value of the property, and another for the type. The latter one should be a group of radio buttons, one for each type-definition. The implementation consists of the rendering of two UI elements: an input and a radio group. An additional test expectation was necessary to add, the user interaction. By changing the form elements, the UI should respond. 

The in-place editor needs a second power-up, the user should be able to change the values, and the modifications should be applied only by clicking the "OK" button. Triggering the button needs the same technique as the input change. However, the updates need to be propagated right back to the application component, where they are stored. For this, I need to pass function references along the component hierarchy and expect function calls with the modified parameters. 
The hierarchy looks like: *App > Section > PropertyEditor* 
For the child components, I can do this by mocking the function which is being passed to the components, and expect calls on that mock. For the app component, I expect the actual changes to be reflected on the UI itself. I chose a simple way for that, I mocked the Section component and added a simple button with a "testid", which I can use to trigger the update using a prepared object. The implementation here is also fairly simple, the state needs to be updated, it was just a matter of using the spread syntax and a filter. I almost felt like writing a Redux reducer. 
As a side effect, this update also affects the position of the sections in the list. To solve that I have used an array sort. 

> Note that a possible limitation of this solution can be the performance. If it will be an issue, I would change the data structure to an indexed one, like an Object or a Map.

## [Second development day] Adding features

Today I was adding featuers to the in-place editor. I created tests for checking it appears upon clicked, and only after click. For this I need only a state which keeps track of the opened editors.
Next feature is the close functionality. By clicking the cancel button it has to be removed from the DOM. Two tests were neccessary. One for the editor, to make sure that it emits the event. Another for the section to check both the "OK" and the "cancel" buttons are hiding the editor.

The property validator looks like a separate feature, so I decided to create a class for this purpose. I wrote tests for checking its functionality. The `PropertyValueValidator`:  

    ✓ passes for fixed values
    ✓ passes for values of properties if the references are existing
    ✓ fails for values of properties if the references are NOT existing
    ✓ fails for values of NON-existing property types
    ✓ fails for values that are using further references
    ✓ fails for values that are using self references

> Note that further validation can be added for preventing syntax errors. Currently everything is rendered as a plain text except the valid references (e.g: `{varname.with_optional_dots_and_dashes}`) which are being 'resolved'. Em and pixel are not validated either. Type information is provided for the validator for each resolved variable reference, thus even more validation is possible. (e.g. Cannot mix color type with pixel)

Validation created the need for the error display in the editor. If the validator returns an error, it will be displayed to the user.

Incorporating the validation means that I need to parse the value against the other existing properties. For this reason I have implemented it in the App component, where all the information was present. For this I had to chain this validation request throught the compnent props.

Also I have realized that a previous check I implemented in the validator (the self-reference check) is not needed anymore because I have already prevented the chaining (means: currently only variables with fixed values can be referred). This made self-reference check unneccessary, so I removed.

## [Third development day] Finishing

The biggest feature was the variable references resolution. This is responsibe for the parse and interpolation of the references. To support this, I have created a mapping with all the variable references and their resolutions. I passed this object to the validator and to the Property viewers as well.
This mapping represents all the user data, so this was a good opportunity to implement the save and load functions as well. For that I have created a `Storage` module, which is responsible for the persistance. At this point some modification was needed, because until this change the value and type was stored together with the section definition. By separating business data, this is not the case anymore. Some object spreading and merging was used in the Section component to provide all the data.

The functionalities are growing, the application has many elements. It is time to give some basic look and feel. I added bootstrap and made some UI changes.

> I have used bootstrap because it is widely-used, helps to hide many details about how to styling is done. All I need to do is to add some class names to the elements. 

I have styled the basic elements a bit, made it look more like the screenshot I've got.

> _"I feel the UI is now cluttered with cryptic-looking classes..."_

To solve this I used an other layer, which is `styled-components`. I found that CSS-in-JS can help to achieve a cleaner styling. By linking the styles with the component where it is used, it makes it easier to maintain and find unused stylings for example. Also, since it is JavaScript, it makes it very powerful by allowing expression and reusability. The good thing comes when using it with bootstrap, because I can put all the strange classes to the attributes of the component and I can use it by giving it a good name. For example the wrapper for the section can look like this: 

```javascript
const Wrapper = styled.div.attrs({
  className: "mt-4 mb-4 ml-3",
})`
  position: relative;
`;
```

I can use it in a very clean way, just by rendering `<Wrapper />`. It adds all the bootstrap classes (resusable), and applies all the custom stylings on top of that (customizable).

Finally I have added all the sections which were displayed on the task specification I got.

## [Advanced] Automatic validation

The automatic validation means that the value is being validated after 300ms inactivity. For that I have used the well-known approach; The debounce.  

> Debounce is intended to filter frequent changes/events. Basically it ignores the changes that are happening too fast after each other.

Since the validation was already in place upon form submission, I have used a technique to conditionally run it. I have provided a `dryRun` flag for the submission process.

> Dry run is about to run the same process but eliminating the side-effects.

By checking that flag, I was able to decouple the data-change from the validation. All I had to do was to wrap the forms value state into the debounce. That fires validation when the user stops typing.

## Wrap up

This is the end of this task. I hope I was able to implement it in a good quality, and you are going to like it. It was quite a fun to write it, however unfortunatelly I had to do it quick. I got the task on Monday, but I wasn't able to do anything with it until the end of the business week. I have documented all the improvement possibilities I found. By having more time, I am sure, that I would do many optimization. :)

# The applications health

PASS  src/app/PropertyValueValidator.test.js
PropertyValueValidator  

    ✓ passes for fixed values (4 ms)
    ✓ passes for values of properties if the references are existing
    ✓ fails for values of properties if the references are NOT existing (2 ms)
    ✓ fails for values of NON-existing property types (1 ms)
    ✓ fails for values that are using further references (1 ms)
    ✓ fails for values that are using self references (1 ms)

PASS  src/components/property/PropertyEditor.test.js
PropertyEditor  

    ✓ renders current value and variableReference (150 ms)
    ✓ renders value editor field with the correct value (388 ms)
    ✓ changes value when changing editor field (145 ms)
    ✓ renders type editor radio group (260 ms)
    ✓ changes value when changing selected radio button (64 ms)
    ✓ emits value only when user submits the editor (111 ms)
    ✓ emits nothing when user cancels the edition (136 ms)
    ✓ renders error message when validation fails (173 ms)

PASS  src/app/App.test.js
App  

    ✓ renders with title (33 ms)
    ✓ renders with predefined sections (48 ms)
    ✓ updates SectionDefinitions upon child update request (13 ms)

PASS  src/components/property/Property.test.js
Property  

    ✓ renders raw value and variableReference (10 ms)
    ✓ renders color badge (33 ms)
    ✓ renders 'resolved' value (5 ms)
    ✓ renders the bare displayName for a textual type (4 ms)
    ✓ renders displayName with " (unit)" postfix for a "unit-like" type (6 ms)
    ✓ emits onEdit when user clicks the component (15 ms)

PASS  src/index.test.js
Application  

    ✓ bootstraps without crashing (158 ms)

PASS  src/components/section/Section.test.js
Section  

    ✓ renders without crashing (100 ms)
    ✓ renders with title (20 ms)
    ✓ renders a row for each property (148 ms)
    ✓ renders no in-place editor until clicked (20 ms)
    ✓ renders the in-place editor upon clicked (241 ms)
    ✓ hides the in-place editor upon ok clicked (224 ms)
    ✓ hides the in-place editor upon cancel clicked (137 ms)
    ✓ calls updateSectionDefinition upon child update request (130 ms)

PASS  src/app/storage/Storage.test.js
Storage  

    ✓ getPreset (2 ms)
    ✓ loadValues (1 ms)
    ✓ loadValues should fallback (1 ms)
    ✓ saveValues (2 ms)