function initEvents() {
    document.getElementById('uploadBtn').addEventListener('click', function() {
        document.getElementById('imageUpload').click();
    });
    
    document.getElementById('upload-placeholder').addEventListener('click', function() {
        document.getElementById('imageUpload').click();
    });
    
    document.getElementById('imageUpload').addEventListener('change', function(e) {
        if (e.target.files.length === 0) return;
        
        const file = e.target.files[0];
        if (!file.type.match('image.*')) {
            alert('Please select an image file.');
            return;
        }
        
        tools.uploadImage(file);
    });
    
    document.getElementById('zoomInBtn').addEventListener('click', function() {
        if (!canvas.backgroundImage) return;
        
        const img = canvas.backgroundImage;
        img.scale(img.scaleX * 1.2);
        canvas.renderAll();
        
        const scaledWidth = Math.round(img.width * img.scaleX);
        const scaledHeight = Math.round(img.height * img.scaleY);
        document.getElementById('image-info').textContent = 
            `Image: ${scaledWidth}×${scaledHeight} px (${Math.round(img.scaleX * 100)}%)`;
    });
    
    document.getElementById('zoomOutBtn').addEventListener('click', function() {
        if (!canvas.backgroundImage) return;
        
        const img = canvas.backgroundImage;
        img.scale(img.scaleX * 0.8);
        canvas.renderAll();
        
        const scaledWidth = Math.round(img.width * img.scaleX);
        const scaledHeight = Math.round(img.height * img.scaleY);
        document.getElementById('image-info').textContent = 
            `Image: ${scaledWidth}×${scaledHeight} px (${Math.round(img.scaleX * 100)}%)`;
    });
    
    document.getElementById('fitScreenBtn').addEventListener('click', function() {
        if (!canvas.backgroundImage) return;
        fitImageToCanvas();
    });
    
    document.getElementById('zoom-level').addEventListener('change', function() {
        if (!canvas.backgroundImage) return;
        
        const scale = parseFloat(this.value);
        const img = canvas.backgroundImage;
        img.scale(scale);
        
        canvas.centerObject(img);
        canvas.renderAll();
        
        const scaledWidth = Math.round(img.width * scale);
        const scaledHeight = Math.round(img.height * scale);
        document.getElementById('image-info').textContent = 
            `Image: ${scaledWidth}×${scaledHeight} px (${Math.round(scale * 100)}%)`;
    });
    
    let cropRect = null;
    document.getElementById('cropBtn').addEventListener('click', function() {
        if (!cropRect) {
            cropRect = tools.initCrop();
            if (cropRect) {
                this.classList.add('bg-blue-100');
            }
        } else {
            tools.applyCrop(cropRect);
            cropRect = null;
            this.classList.remove('bg-blue-100');
        }
    });
    
    document.getElementById('resizeBtn').addEventListener('click', function() {
        const img = canvas.backgroundImage;
        if (!img) {
            alert('Please upload an image first');
            return;
        }
        
        const currentWidth = Math.round(img.width * img.scaleX);
        const currentHeight = Math.round(img.height * img.scaleY);
        
        const width = prompt('Enter width (px):', currentWidth);
        if (!width) return;
        
        const height = prompt('Enter height (px):', currentHeight);
        if (!height) return;
        
        tools.resizeImage(parseInt(width), parseInt(height));
    });
    
    document.getElementById('rotateBtn').addEventListener('click', function() {
        if (!canvas.backgroundImage) {
            alert('Please upload an image first');
            return;
        }
        
        const img = canvas.backgroundImage;
        img.rotate((img.angle || 0) + 90);
        canvas.renderAll();
    });
    
    document.getElementById('textBtn').addEventListener('click', function() {
        tools.addText();
    });
    
    document.getElementById('emojiBtn').addEventListener('click', function() {
        tools.addEmoji();
    });
    
    document.getElementById('drawBtn').addEventListener('click', function() {
        const isActive = this.classList.contains('bg-blue-100');
        
        tools.setDrawingMode(!isActive);
        
        this.classList.toggle('bg-blue-100', !isActive);
        document.getElementById('eraserBtn').classList.remove('bg-blue-100');
    });
    
    document.getElementById('eraserBtn').addEventListener('click', function() {
        const isActive = this.classList.contains('bg-blue-100');
        
        tools.setEraserMode(!isActive);
        
        this.classList.toggle('bg-blue-100', !isActive);
        document.getElementById('drawBtn').classList.remove('bg-blue-100');
    });
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filterType = btn.dataset.filter;
            if (filterType === 'none') {
                filters.removeFilter();
            } else if (filters[filterType]) {
                filters[filterType]();
            } else {
                console.warn(`Filter "${filterType}" not implemented yet.`);
            }
        });
    });
    
    document.getElementById('downloadBtn').addEventListener('click', function() {
        tools.downloadImage();
    });
    
    document.getElementById('undoBtn').addEventListener('click', function() {
        if (canvas._objects.length > 0) {
            canvas.remove(canvas._objects[canvas._objects.length - 1]);
        }
    });
    
    document.getElementById('redoBtn').addEventListener('click', function() {
        alert('Redo functionality requires a history management system');
    });
}