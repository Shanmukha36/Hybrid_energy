// Advanced canvas-based energy flow visualization with animations

class EnergyVisualization {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.animationFrame = null;
        this.particles = [];
        this.time = 0;
        
        // System state
        this.solarPower = 0;
        this.windPower = 0;
        this.housePower = 0;
        this.gridPower = 0;
        this.batteryPower = 0;
        this.windSpeed = 0;
        this.cloudCover = 0;
        this.systemType = 'on-grid';
        
        // Turbine animation
        this.turbineAngle = 0;
        
        this.setupCanvas();
        this.animate();
    }
    
    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.width = rect.width;
        this.height = rect.height;
    }
    
    updateState(solar, wind, house, grid, battery, windSpeed, cloudCover, systemType) {
        this.solarPower = solar;
        this.windPower = wind;
        this.housePower = house;
        this.gridPower = grid;
        this.batteryPower = battery;
        this.windSpeed = windSpeed;
        this.cloudCover = cloudCover;
        this.systemType = systemType;
    }
    
    animate() {
        this.time += 0.016;
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw components
        this.drawSun();
        this.drawSolarPanels();
        this.drawWindTurbine();
        this.drawHouse();
        
        if (this.systemType === 'on-grid') {
            this.drawGrid();
        } else {
            this.drawBattery();
        }
        
        // Draw energy flows
        this.drawEnergyFlows();
        
        // Update particles
        this.updateParticles();
        
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    drawSun() {
        const sunX = this.width * 0.15;
        const sunY = this.height * 0.15;
        const sunRadius = 30;
        
        // Sun brightness based on cloud cover
        const brightness = 1 - (this.cloudCover / 100) * 0.6;
        
        // Sun glow
        const gradient = this.ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * 2);
        gradient.addColorStop(0, `rgba(255, 220, 0, ${brightness})`);
        gradient.addColorStop(0.5, `rgba(255, 200, 0, ${brightness * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 200, 0, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(sunX, sunY, sunRadius * 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Sun core
        this.ctx.fillStyle = `rgba(255, 220, 0, ${brightness})`;
        this.ctx.beginPath();
        this.ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Clouds
        if (this.cloudCover > 20) {
            this.drawClouds(sunX, sunY);
        }
    }
    
    drawClouds(sunX, sunY) {
        const cloudAlpha = Math.min(this.cloudCover / 100, 0.7);
        this.ctx.fillStyle = `rgba(200, 200, 220, ${cloudAlpha})`;
        
        // Draw multiple cloud puffs
        const cloudX = sunX + 20;
        const cloudY = sunY - 10;
        
        this.ctx.beginPath();
        this.ctx.arc(cloudX, cloudY, 25, 0, Math.PI * 2);
        this.ctx.arc(cloudX + 20, cloudY, 20, 0, Math.PI * 2);
        this.ctx.arc(cloudX + 35, cloudY + 5, 22, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawSolarPanels() {
        const panelX = this.width * 0.15;
        const panelY = this.height * 0.45;
        const panelWidth = 80;
        const panelHeight = 50;
        
        // Panel frame
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillRect(panelX - panelWidth/2, panelY - panelHeight/2, panelWidth, panelHeight);
        
        // Panel cells with glow effect
        const cellGlow = this.solarPower > 0 ? 0.3 : 0;
        this.ctx.fillStyle = `rgba(52, 152, 219, ${0.8 + cellGlow})`;
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                const cellX = panelX - panelWidth/2 + 5 + j * 18;
                const cellY = panelY - panelHeight/2 + 5 + i * 14;
                this.ctx.fillRect(cellX, cellY, 15, 11);
            }
        }
        
        // Label
        this.ctx.fillStyle = '#333';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Solar', panelX, panelY + panelHeight/2 + 15);
        this.ctx.fillText(`${this.solarPower.toFixed(1)} kW`, panelX, panelY + panelHeight/2 + 28);
    }
    
    drawWindTurbine() {
        const turbineX = this.width * 0.35;
        const turbineY = this.height * 0.35;
        
        // Tower
        this.ctx.fillStyle = '#95a5a6';
        this.ctx.fillRect(turbineX - 3, turbineY, 6, 80);
        
        // Nacelle
        this.ctx.fillStyle = '#7f8c8d';
        this.ctx.fillRect(turbineX - 8, turbineY - 5, 16, 10);
        
        // Rotate blades based on wind speed
        this.turbineAngle += this.windSpeed * 0.02;
        
        this.ctx.save();
        this.ctx.translate(turbineX, turbineY);
        this.ctx.rotate(this.turbineAngle);
        
        // Draw 3 blades
        for (let i = 0; i < 3; i++) {
            this.ctx.save();
            this.ctx.rotate((i * Math.PI * 2) / 3);
            
            // Blade
            this.ctx.fillStyle = '#ecf0f1';
            this.ctx.beginPath();
            this.ctx.ellipse(0, -25, 8, 25, 0, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.strokeStyle = '#bdc3c7';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            
            this.ctx.restore();
        }
        
        // Center hub
        this.ctx.fillStyle = '#34495e';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 6, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
        
        // Label
        this.ctx.fillStyle = '#333';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Wind', turbineX, turbineY + 95);
        this.ctx.fillText(`${this.windPower.toFixed(1)} kW`, turbineX, turbineY + 108);
    }
    
    drawHouse() {
        const houseX = this.width * 0.75;
        const houseY = this.height * 0.5;
        const houseWidth = 70;
        const houseHeight = 60;
        
        // House body
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fillRect(houseX - houseWidth/2, houseY - houseHeight/2, houseWidth, houseHeight);
        
        // Roof
        this.ctx.fillStyle = '#c0392b';
        this.ctx.beginPath();
        this.ctx.moveTo(houseX - houseWidth/2 - 5, houseY - houseHeight/2);
        this.ctx.lineTo(houseX, houseY - houseHeight/2 - 25);
        this.ctx.lineTo(houseX + houseWidth/2 + 5, houseY - houseHeight/2);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Windows with light
        const windowGlow = this.housePower > 0 ? 'rgba(255, 220, 100, 0.9)' : 'rgba(100, 150, 200, 0.5)';
        this.ctx.fillStyle = windowGlow;
        this.ctx.fillRect(houseX - 25, houseY - 15, 15, 15);
        this.ctx.fillRect(houseX + 10, houseY - 15, 15, 15);
        
        // Door
        this.ctx.fillStyle = '#8b4513';
        this.ctx.fillRect(houseX - 8, houseY + 10, 16, 20);
        
        // Label
        this.ctx.fillStyle = '#333';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('House', houseX, houseY + houseHeight/2 + 15);
        this.ctx.fillText(`${this.housePower.toFixed(1)} kW`, houseX, houseY + houseHeight/2 + 28);
    }
    
    drawGrid() {
        const gridX = this.width * 0.85;
        const gridY = this.height * 0.25;
        
        // Grid tower
        this.ctx.strokeStyle = '#34495e';
        this.ctx.lineWidth = 3;
        
        // Tower structure
        this.ctx.beginPath();
        this.ctx.moveTo(gridX - 20, gridY + 40);
        this.ctx.lineTo(gridX, gridY - 20);
        this.ctx.lineTo(gridX + 20, gridY + 40);
        this.ctx.stroke();
        
        // Cross beams
        this.ctx.beginPath();
        this.ctx.moveTo(gridX - 25, gridY);
        this.ctx.lineTo(gridX + 25, gridY);
        this.ctx.stroke();
        
        // Power lines
        this.ctx.strokeStyle = '#7f8c8d';
        this.ctx.lineWidth = 2;
        for (let i = -1; i <= 1; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(gridX + i * 15, gridY);
            this.ctx.lineTo(gridX + i * 15 + 30, gridY - 10);
            this.ctx.stroke();
        }
        
        // Label
        this.ctx.fillStyle = '#333';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Grid', gridX, gridY + 55);
        const gridLabel = this.gridPower > 0 ? `Import ${this.gridPower.toFixed(1)} kW` : `Export ${Math.abs(this.gridPower).toFixed(1)} kW`;
        this.ctx.fillText(gridLabel, gridX, gridY + 68);
    }
    
    drawBattery() {
        const batteryX = this.width * 0.85;
        const batteryY = this.height * 0.3;
        const batteryWidth = 50;
        const batteryHeight = 70;
        
        // Battery outline
        this.ctx.strokeStyle = '#34495e';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(batteryX - batteryWidth/2, batteryY - batteryHeight/2, batteryWidth, batteryHeight);
        
        // Battery terminal
        this.ctx.fillStyle = '#34495e';
        this.ctx.fillRect(batteryX - 10, batteryY - batteryHeight/2 - 5, 20, 5);
        
        // Battery charge level
        const chargeLevel = Math.abs(this.batteryPower) / 10; // Simplified
        const chargeFill = Math.min(chargeLevel, 1);
        
        const gradient = this.ctx.createLinearGradient(0, batteryY + batteryHeight/2, 0, batteryY - batteryHeight/2);
        gradient.addColorStop(0, '#27ae60');
        gradient.addColorStop(0.5, '#2ecc71');
        gradient.addColorStop(1, '#27ae60');
        
        this.ctx.fillStyle = gradient;
        const fillHeight = batteryHeight * chargeFill;
        this.ctx.fillRect(batteryX - batteryWidth/2 + 3, batteryY + batteryHeight/2 - fillHeight - 3, batteryWidth - 6, fillHeight);
        
        // Label
        this.ctx.fillStyle = '#333';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Battery', batteryX, batteryY + batteryHeight/2 + 15);
        const batteryLabel = this.batteryPower > 0 ? `Charging ${this.batteryPower.toFixed(1)} kW` : `Discharging ${Math.abs(this.batteryPower).toFixed(1)} kW`;
        this.ctx.fillText(batteryLabel, batteryX, batteryY + batteryHeight/2 + 28);
    }
    
    drawEnergyFlows() {
        // Solar to House
        if (this.solarPower > 0) {
            this.createEnergyFlow(this.width * 0.15, this.height * 0.45, this.width * 0.75, this.height * 0.5, '#f39c12', this.solarPower);
        }
        
        // Wind to House
        if (this.windPower > 0) {
            this.createEnergyFlow(this.width * 0.35, this.height * 0.35, this.width * 0.75, this.height * 0.5, '#3498db', this.windPower);
        }
        
        // Grid/Battery flows
        if (this.systemType === 'on-grid') {
            if (this.gridPower > 0) {
                // Import from grid
                this.createEnergyFlow(this.width * 0.85, this.height * 0.25, this.width * 0.75, this.height * 0.5, '#e74c3c', this.gridPower);
            } else if (this.gridPower < 0) {
                // Export to grid
                this.createEnergyFlow(this.width * 0.75, this.height * 0.5, this.width * 0.85, this.height * 0.25, '#27ae60', Math.abs(this.gridPower));
            }
        } else {
            if (this.batteryPower > 0) {
                // Charging battery
                this.createEnergyFlow(this.width * 0.75, this.height * 0.5, this.width * 0.85, this.height * 0.3, '#27ae60', this.batteryPower);
            } else if (this.batteryPower < 0) {
                // Discharging battery
                this.createEnergyFlow(this.width * 0.85, this.height * 0.3, this.width * 0.75, this.height * 0.5, '#f39c12', Math.abs(this.batteryPower));
            }
        }
    }
    
    createEnergyFlow(x1, y1, x2, y2, color, power) {
        // Draw wire
        this.ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        
        // Create particles based on power
        const particleCount = Math.ceil(power * 2);
        if (Math.random() < 0.3 && this.particles.length < 100) {
            for (let i = 0; i < Math.min(particleCount, 3); i++) {
                this.particles.push({
                    x: x1,
                    y: y1,
                    targetX: x2,
                    targetY: y2,
                    progress: Math.random() * 0.2,
                    speed: 0.01 + Math.random() * 0.01,
                    color: color,
                    size: 3 + Math.random() * 3
                });
            }
        }
    }
    
    updateParticles() {
        this.particles = this.particles.filter(particle => {
            particle.progress += particle.speed;
            
            if (particle.progress >= 1) {
                return false;
            }
            
            // Calculate current position
            const x = particle.x + (particle.targetX - particle.x) * particle.progress;
            const y = particle.y + (particle.targetY - particle.y) * particle.progress;
            
            // Draw particle with glow
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, particle.size * 2);
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(0.5, particle.color + '80');
            gradient.addColorStop(1, particle.color + '00');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, particle.size * 2, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw core
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(x, y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            return true;
        });
    }
    
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Initialize visualization
let visualization;
window.addEventListener('DOMContentLoaded', () => {
    visualization = new EnergyVisualization('energyCanvas');
});
