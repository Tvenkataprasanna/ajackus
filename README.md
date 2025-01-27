Objective
Develop a simple web application where users can view, add, edit, and delete user details from a mock backend API.
Requirements
User Interface:
Display a list of users with details such as ID, First Name, Last Name, Email, and Department.
Provide buttons or links to "Add", "Edit", and "Delete" users.
A form to input details of a new user or edit details of an existing user.
Backend Interaction:
Use JSONPlaceholder, a free online REST API that you can use for demonstration and test purposes.
Specifically, use the '/users' endpoint to fetch and manipulate user data.
Functionality:
View: Display all users by fetching data from the '/users' endpoint.
Add: Allow adding a new user by posting to the '/users' endpoint. (Note: JSONPlaceholder won't actually add the user, but will simulate a successful response.)
Edit: Allow editing an existing user. This should involve fetching the current data for a user, allowing for edits, and then putting the updated data back via the API.
Delete: Allow users to be deleted, by sending a delete request to the API.
Error Handling:
Handle scenarios where the API request might fail - show an error message to the user in such cases.
Bonus (Optional):
Implement pagination or infinite scrolling for the user list.
Add client-side validation for the user input form.
Make the interface responsive.
