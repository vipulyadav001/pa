function getAverageColor(canvas, context) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let r = 0, g = 0, b = 0;
    
    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }
    
    const count = data.length / 4;
    return {
        r: Math.round(r / count),
        g: Math.round(g / count),
        b: Math.round(b / count)
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // Create canvas for color sampling
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 50;  // Small size for performance
    canvas.height = 50;
    
    // Create ambient light element
    const ambientLight = document.createElement('div');
    ambientLight.className = 'ambient-light';
    document.querySelector('.content').appendChild(ambientLight);
    
    // Create video element for color sampling
    const videoElement = document.createElement('video');
    videoElement.style.display = 'none';
    document.body.appendChild(videoElement);
    
    // Sample colors from video periodically
    setInterval(() => {
        try {
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const color = getAverageColor(canvas, context);
            // Enhance the colors to make them more vibrant
            const enhancedColor = {
                r: Math.min(255, color.r * 1.5),
                g: Math.min(255, color.g * 1.5),
                b: Math.min(255, color.b * 1.5)
            };
            ambientLight.style.backgroundColor = `rgb(${enhancedColor.r}, ${enhancedColor.g}, ${enhancedColor.b})`;
            // Add a subtle pulse effect
            ambientLight.style.transform = `scale(${1 + Math.sin(Date.now() / 1000) * 0.05})`;
        } catch (e) {
            // Ignore errors when video isn't ready
        }
    }, 100);  // Update every 100ms
    // Create dynamic blood drip effect
    function createBloodDrip() {
        const bloodContainer = document.querySelector('.blood-container');
        const drop = document.createElement('div');
        drop.className = 'blood-drop';
        // Randomly choose left or right side
        const side = Math.random() < 0.5 ? 'left' : 'right';
        if (side === 'left') {
            drop.style.left = '5%';
        } else {
            drop.style.right = '5%';
        }
        drop.style.animationDuration = `6s`;
        bloodContainer.appendChild(drop);
        
        // Remove the drop after animation
        drop.addEventListener('animationend', () => {
            drop.remove();
        });
    }

    // Create blood drips periodically
    setInterval(createBloodDrip, 3000);

    // Add initial blood drips
    for (let i = 0; i < 2; i++) {
        setTimeout(createBloodDrip, i * 3000);
    }

    // Add heartbeat flash effect
    function createHeartbeatFlash() {
        const flash = document.createElement('div');
        flash.className = 'heartbeat-flash';
        document.body.appendChild(flash);
        
        // Trigger animation
        flash.style.animation = 'heartbeat-flash 1s ease-out forwards';
        
        // Remove element after animation
        setTimeout(() => {
            flash.remove();
        }, 1000);
    }

    // Randomly trigger heartbeat flashes
    function scheduleNextHeartbeat() {
        const minDelay = 3000;  // Minimum 3 seconds
        const maxDelay = 8000;  // Maximum 8 seconds
        const delay = Math.random() * (maxDelay - minDelay) + minDelay;
        
        setTimeout(() => {
            createHeartbeatFlash();
            scheduleNextHeartbeat();  // Schedule next flash
        }, delay);
    }

    // Start the random heartbeat flashes
    scheduleNextHeartbeat();
});
