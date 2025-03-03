document.addEventListener('DOMContentLoaded', () => {
    window.canvas = new fabric.Canvas('canvas', {
        backgroundColor: '#ffffff',
        preserveObjectStacking: true,
        width: 800,
        height: 600
    });
    
    resizeCanvas();
    
    initEvents();
    
    window.addEventListener('resize', resizeCanvas);
});
