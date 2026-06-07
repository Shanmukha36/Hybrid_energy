// Core calculation engine for renewable energy systems

class EnergyCalculator {
    constructor() {
        this.weatherData = null;
        this.systemData = null;
    }

    // Solar calculations
    calculateSolarGeneration(numPanels, panelWattage, efficiency, sunlightHours, cloudCover = 0) {
        // Total system capacity in kW
        const systemCapacity = (numPanels * panelWattage) / 1000;
        
        // Adjust for efficiency and cloud cover
        const efficiencyFactor = efficiency / 100;
        const cloudFactor = 1 - (cloudCover / 100) * 0.7; // Clouds reduce output by up to 70%
        
        // Daily generation in kWh
        const dailyGeneration = systemCapacity * sunlightHours * efficiencyFactor * cloudFactor;
        
        // Instantaneous power in kW (assuming peak sun)
        const instantPower = systemCapacity * efficiencyFactor * cloudFactor;
        
        return {
            systemCapacity,
            numPanels,
            dailyGeneration,
            instantPower
        };
    }

    // Wind calculations
    calculateWindGeneration(radius, efficiency, windSpeed, numTurbines) {
        // Swept area (m²)
        const sweptArea = Math.PI * radius * radius;
        
        // Air density (kg/m³) at sea level
        const airDensity = 1.225;
        
        // Power in wind (Betz limit: max 59.3% can be extracted)
        const betzLimit = 0.593;
        const efficiencyFactor = (efficiency / 100) * betzLimit;
        
        // Power formula: P = 0.5 * ρ * A * v³ * efficiency
        const powerPerTurbine = 0.5 * airDensity * sweptArea * Math.pow(windSpeed, 3) * efficiencyFactor;
        
        // Total power in kW
        const instantPower = (powerPerTurbine * numTurbines) / 1000;
        
        // Daily generation (assuming constant wind - simplified)
        const dailyGeneration = instantPower * 24;
        
        return {
            sweptArea,
            powerPerTurbine,
            instantPower,
            dailyGeneration
        };
    }

    // Household load calculation
    calculateLoad(appliances) {
        let totalDailyLoad = 0;
        let instantLoad = 0;
        
        appliances.forEach(appliance => {
            const watts = parseFloat(appliance.watts) || 0;
            const hours = parseFloat(appliance.hours) || 0;
            const dailyEnergy = (watts * hours) / 1000; // kWh
            totalDailyLoad += dailyEnergy;
            instantLoad += watts / 1000; // Assume all running simultaneously for worst case
        });
        
        return {
            dailyLoad: totalDailyLoad,
            instantLoad: instantLoad
        };
    }

    // Financial calculations
    calculateFinancials(solarDaily, windDaily, dailyLoad, utilityRate, exportRate, systemType) {
        const totalGeneration = solarDaily + windDaily;
        const netDaily = totalGeneration - dailyLoad;
        
        let energyExported = 0;
        let energyImported = 0;
        let exportEarnings = 0;
        let importCost = 0;
        let monthlySavings = 0;
        
        if (systemType === 'on-grid') {
            if (netDaily > 0) {
                // Surplus - export to grid
                energyExported = netDaily;
                exportEarnings = energyExported * exportRate;
                monthlySavings = (dailyLoad * utilityRate + exportEarnings) * 30;
            } else {
                // Deficit - import from grid
                energyImported = Math.abs(netDaily);
                importCost = energyImported * utilityRate;
                monthlySavings = (dailyLoad - energyImported) * utilityRate * 30;
            }
        } else {
            // Off-grid - all generation used, no import/export
            monthlySavings = Math.min(totalGeneration, dailyLoad) * utilityRate * 30;
        }
        
        return {
            totalGeneration,
            netDaily,
            energyExported,
            energyImported,
            exportEarnings,
            importCost,
            monthlySavings
        };
    }

    // System cost estimation (in Indian Rupees)
    calculateSystemCosts(solarCapacity, windCapacity, batteryCapacity, systemType) {
        // Cost per kW installed (in INR)
        const solarCostPerKW = 40000; // ₹40,000/kW (approx $500/kW)
        const windCostPerKW = 60000; // ₹60,000/kW (approx $750/kW)
        const batteryCostPerKWh = 20000; // ₹20,000/kWh (approx $250/kWh)
        
        const solarCost = solarCapacity * solarCostPerKW;
        const windCost = windCapacity * windCostPerKW;
        const batteryCost = systemType === 'off-grid' ? batteryCapacity * batteryCostPerKWh : 0;
        
        const subtotal = solarCost + windCost + batteryCost;
        const installCost = subtotal * 0.2; // 20% installation
        const totalCost = subtotal + installCost;
        
        return {
            solarCost,
            windCost,
            batteryCost,
            installCost,
            totalCost
        };
    }

    // ROI calculation
    calculateROI(totalCost, monthlySavings) {
        if (monthlySavings <= 0) return Infinity;
        const annualSavings = monthlySavings * 12;
        const paybackYears = totalCost / annualSavings;
        return paybackYears;
    }

    // Battery sizing for off-grid
    calculateBatteryRequirements(dailyLoad, autonomyDays, systemVoltage = 48) {
        // Required capacity in kWh
        const requiredCapacity = dailyLoad * autonomyDays;
        
        // Add depth of discharge factor (typically 80% for lithium)
        const dod = 0.8;
        const actualCapacity = requiredCapacity / dod;
        
        // Convert to Ah
        const capacityAh = (actualCapacity * 1000) / systemVoltage;
        
        return {
            requiredCapacity: actualCapacity,
            capacityAh
        };
    }

    // Get sun hours based on solar irradiance
    getSunHoursFromIrradiance(irradiance) {
        // Convert W/m² to equivalent sun hours
        // 1000 W/m² = 1 sun hour
        return irradiance / 1000 * 8; // Approximate daily hours
    }
}

// Export for use in other files
const calculator = new EnergyCalculator();
