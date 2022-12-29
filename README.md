# Notes - Frontend

This project aims to create the frontend of a **Notes application** using the React framework.

The frontend of the application was created with the `npx create-react-app notes` command which can be used once Node.js is installed on the computer. It runs on **port 3000** in the **development environment**.

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

The JSON server package was installed to test the server functionality in the development environment wihtout developing the backend yet.

The following script was added to the `package.json` in order to run the server on **port 3001** and watch for the db.json file in the root directory (which contains the notes data object).

```json
json-server --port 3001 --watch db.json
```
