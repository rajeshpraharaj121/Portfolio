// Determine the backend URL dynamically based on the current window location.
// This allows the mobile device to connect to the computer's IP instead of 'localhost'.
const API_BASE = `http://${window.location.hostname}:5000`;

export default API_BASE;
