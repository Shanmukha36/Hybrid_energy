// Configuration file for API keys
// INSTRUCTIONS:
// 1. Copy this file and rename it to: config.js
// 2. Replace 'YOUR_API_KEY_HERE' with your actual OpenWeatherMap API key
// 3. NEVER commit config.js to GitHub (it's in .gitignore)

const CONFIG = {
    // Get your free API key from: https://openweathermap.org/api
    WEATHER_API_KEY: 'YOUR_API_KEY_HERE',
    
    // Optional: Add other configuration here
    DEFAULT_LOCATION: 'Koduru, Andhra Pradesh',
    DEFAULT_UTILITY_RATE: 8,  // ₹/kWh
    DEFAULT_EXPORT_RATE: 5    // ₹/kWh
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}
