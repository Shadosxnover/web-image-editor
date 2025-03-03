const filters = {
    grayscale() {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters.push(new fabric.Image.filters.Grayscale());
            activeObject.applyFilters();
            fabricCanvas.renderAll();
        }
    },

    sepia() {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters.push(new fabric.Image.filters.Sepia());
            activeObject.applyFilters();
            fabricCanvas.renderAll();
        }
    },

    brightness(value = 0.1) {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters.push(new fabric.Image.filters.Brightness({
                brightness: value
            }));
            activeObject.applyFilters();
            fabricCanvas.renderAll();
        }
    },

    contrast(value = 0.1) {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters.push(new fabric.Image.filters.Contrast({
                contrast: value
            }));
            activeObject.applyFilters();
            fabricCanvas.renderAll();
        }
    },

    saturation(value = 0.1) {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters.push(new fabric.Image.filters.Saturation({
                saturation: value
            }));
            activeObject.applyFilters();
            fabricCanvas.renderAll();
        }
    },

    blur(value = 0.1) {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters.push(new fabric.Image.filters.Blur({
                blur: value
            }));
            activeObject.applyFilters();
            fabricCanvas.renderAll();
        }
    },

    removeFilter() {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters = [];
            activeObject.applyFilters();
            fabricCanvas.renderAll();
        }
    }
};

// Make filters available globally
window.filters = filters;
