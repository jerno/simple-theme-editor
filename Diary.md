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

## [Day2] Planning

Today I had a limited amount of time, thus I decided to plan the development process.

### Planning the development process

I am fond of software quality, so I am planning to have a strong test coverage, a clean structure and high reusablity. In my opinion software quality and clean architecture goes hand in hand with the ability to refactor (means how confident we are to remove working productive code in favor of a newer more optimal one). To foster these processes **I am going to use TDD**. As a test environment I am going to use **react testing library and Jest** (which is shipped with Create-React-App).

### Planning the technical environment

As it is a requirement I am going to **use React JS framework**. As a result I am **going to create an NPM project**. Given the fact that this project is fairly simple, I am **going to use Create-React-App** generator to bootstrap the project.

Another interesting question was to decide whether I should use JavaScript or TypeScript.

TypeScript is a language that helps to make code more consistent, cleaner, more reusable and simpler, exactly how I believe something should look like. Usually I think TypeScript code base is easier to maintain, but in general I feel it is better to use it for bigger projects.  
Despite the fact that I consider TypeScript as a more proper tool, in my opinion **JavaScript is a better choice** for this simple software.

## [Day3] Starting agile loops

Having the project generated yesterday evening, I am starting to build the low-level components of the application; The sections. I am creating a configuration file where the structure is defined. Starting with a test case, I expect the App component to render a `region` for each section configured. So far so good. The test is red, it means it is implementation time. The logic is fairly simple, all I need is a map which renders an element with a title for each definition. By finishing this logic, the test became green with a satisfying coverage. It gave me enough confidence to start a small refactor. I am moving the region to a brand new component called `Section`.
> I decided to use ARIA roles to distinguish my UI elements. I believe that using React testing library encourages good testing practices by making us to think more user-centric. My elements I wanted to target are more like containers, they do not have any good visual identifier. Since we can only target our elements mostly by texts and visuals, I consider it as a good approach to instrument UI elements with semantic values.

Section is displayed, but it is almost empty. According to the documents I need to display its value, its type and its veriableReference as well. To support this I need to add more logic to the Section component. So I am creating more tests. I expect the component to display its title, for each property a `row` element with its details. This implies that Prop validation needs to be added to the component, the definition needs to be extended and three more expectation is necessary in the tests regarding the displayed values.  
> Note that TypeScript can be a better option than PropType validation. Given the fact that this project is small and simple, I have choosen JavaScript; That is the reason why I need PropType validation.

This time I realized that using `rowgroup` role for the sections could be a better choice, and it could fit very nicely with the `row` role for the properties. According to the docs `rowgroup` is containing one or more `row` elements in a tabular container. Perfect! What a nice moment. As the evolution of the Section component has begun it is obvious that it should be a separate logical element. Time to move it to a new component with its test case.

Depending on the type, the display value should present the unit.According to the docs, there are 4 types (Text, color, em, px). Text is straightforward. Color is one of a kind, besides the hex representation it should also display the color visually, I will deal with it later. The em and px are types which are representing "units".  
> As an improvement, I believe that instead of em and px an unit option would be more adequate choice. For this I would suggest an input where the user can type the desired unit. It is also more flexible in a sense that future browser updates could introduce newer CSS units which will be automatically supported in that case.  

Creating a test for the text type quickly showed that this case is already covered. No implementation is needed, it is already done. The color is skipped for now. The rest of the cases need the same expectation, they should be displayed next to the property name. The implementation was a single condition and a concatenation.

Let's create the in-place editor. The editor should display the property values. Almost exactly the same way as it is displayed in view mode. I am creating a test for that to check. The test result went red again. Next phase: implementation. I quickly included the Property component. Bumm! It was already enough to satisfy the tests. I am adding a new test to expect a textbox with the value of the property, and an other for the type. The latter one should be a group of radio buttons, one for each type definition. The implementation consists of the the rendering of two UI elements: an input and a radio group. An additional test expectation was necessary to add, the user interaction. By changing the form elements, the UI should respond. 

The in-place editor needs a second power-up, the user should be able to change the values, and the modifications should be applied only by clicking the "OK" button. Triggering the button needs the same technique as the input change. However, the updates needs to be propagated right back to the application component, where they are stored. For this I need to pass function references along the component hierarchy and expect function calls with the modified parameters.  
The hierarchy looks like: *App > Section > PropertyEditor*  
For the child components I can do this by mocking the function which is being passed to the components, and expect calls on that mock. For the app component I expect the actual changes to be reflected on the UI itself. I chose a simple way for that, I mocked the Section component and added a simple button with a "testid", which I can use to trigger the update using a prepared object. The implementation here is also fairly simple, the state needs to be updated, it was just a matter of using the spread syntax and a filter. I almost felt like writing a Redux reducer.  
As a side effect, this update also affects the position of the sections in the list. To solve that I have used an array sort. 

> Note that a possible limitation of this solution can be the performance. If it will be an issue, I would change the data structure to an indexed one, like an Object or a Map.
