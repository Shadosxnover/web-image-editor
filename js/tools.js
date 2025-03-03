const tools = {
    uploadImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            fabric.Image.fromURL(e.target.result, img => {
                img.scaleToWidth(fabricCanvas.width * 0.8);
                fabricCanvas.add(img);
                fabricCanvas.centerObject(img);
                fabricCanvas.setActiveObject(img);
                fabricCanvas.renderAll();
            });
        };
        reader.readAsDataURL(file);
    },

    addText() {
        const text = new fabric.IText('Edit Me', {
            left: 100,
            top: 100,
            fontSize: 20,
            fill: '#000000'
        });
        fabricCanvas.add(text);
        fabricCanvas.setActiveObject(text);
        fabricCanvas.renderAll();
    },

    addEmoji() {
        const emoji = new fabric.Text('😊', {
            left: 150,
            top: 150,
            fontSize: 40
        });
        fabricCanvas.add(emoji);
        fabricCanvas.setActiveObject(emoji);
        fabricCanvas.renderAll();
    },

    toggleDrawing() {
        fabricCanvas.isDrawingMode = !fabricCanvas.isDrawingMode;
        if (fabricCanvas.isDrawingMode) {
            fabricCanvas.freeDrawingBrush.width = 5;
            fabricCanvas.freeDrawingBrush.color = '#000000';
        }
        return fabricCanvas.isDrawingMode;
    },

    applyFilter() {
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject && activeObject.type === 'image') {
            activeObject.filters.push(new fabric.Image.filters.Grayscale());
            activeObject.applyFilters();
            fabricCanvas.renderAll();
        }
    },

    downloadImage() {
        const dataURL = fabricCanvas.toDataURL({
            format: 'png',
            quality: 1
        });
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'edited-image.png';
        link.click();
    },

    initCrop() {
        const activeImage = canvas.backgroundImage;
        if (!activeImage) return;

        const cropRect = new fabric.Rect({
            left: activeImage.left - activeImage.width * activeImage.scaleX / 4,
            top: activeImage.top - activeImage.height * activeImage.scaleY / 4,
            width: activeImage.width * activeImage.scaleX / 2,
            height: activeImage.height * activeImage.scaleY / 2,
            fill: 'rgba(0,0,0,0.3)',
            strokeWidth: 1,
            stroke: '#fff',
            transparentCorners: false,
            cornerColor: '#fff',
            cornerStrokeColor: '#000'
        });

        canvas.add(cropRect);
        canvas.setActiveObject(cropRect);
        canvas.renderAll();

        return cropRect;
    },

    applyCrop(cropRect) {
        const img = canvas.backgroundImage;
        if (!img || !cropRect) return;

        const scaleX = img.scaleX;
        const scaleY = img.scaleY;

        const left = (cropRect.left - img.left) / scaleX + img.width / 2;
        const top = (cropRect.top - img.top) / scaleY + img.height / 2;
        const width = cropRect.width / scaleX;
        const height = cropRect.height / scaleY;

        const imageData = {
            left: left,
            top: top,
            width: width,
            height: height
        };

        canvas.remove(cropRect);
        this.applyFilter('crop', imageData);
    },

    addShape(type) {
        let shape;
        switch (type) {
            case 'rect':
                shape = new fabric.Rect({
                    left: 100,
                    top: 100,
                    width: 100,
                    height: 100,
                    fill: 'transparent',
                    stroke: '#000000',
                    strokeWidth: 2
                });
                break;
            case 'circle':
                shape = new fabric.Circle({
                    left: 100,
                    top: 100,
                    radius: 50,
                    fill: 'transparent',
                    stroke: '#000000',
                    strokeWidth: 2
                });
                break;
            case 'triangle':
                shape = new fabric.Triangle({
                    left: 100,
                    top: 100,
                    width: 100,
                    height: 100,
                    fill: 'transparent',
                    stroke: '#000000',
                    strokeWidth: 2
                });
                break;
        }
        if (shape) {
            canvas.add(shape);
            canvas.setActiveObject(shape);
            canvas.renderAll();
        }
    },

    setDrawingMode(isDrawing, options = {}) {
        canvas.isDrawingMode = isDrawing;
        if (isDrawing) {
            canvas.freeDrawingBrush.width = options.width || 5;
            canvas.freeDrawingBrush.color = options.color || '#000000';
        }
    },

    setEraserMode(isErasing) {
        if (isErasing) {
            this.setDrawingMode(true, {
                width: 20,
                color: canvas.backgroundColor || '#ffffff'
            });
        } else {
            this.setDrawingMode(false);
        }
    },

    resizeImage(width, height) {
        const img = canvas.backgroundImage;
        if (!img) return;

        const scaledWidth = width / img.width;
        const scaledHeight = height / img.height;
        img.scale(Math.min(scaledWidth, scaledHeight));
        canvas.centerObject(img);
        canvas.renderAll();
    }
};

window.tools = tools;
