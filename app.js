// Main application logic and weather API integration

// Load API key from config.js (not committed to GitHub)
// If config.js doesn't exist, falls back to placeholder
const WEATHER_API_KEY = (typeof CONFIG !== 'undefined' && CONFIG.WEATHER_API_KEY) 
    ? CONFIG.WEATHER_API_KEY 
    : 'YOUR_API_KEY_HERE';

let currentWeatherData = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateLocation();
    
    // Initial calculation
    setTimeout(() => calculate(), 1000);
});

function setupEventListeners() {
    // System type change
    document.querySelectorAll('input[name="systemType"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.body.className = e.target.value === 'off-grid' ? 'off-grid' : '';
            calculate();
        });
    });
    
    // System configuration checkboxes
    document.getElementById('useSolar').addEventListener('change', (e) => {
        const solarSection = document.querySelector('.solar-section');
        solarSection.style.display = e.target.checked ? 'block' : 'none';
        calculate();
    });
    
    document.getElementById('useWind').addEventListener('change', (e) => {
        const windSection = document.querySelector('.wind-section');
        windSection.style.display = e.target.checked ? 'block' : 'none';
        calculate();
    });
    
    // Real-time input updates
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(() => calculate(), 500));
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Weather API integration
async function updateLocation() {
    const location = document.getElementById('locationInput').value;
    
    try {
        // Fetch weather data
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        
        const data = await response.json();
        currentWeatherData = data;
        
        // Update UI
        document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('conditions').textContent = 
            `${data.weather[0].description} | ${data.main.temp}°C | Wind: ${data.wind.speed} m/s | Clouds: ${data.clouds.all}%`;
        
        // Update ambient based on weather
        updateAmbient(data);
        
        // Recalculate with new weather
        calculate();
        
    } catch (error) {
        console.error('Weather fetch error:', error);
        // Use default values
        document.getElementById('location').textContent = location;
        document.getElementById('conditions').textContent = 'Using default weather values';
        
        currentWeatherData = {
            wind: { speed: 5 },
            clouds: { all: 30 },
            weather: [{ main: 'Clear' }]
        };
        
        calculate();
    }
}

function updateAmbient(weatherData) {
    const cloudCover = weatherData.clouds.all;
    const hour = new Date().getHours();
    
    // Determine ambient class
    if (hour < 6 || hour > 20) {
        document.body.className = 'night';
    } else if (cloudCover > 70) {
        document.body.className = 'cloudy';
    } else if (cloudCover < 30) {
        document.body.className = 'sunny';
    } else {
        document.body.className = '';
    }
}

function addAppliance() {
    const applianceList = document.getElementById('applianceList');
    const newItem = document.createElement('div');
    newItem.className = 'appliance-item';
    newItem.innerHTML = `
        <input type="text" placeholder="Appliance">
        <input type="number" placeholder="Watts" min="0">
        <input type="number" placeholder="Hours/day" min="0" max="24" step="0.5">
    `;
    applianceList.appendChild(newItem);
}

function getAppliances() {
    const items = document.querySelectorAll('.appliance-item');
    const appliances = [];
    
    items.forEach(item => {
        const inputs = item.querySelectorAll('input');
        const name = inputs[0].value;
        const watts = parseFloat(inputs[1].value) || 0;
        const hours = parseFloat(inputs[2].value) || 0;
        
        if (name && watts > 0 && hours > 0) {
            appliances.push({ name, watts, hours });
        }
    });
    
    return appliances;
}


function calculate() {
    try {
        console.log('Calculate function called');
        
        // Check which systems are enabled
        const useSolar = document.getElementById('useSolar').checked;
        const useWind = document.getElementById('useWind').checked;
        
        console.log('Solar enabled:', useSolar, 'Wind enabled:', useWind);
        
        // Get input values
        const numPanels = useSolar ? (parseFloat(document.getElementById('numPanels').value) || 0) : 0;
        const panelWattage = useSolar ? (parseFloat(document.getElementById('panelWattage').value) || 0) : 0;
        const panelEfficiency = useSolar ? (parseFloat(document.getElementById('panelEfficiency').value) || 0) : 0;
        const sunlightHours = useSolar ? (parseFloat(document.getElementById('sunlightHours').value) || 0) : 0;
    
    const turbineRadius = useWind ? (parseFloat(document.getElementById('turbineRadius').value) || 0) : 0;
    const turbineEfficiency = useWind ? (parseFloat(document.getElementById('turbineEfficiency').value) || 0) : 0;
    const turbineCount = useWind ? (parseFloat(document.getElementById('turbineCount').value) || 0) : 0;
    
    const utilityRate = parseFloat(document.getElementById('utilityRate').value) || 0;
    const exportRate = parseFloat(document.getElementById('exportRate').value) || 0;
    const batteryCapacity = parseFloat(document.getElementById('batteryCapacity').value) || 0;
    const autonomyDays = parseFloat(document.getElementById('autonomyDays').value) || 2;
    
    const systemType = document.querySelector('input[name="systemType"]:checked').value;
    
    // Get weather data
    const windSpeed = currentWeatherData ? currentWeatherData.wind.speed : 5;
    const cloudCover = currentWeatherData ? currentWeatherData.clouds.all : 30;
    
    // Calculate solar generation
    const solar = useSolar ? 
        calculator.calculateSolarGeneration(numPanels, panelWattage, panelEfficiency, sunlightHours, cloudCover) :
        { systemCapacity: 0, numPanels: 0, dailyGeneration: 0, instantPower: 0 };
    
    // Calculate wind generation
    const wind = useWind ?
        calculator.calculateWindGeneration(turbineRadius, turbineEfficiency, windSpeed, turbineCount) :
        { sweptArea: 0, powerPerTurbine: 0, instantPower: 0, dailyGeneration: 0 };
    
    // Calculate household load
    const appliances = getAppliances();
    const load = calculator.calculateLoad(appliances);
    
    // Calculate financials
    const financials = calculator.calculateFinancials(
        solar.dailyGeneration,
        wind.dailyGeneration,
        load.dailyLoad,
        utilityRate,
        exportRate,
        systemType
    );
    
    // Calculate system costs
    const costs = calculator.calculateSystemCosts(
        solar.systemCapacity,
        wind.instantPower,
        batteryCapacity,
        systemType
    );
    
    // Calculate ROI
    const paybackYears = calculator.calculateROI(costs.totalCost, financials.monthlySavings);
    
    // Calculate battery requirements for off-grid
    let batteryReq = null;
    if (systemType === 'off-grid') {
        batteryReq = calculator.calculateBatteryRequirements(load.dailyLoad, autonomyDays);
    }
    
    // Update UI
    updateDashboard(solar, wind, load, financials, costs, paybackYears, batteryReq, batteryCapacity);
    
    // Update visualization
    const netPower = solar.instantPower + wind.instantPower - load.instantLoad;
    let gridPower = 0;
    let batteryPower = 0;
    
    if (systemType === 'on-grid') {
        gridPower = -netPower; // Negative means export, positive means import
    } else {
        batteryPower = netPower; // Positive means charging, negative means discharging
    }
    
    if (visualization) {
        visualization.updateState(
            solar.instantPower,
            wind.instantPower,
            load.instantLoad,
            gridPower,
            batteryPower,
            windSpeed,
            cloudCover,
            systemType
        );
    }
    
    // Update stat boxes
    document.getElementById('solarGen').textContent = `${solar.instantPower.toFixed(2)} kW`;
    document.getElementById('windGen').textContent = `${wind.instantPower.toFixed(2)} kW`;
    document.getElementById('totalLoad').textContent = `${load.instantLoad.toFixed(2)} kW`;
    document.getElementById('netPower').textContent = `${netPower.toFixed(2)} kW`;
    
    console.log('Calculate completed successfully');
    
    } catch (error) {
        console.error('Error in calculate function:', error);
        alert('Calculation error: ' + error.message + '\n\nPlease check the browser console (F12) for details.');
    }
}

function updateDashboard(solar, wind, load, financials, costs, paybackYears, batteryReq, currentBattery) {
    // Daily Energy Flow
    document.getElementById('dailySolar').textContent = `${solar.dailyGeneration.toFixed(2)} kWh`;
    document.getElementById('dailyWind').textContent = `${wind.dailyGeneration.toFixed(2)} kWh`;
    document.getElementById('dailyGeneration').textContent = `${financials.totalGeneration.toFixed(2)} kWh`;
    document.getElementById('dailyConsumption').textContent = `${load.dailyLoad.toFixed(2)} kWh`;
    document.getElementById('netDaily').textContent = `${financials.netDaily.toFixed(2)} kWh`;
    
    // Grid Interaction
    document.getElementById('energyExported').textContent = `${financials.energyExported.toFixed(2)} kWh`;
    document.getElementById('exportEarnings').textContent = `₹${financials.exportEarnings.toFixed(2)}`;
    document.getElementById('energyImported').textContent = `${financials.energyImported.toFixed(2)} kWh`;
    document.getElementById('importCost').textContent = `₹${financials.importCost.toFixed(2)}`;
    document.getElementById('monthlySavings').textContent = `₹${financials.monthlySavings.toFixed(2)}`;
    
    // System Costs & ROI
    document.getElementById('solarCost').textContent = `₹${costs.solarCost.toFixed(0)}`;
    document.getElementById('windCost').textContent = `₹${costs.windCost.toFixed(0)}`;
    document.getElementById('batteryCost').textContent = `₹${costs.batteryCost.toFixed(0)}`;
    document.getElementById('installCost').textContent = `₹${costs.installCost.toFixed(0)}`;
    document.getElementById('totalCost').textContent = `₹${costs.totalCost.toFixed(0)}`;
    document.getElementById('paybackPeriod').textContent = 
        paybackYears === Infinity ? 'N/A' : `${paybackYears.toFixed(1)} years`;
    
    // Battery Storage (off-grid only)
    if (batteryReq) {
        document.getElementById('requiredBattery').textContent = `${batteryReq.requiredCapacity.toFixed(1)} kWh`;
        document.getElementById('currentBattery').textContent = `${currentBattery.toFixed(1)} kWh`;
        
        const status = currentBattery >= batteryReq.requiredCapacity ? 'Adequate ✓' : 'Insufficient ⚠';
        document.getElementById('batteryStatus').textContent = status;
        document.getElementById('batteryStatus').style.color = 
            currentBattery >= batteryReq.requiredCapacity ? '#27ae60' : '#e74c3c';
    }
}
