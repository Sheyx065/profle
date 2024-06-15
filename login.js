document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');

    const loginData = {
        email: email,
        password: password
    };

    fetch('http://localhost:7777/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        console.log('Response status:', response.status); 
        if (!response.ok) {
            return response.json().then(errorData => {
                console.error('Server error:', errorData);
                throw new Error('Login failed');
            });
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('token', data.token);
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error:', error);
        errorDiv.style.display = 'block';
    });
});
