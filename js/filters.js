// filters.js - Filter implementations
const filters = {
    grayscale() {
        const activeObject = canvas.getActiveObjects()[0];
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters.push(new fabric.Image.filters.Grayscale());
            activeObject.applyFilters();
            canvas.renderAll();
        } else if (canvas.backgroundImage) {
            canvas.backgroundImage.filters.push(new fabric.Image.filters.Grayscale());
            canvas.backgroundImage.applyFilters();
            canvas.renderAll();
        }
    },

    sepia() {
        const activeObject = canvas.getActiveObjects()[0];
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters.push(new fabric.Image.filters.Sepia());
            activeObject.applyFilters();
            canvas.renderAll();
        } else if (canvas.backgroundImage) {
            canvas.backgroundImage.filters.push(new fabric.Image.filters.Sepia());
            canvas.backgroundImage.applyFilters();
            canvas.renderAll();
        }
    },

    invert() {
        const activeObject = canvas.getActiveObjects()[0];
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters.push(new fabric.Image.filters.Invert());
            activeObject.applyFilters();
            canvas.renderAll();
        } else if (canvas.backgroundImage) {
            canvas.backgroundImage.filters.push(new fabric.Image.filters.Invert());
            canvas.backgroundImage.applyFilters();
            canvas.renderAll();
        }
    },

    vintage() { // Alias for Sepia + slight adjustments (Fabric.js doesn’t have a direct "vintage" filter)
        const activeObject = canvas.getActiveObjects()[0];
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters.push(new fabric.Image.filters.Sepia());
            activeObject.filters.push(new fabric.Image.filters.Brightness({ brightness: 0.05 }));
            activeObject.applyFilters();
            canvas.renderAll();
        } else if (canvas.backgroundImage) {
            canvas.backgroundImage.filters.push(new fabric.Image.filters.Sepia());
            canvas.backgroundImage.filters.push(new fabric.Image.filters.Brightness({ brightness: 0.05 }));
            canvas.backgroundImage.applyFilters();
            canvas.renderAll();
        }
    },

    blur(value = 0.1) {
        const activeObject = canvas.getActiveObjects()[0];
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters.push(new fabric.Image.filters.Blur({ blur: value }));
            activeObject.applyFilters();
            canvas.renderAll();
        } else if (canvas.backgroundImage) {
            canvas.backgroundImage.filters.push(new fabric.Image.filters.Blur({ blur: value }));
            canvas.backgroundImage.applyFilters();
            canvas.renderAll();
        }
    },

    sharpen() { // Fabric.js doesn’t have a direct sharpen filter, so we simulate with Convolute
        const activeObject = canvas.getActiveObjects()[0];
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters.push(new fabric.Image.filters.Convolute({
                matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0] // Simple sharpening kernel
            }));
            activeObject.applyFilters();
            canvas.renderAll();
        } else if (canvas.backgroundImage) {
            canvas.backgroundImage.filters.push(new fabric.Image.filters.Convolute({
                matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0]
            }));
            canvas.backgroundImage.applyFilters();
            canvas.renderAll();
        }
    },

    brightness(value = 0.1) {
        const activeObject = canvas.getActiveObjects()[0];
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters.push(new fabric.Image.filters.Brightness({ brightness: value }));
            activeObject.applyFilters();
            canvas.renderAll();
        } else if (canvas.backgroundImage) {
            canvas.backgroundImage.filters.push(new fabric.Image.filters.Brightness({ brightness: value }));
            canvas.backgroundImage.applyFilters();
            canvas.renderAll();
        }
    },

    removeFilter() {
        const activeObject = canvas.getActiveObjects()[0];
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters = [];
            activeObject.applyFilters();
            canvas.renderAll();
        } else if (canvas.backgroundImage) {
            canvas.backgroundImage.filters = [];
            canvas.backgroundImage.applyFilters();
            canvas.renderAll();
        }
    }
};

window.filters = filters;