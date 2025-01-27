const API_URL = 'https://jsonplaceholder.typicode.com/users';
const userList = document.getElementById('user-list');
const userForm = document.getElementById('user-form');
const errorMessage = document.getElementById('error-message');

let users = [];
let isEditing = false;
let currentUserId = null;

// Fetch users
const fetchUsers = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch users.');
        users = await response.json();
        renderUsers();
    } catch (error) {
        showError(error.message);
    }
};

// Render user list
const renderUsers = () => {
    userList.innerHTML = '';
    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        userItem.innerHTML = `
      <p>ID: ${user.id}</p>
      <p>Name: ${user.firstName || 'N/A'} ${user.lastName || 'N/A'}</p>
      <p>Email: ${user.email}</p>
      <p>Department: ${user.department || 'N/A'}</p>
      <button onclick="editUser(${user.id})">Edit</button>
      <button onclick="deleteUser(${user.id})">Delete</button>
    `;
        userList.appendChild(userItem);
    });
};

// Show error message
const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
};

// Handle form submit
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(userForm);
    const user = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        department: formData.get('department'),
    };

    try {
        if (isEditing) {
            const response = await fetch(`${API_URL}/${currentUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) throw new Error('Failed to update user.');
            users = users.map(u => (u.id === currentUserId ? {
                ...u,
                ...user
            } : u));
        } else {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) throw new Error('Failed to add user.');
            const newUser = await response.json();
            users.push({
                ...user,
                id: newUser.id
            });
        }
        userForm.reset();
        isEditing = false;
        currentUserId = null;
        renderUsers();
    } catch (error) {
        showError(error.message);
    }
});

// Edit user
const editUser = (id) => {
    const user = users.find(u => u.id === id);
    if (user) {
        userForm.firstName.value = user.firstName || '';
        userForm.lastName.value = user.lastName || '';
        userForm.email.value = user.email || '';
        userForm.department.value = user.department || '';
        isEditing = true;
        currentUserId = id;
    }
};

// Delete user
const deleteUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete user.');
        users = users.filter(user => user.id !== id);
        renderUsers();
    } catch (error) {
        showError(error.message);
    }
};

// Initialize app
fetchUsers();