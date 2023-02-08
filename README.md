# Notes - Frontend

This project aims to create the frontend of a **Notes application** using the React framework.

The frontend of the application was created with the `npx create-react-app notes` command which can be used once Node.js is installed on the computer. It runs on **port 3000** in **development environment**.

The notes are generated using the map function. A key attribute (cotaining the note id) was defined for the **Note component** placed in the `src/components` directory.

Every note contains its textual content and a timestamp, as well as a boolean value for marking whether the note has been categorized as important or not, and also a unique id.

Props fields are retrieved direclty using **destructuring**.

The **useState** function was used to store the notes in the App component's state.

An HTML form was added to the App component in order to add new notes.

A button was added to every note for toggling its importance. A filter was added to display only important notes.

## HTTP requests

The **axios** library was installed to make HTTP requests.

The **useEffect** function was used to fetch all the notes from the server after the first render of the App component.

The communication between the browser and the server was extracted into a separate module in the `notes.js` in the `src/services` directory.

The module returns an object that has three functions (getAll, create, and update) as its properties that deal with notes.

## Error messages

A Notification component was added into the App component in order to display **error messages** (e.g: when the user tried to toggle the importance of a deleted note).

## Stylesheet

The `index.css` file under the `src` directory was added and imported in the `index.js` file in order to add it to the Notes application.

## Testing server functionality

The JSON server package was installed to test the server functionality in development environment wihtout developing the backend yet.

The following script was added to the `package.json` in order to run the server on **port 3001** and watch for the db.json file in the root directory (which contains the notes data object).

```json
json-server --port 3001 --watch db.json
```

## Proxy

Due to changing the backend address to a relative URL in `src/services/note.js`:
```
const baseUrl = '/api/notes'
```
the connection to the backend (HTTP requests) do not work in development mode as they go to the wrong address localhost:3000/api/notes.

The following declaration was addedto the package.json file to solve this issue.

```json
{
  "dependencies": {
    // ...
  },
  "scripts": {
    // ...
  },
  "proxy": "http://localhost:3001"
}
```

## Login

The token returned with a successful login is saved to the application's state `user`.

The user's login information is saved in the browser's local storage keeping it persistent even when the page is re-rendered.

An effect hook was used to check if user details of a logged-in user can already be found on the local storage.

A conditional rendering of the login form was implemented so that it is visible only if a user is not logged-in. On the other hand, the name of the user and a list of blogs is shown if a user is logged-in.

The token stored in the the application's state `user` is set in a `token` variable in the `./src/services/notes.js˚` file so that it can be used when making HTTP POST requests.

```javascript
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
```

## Creating a new note

Logged-in user are allowed to add new notes using the `token` set using the setToken() helper function from the `./src/services/blogs.js˚` file.

The HTTP Authorization request header (containing the user access token) is declared in the `config` variable which is passed as a third argument when making a POST request.

```javascript
const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}
```

## Toggleable

The `Togglable` component was created to add the visibility toggling functionality on both the login and note's creation form.

`props.children` is used to render the elements defined between the opening and closing tags of the component.

```javascript
<Toggleable buttonLabel="new note">
  <NoteForm createNote={addNote} />
</Toggleable>
```

## Hiding the note form after creating a note

The `useRef` hook was used to reference the note form so that it can be hidden by the parent component (the `addNote` function is defined in the App component).

```javascript
const noteFormRef = useRef()
```

The `noteFormRef` reference is assigned to the instance of the Toogleable component using the `ref` attribute.

```
<Toggleable buttonLabel="new note" ref={noteFormRef}>
  //
</Toggleable>
```

The `Toggleable` component is wrapped within the `forwardRef` function in order to access the instance of Toogleable component referenced by the `noteFormRef` reference.

```javascript
export default forwardRef(Toggleable)
```

The `useImperativeHandle` hook is used to expose and invoke the `toggleVisibility` function outside of the `Toggleable` component.

```javascript
useImperativeHandle(refs, () => {
  return {
    toggleVisibility,
  }
})
```

The `toggleVisibility` function can be called using the `noteFormRef.current.toggleVisibility()` method.

```javascript
const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    //
}
```

## PropTypes

The `prop-types` library was installed in order to validate the types of properties passed to components. When an invalid value is provided for a prop, a warning will be shown in the JavaScript console. For performance reasons, propTypes is only checked in development mode.

## ESlint

Eslint is installed by default to applications created with `create-react-app`.

Base configuration file is extendend by adding the following ESlint configuration in `package.json`.

```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
}
```

A `.eslintrc.js` file was created in order to override the default ESlint configuration with my desired configuration.

The `eslint-plugin-jest` package was installed in order to avoid undesired and irrelevant linter errors while testing the frontend.

The `.eslintignore` file was created in order to skip the `build` and `node_modules` directories when linting.

## React Testing Library

The `react-testing-library` was installed in order to test React components by simulating the ways that users interact with DOM nodes.

Jest is installed by default to applications created with `create-react-app`.

The `jest-dom` was installed in order to provide a set of custom jest matchers to write tests that assert various things about the state of a DOM.

Unit test files are located in the same directory as the component being tested.

Tests are run in `watch` mode with the `npm test` command by default in applications created with `create-react-app`.

Components are rendered in a format that is suitable for testting using the `render` function provided by the react-testing-library:

```javascript
render(<Blog/>)
```

A rendered component can be accessed using the `screen` object.

The `getByText` method is used to find non-interactive elements (like divs, spans, and paragraphs) with the text content passed as argument.

```javascript
const element = screen.getByText('React patterns by Michael Chan')
```

The render function return a `container` object as one of its properties which can be used to query for rendered elements using the `querySelector` method.

```javascript
const { container } = render(<Note note={note} />)
const div = container.querySelector('.note')
```

The `user-event` library was installed in order to simulate **user interactions** by dispatching the **events** that would happen if the interaction took place in a browser.

**Mock functions** were used in order to replace dependencies (event handlers, etc) of the components being tested. Mocks make it possible to return hardcoded responses, and to verify the number of times the mock functions are called and with what parameters.

```javascript
const mockHandler = jest.fn()
```

The `userEvent.setup()` is used to start a session which mocks the UI layer to simulate **user interactions** like they would happen in the browser.

```
const user = userEvent.setup()
```

A test coverage can be generated with the following command:

```javascript
CI=true npm test -- --coverage
```

## End to end testing

The **Cypress** library was installed to test the web application as a whole.

```shell
npm install --save-dev cypress
```

## Resources

- [Proxying API Requests in Development](https://create-react-app.dev/docs/proxying-api-requests-in-development/)

- [Conditional rendering](https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator)

- [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage)

- [How to send the authorization header using Axios](https://flaviocopes.com/axios-send-authorization-header/)

-[useRef](https://beta.reactjs.org/reference/react/useRef)

-[forwardRef](https://beta.reactjs.org/reference/react/forwardRef)

-[useImperativeHandle](https://beta.reactjs.org/reference/react/useImperativeHandle)
