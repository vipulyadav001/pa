document.addEventListener('DOMContentLoaded', function() {
    // Create dynamic blood drip effect
    function createBloodDrip() {
        const bloodContainer = document.querySelector('.blood-container');
        const drop = document.createElement('div');
        drop.className = 'blood-drop';
        drop.style.left = `20%`;  // Fixed position for consistent drops
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
});
