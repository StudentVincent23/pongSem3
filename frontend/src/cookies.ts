// Function to update cookie
export const updateCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; expires=Sun, 1 Jan 2028 00:00:00 UTC; path=/`;
};

// Function to get cookie value
export const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
};