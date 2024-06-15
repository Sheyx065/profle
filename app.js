document.addEventListener('DOMContentLoaded', () => {
    const profileLink = document.getElementById('profile-link');
    const profileContainer = document.getElementById('profile-container');
    const editProfileButton = document.getElementById('edit-profile');

    const token = getToken();
    if (!token) {
        redirectToLogin();
    }

    profileLink.addEventListener('click', (event) => {
        event.preventDefault();
        if (token) {
            fetchProfile(token);
        } else {
            redirectToLogin();
        }
    });

    editProfileButton.addEventListener('click', () => {
        if (token) {
            updateProfile(token);
        } else {
            redirectToLogin();
        }
    });

    function getToken() {
        return localStorage.getItem('token');
    }

    function redirectToLogin() {
        alert('You need to login first.');
        window.location.href = 'login.html';
    }

    function fetchProfile(token) {
        fetch('http://localhost:7777/users/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            profileContainer.innerHTML = `
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
            alert('Failed to fetch profile.');
        });
    }

    function updateProfile(token) {
        const updatedData = {
            name: 'New Name', // Replace with actual data
            email: 'newemail@example.com' // Replace with actual data
        };

        fetch('http://localhost:7777/users/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Profile updated successfully.');
            fetchProfile(token); // Refresh profile data
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        });
    }

    // Automatically load profile on page load if token exists
    if (token) {
        fetchProfile(token);
    } else {
        redirectToLogin();
    }
});
