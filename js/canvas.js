// canvas.js - Canvas handling functions
function resizeCanvas() {
    if (!window.canvas) return;  // Add this check
    
    const container = document.getElementById('canvas-container');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    canvas.setDimensions({
        width: containerWidth - 16,
        height: containerHeight - 16
    });
    
    if (canvas.backgroundImage) {
        fitImageToCanvas();
    }
}

// Make sure fitImageToCanvas has access to canvas
function fitImageToCanvas() {
    if (!window.canvas || !canvas.backgroundImage) return;
    
    const img = canvas.backgroundImage;
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;
    
    let scale;
    if (imgRatio > canvasRatio) {
        // Image is wider than canvas (relative to height)
        scale = (canvasWidth * 0.9) / img.width;
    } else {
        // Image is taller than canvas (relative to width)
        scale = (canvasHeight * 0.9) / img.height;
    }
    
    img.scale(scale);
    
    canvas.centerObject(img);
    canvas.renderAll();
    
    // Update image info
    const scaledWidth = Math.round(img.width * scale);
    const scaledHeight = Math.round(img.height * scale);
    document.getElementById('image-info').textContent = 
        `Image: ${scaledWidth}×${scaledHeight} px (${Math.round(scale * 100)}%)`;
        
    // Update zoom dropdown
    document.getElementById('zoom-level').value = scale.toFixed(2);
}