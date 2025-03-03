let canvas;
let fabricCanvas;

function initCanvas() {
    canvas = document.getElementById('canvas');
    fabricCanvas = new fabric.Canvas('canvas', {
        width: 800,
        height: 600,
        backgroundColor: '#f3f4f6'
    });

    // Make canvas responsive
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
}

function resizeCanvas() {
    const container = fabricCanvas.wrapperEl.parentNode;
    const ratio = fabricCanvas.width / fabricCanvas.height;
    const containerWidth = container.offsetWidth;
    const scale = containerWidth / fabricCanvas.width;
    const zoom = scale;

    fabricCanvas.setWidth(containerWidth);
    fabricCanvas.setHeight(containerWidth / ratio);
    fabricCanvas.setZoom(zoom);
    fabricCanvas.renderAll();
}
