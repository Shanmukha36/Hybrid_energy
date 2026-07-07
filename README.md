# ⚡ Hybrid Renewable Energy System Calculator

A modern, interactive web application for designing and analyzing **Hybrid Renewable Energy Systems (Solar + Wind)**. The platform enables users to estimate renewable energy generation, analyze household energy consumption, evaluate financial feasibility, and visualize real-time power flow through immersive animations.

---

## 🌍 Project Overview

The **Hybrid Renewable Energy System Calculator** helps homeowners, students, researchers, and renewable energy enthusiasts evaluate the performance and cost-effectiveness of renewable energy installations.

The application combines:

* ☀️ Solar Energy Generation
* 🌬️ Wind Energy Generation
* 🔋 Battery Storage Planning
* ⚡ Smart Grid Interaction
* 💰 Cost & ROI Analysis
* 🌤️ Live Weather Integration
* 🎨 Real-Time Energy Flow Visualization

All calculations run directly in the browser using **HTML, CSS, and JavaScript**, requiring no backend infrastructure.

---

# ✨ Key Features

## 🎨 Interactive Renewable Energy Visualization

Experience renewable energy like never before through dynamic animations.

### Real-Time Energy Flow

* Animated particles represent power movement.
* Visual indication of generation, storage, and consumption.
* Smart grid direction indicators.

### Animated Wind Turbines

* Turbines rotate according to live wind speed.
* Higher wind speeds result in faster rotations.

### Dynamic Solar Effects

* Sun intensity changes based on weather conditions.
* Cloud cover directly affects solar generation.

### Adaptive UI Environment

* Ambient lighting adjusts automatically.
* Weather-responsive visual themes.

---

# ⚡ Energy Calculation Modules

## ☀️ Solar Energy Calculator

Calculate solar energy production using:

* Roof area
* Solar panel wattage
* Panel efficiency
* Sunlight hours
* Cloud cover adjustments

### Formula

```text
System Capacity (kW)
= (Roof Area / Panel Area) × Panel Wattage / 1000

Daily Generation (kWh)
= Capacity × Sunlight Hours × Efficiency × Cloud Factor
```

---

## 🌬️ Wind Energy Calculator

Estimate wind energy output based on:

* Turbine radius
* Wind speed
* Air density
* Turbine efficiency
* Number of turbines

### Formula

```text
Swept Area (m²)
= π × Radius²

Power Output (kW)
= 0.5 × Air Density × Area × Wind Speed³ × Efficiency / 1000
```

---

## 🏠 Household Load Calculator

Estimate daily electricity consumption by adding appliances such as:

* Lights
* Fans
* Refrigerators
* Air Conditioners
* TVs
* Washing Machines
* Computers
* Custom Appliances

### Output

* Daily Consumption (kWh)
* Monthly Consumption (kWh)
* Annual Consumption (kWh)

---

## ⚡ Hybrid System Planning

Combine solar and wind systems for improved reliability.

Benefits:

* Increased energy availability
* Reduced grid dependency
* Better seasonal performance
* Enhanced system resilience

---

# 💰 Financial Analysis Dashboard

## Net Metering Analysis

Track:

* Exported Energy
* Imported Energy
* Utility Charges
* Renewable Energy Credits

### Formula

```text
Export Earnings
= Excess Energy × Export Rate

Import Cost
= Deficit Energy × Utility Rate
```

---

## ROI Calculator

Estimate:

* Initial Investment
* Annual Savings
* Monthly Savings
* Payback Period

### Formula

```text
Payback Period
= Total Investment / Annual Savings
```

---

## Hardware Cost Breakdown

Detailed estimates for:

### Solar System

* Solar Panels
* Mounting Structure
* Inverter
* Installation

### Wind System

* Wind Turbines
* Towers
* Controllers
* Installation

### Battery Storage

* Battery Bank
* Charge Controller
* Monitoring Systems

---

# 🔋 System Modes

## 1. On-Grid Mode

Features:

* Export excess electricity to the utility grid
* Import energy when generation is insufficient
* Net metering support
* Reduced electricity bills

---

## 2. Off-Grid Mode

Features:

* Complete energy independence
* Battery storage calculations
* Backup autonomy planning
* Energy security for remote locations

### Battery Sizing Formula

```text
Required Capacity (kWh)
= Daily Load × Autonomy Days / Depth of Discharge
```

---

# 🌤️ Live Weather Integration

Powered by OpenWeatherMap API.

Weather data influences:

* Solar generation
* Wind generation
* Environmental animations
* UI lighting effects

### Real-Time Parameter's

* Temperature
* Humidity
* Cloud Cover
* Wind Speed
* Weather Conditions

---

# 🛠️ Technology Stack

| Technology         | Purpose           |
| ------------------ | ----------------- |
| HTML5              | Structure         |
| CSS3               | Styling           |
| JavaScript (ES6+)  | Application Logic |
| Canvas API         | Animations        |
| OpenWeatherMap API | Weather Data      |

---

# 📂 Project Structure

```bash
Hybrid-Renewable-Energy-System/
│
├── index.html
├── styles.css
├── app.js
├── calculator.js
├── visualization.js
└── README.md
```

### File Description

| File             | Description                          |
| ---------------- | ------------------------------------ |
| index.html       | Main application layout              |
| styles.css       | UI styling and responsiveness        |
| app.js           | Weather API integration and controls |
| calculator.js    | Renewable energy calculation engine  |
| visualization.js | Real-time animation engine           |
| README.md        | Project documentation                |

---

# 🚀 Installation & Setup

## Step 1: Clone Repository

```bash
git clone https://github.com/Shanmukha36/hybrid-renewable-energy-system.git

cd hybrid-renewable-energy-system
```

---

## Step 2: Get OpenWeatherMap API Key

1. Create a free account.
2. Generate an API key.
3. Copy the API key.

Website:

https://openweathermap.org/api

---

## Step 3: Configure API Key

Open:

```javascript
app.js
```

Replace:

```javascript
const WEATHER_API_KEY = 'YOUR_API_KEY_HERE';
```

with:

```javascript
const WEATHER_API_KEY = 'YOUR_ACTUAL_API_KEY';
```

---

## Step 4: Run Application

### Direct Method

Open:

```bash
index.html
```

in any modern browser.

---

### Local Development Server

Using Python:

```bash
python -m http.server 8000
```

Using Node.js:

```bash
npx http-server
```

Visit:

```text
http://localhost:8000
```

---

# 🧪 Default Test Location

### Koduru, Andhra Pradesh, India

Approximate Coordinates:

```text
Latitude: 15.3°N
Longitude: 79.0°E
```

Characteristics:

* High solar potential
* Moderate wind availability
* Suitable for hybrid renewable systems

---

# 📊 Outputs Generated

The application provides:

### Energy Metrics

* Solar Generation
* Wind Generation
* Total Renewable Generation
* Daily Consumption

### Financial Metrics

* Monthly Savings
* Annual Savings
* Grid Revenue
* ROI
* Payback Period

### Storage Metrics

* Battery Capacity
* Backup Duration
* Autonomy Days

---

# 🎯 Use Cases

This project is ideal for:

* Engineering Students
* Renewable Energy Researchers
* Homeowners
* Energy Consultants
* Sustainability Enthusiasts
* Academic Demonstrations
* Smart Grid Simulations

---

# 🔮 Future Enhancements

Planned improvements:

* Historical Weather Analytics
* AI-Based Energy Prediction
* Solar Panel Tilt Optimization
* Seasonal Performance Analysis
* Multi-City Comparison
* PDF Report Generation
* Battery Health Monitoring
* Carbon Footprint Reduction Calculator
* Energy Demand Forecasting

---

# 📱 Browser Support

| Browser         | Support |
| --------------- | ------- |
| Google Chrome   | ✅       |
| Microsoft Edge  | ✅       |
| Mozilla Firefox | ✅       |
| Safari          | ✅       |
| Mobile Browsers | ✅       |

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

Feel free to use, modify, and distribute it for educational and commercial purposes.

---

# 🙏 Acknowledgements

* OpenWeatherMap API
* Renewable Energy Engineering Standards
* Modern Web Technologies (HTML, CSS, JavaScript)

---

# ⭐ Support

If you find this project useful:

⭐ Star the repository

🍴 Fork the project

📢 Share it with others

Your support helps improve the project and encourages further development.

---

### Built with ❤️ for a Sustainable and Renewable Future 🌱
