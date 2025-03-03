// app.js - Main entry point
document.addEventListener('DOMContentLoaded', () => {
    // Initialize global canvas reference
    window.canvas = new fabric.Canvas('canvas', {
        backgroundColor: '#ffffff',
        preserveObjectStacking: true,
        width: 800,  // Add default width
        height: 600  // Add default height
    });
    
    // Set initial canvas dimensions
    resizeCanvas();
    
    // Initialize all event handlers
    initEvents();
    
    // Make canvas responsive
    window.addEventListener('resize', resizeCanvas);
});