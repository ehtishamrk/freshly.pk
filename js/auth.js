/* ⚠️ DEMO ONLY: This is client-side authentication.
   In a real production app, this logic must exist on a secure server.
   For the purpose of this investor demo, this is sufficient.
*/

const MOCK_DB = {
    users: [
        {
            id: "EMP-001",
            password: "password123", // The magic password
            name: "Rana Nouman",
            role: "Operations Manager"
        },
        {
            id: "admin",
            password: "admin",
            name: "System Admin",
            role: "Super User"
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#employee-modal form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Get input values
            const idInput = loginForm.querySelector('input[type="text"]'); // ID input
            const passInput = loginForm.querySelector('input[type="password"]'); // Password input
            const btn = loginForm.querySelector('button');

            // 2. UI Feedback (Loading state)
            const originalText = btn.textContent;
            btn.textContent = "Verifying Credentials...";
            btn.style.opacity = "0.7";

            // 3. Simulate Network Delay (looks more real)
            setTimeout(() => {
                const user = MOCK_DB.users.find(u => u.id === idInput.value && u.password === passInput.value);

                if (user) {
                    // SUCCESS: Save session and redirect
                    sessionStorage.setItem('freshly_user', JSON.stringify(user));
                    btn.textContent = "Success! Redirecting...";
                    btn.style.backgroundColor = "#0B6E4F"; // Jungle Green
                    
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 800);
                } else {
                    // ERROR: Shake animation and reset
                    btn.textContent = "Invalid ID or Password";
                    btn.style.backgroundColor = "#e53e3e"; // Red
                    
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.backgroundColor = ""; // Reset to CSS default
                        btn.style.opacity = "1";
                    }, 2000);
                }
            }, 1000); 
        });
    }

    // Logout Logic (for the dashboard)
    const logoutBtn = document.getElementById('logout-btn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('freshly_user');
            window.location.href = 'index.html';
        });
    }
});
