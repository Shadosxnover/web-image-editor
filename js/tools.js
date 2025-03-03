// tools.js - Tool implementations
const tools = {
    uploadImage(file) {
        if (!window.canvas) {
            console.error('Canvas not initialized');
            return;
        }

        // Show loading indicator
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('placeholder').classList.add('hidden');
        
        const reader = new FileReader();
        reader.onload = (e) => {
            fabric.Image.fromURL(e.target.result, (img) => {
                canvas.clear();
                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                    originX: 'center',
                    originY: 'center',
                    left: canvas.width / 2,
                    top: canvas.height / 2
                });
                
                // Center and scale image
                const scale = Math.min(
                    (canvas.width * 0.8) / img.width,
                    (canvas.height * 0.8) / img.height
                );
                
                img.scale(scale);
                canvas.centerObject(img);
                canvas.renderAll();
                
                // Hide loading indicator
                document.getElementById('loading').classList.add('hidden');
                
                // Update image info
                const scaledWidth = Math.round(img.width * scale);
                const scaledHeight = Math.round(img.height * scale);
                document.getElementById('image-info').textContent = 
                    `Image: ${scaledWidth}×${scaledHeight} px (${Math.round(scale * 100)}%)`;
            });
        };
        
        reader.readAsDataURL(file);
    },

    addText() {
        const text = new fabric.IText('Double click to edit', {
            left: canvas.width / 2,
            top: canvas.height / 2,
            fontFamily: 'Arial',
            fill: '#000000',
            fontSize: 20
        });
        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
    },

    addEmoji() {
        const emojis = ["😊", "👍", "🎉", "❤️", "🚀", "⭐", "🔥", "🌈", "👏", "🙌"];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        const emoji = new fabric.Text(randomEmoji, {
            left: canvas.width / 2,
            top: canvas.height / 2,
            fontSize: 40
        });
        canvas.add(emoji);
        canvas.setActiveObject(emoji);
        canvas.renderAll();
    },

    setDrawingMode(isDrawing) {
        canvas.isDrawingMode = isDrawing;
        if (isDrawing) {
            canvas.freeDrawingBrush.width = 5;
            canvas.freeDrawingBrush.color = '#000000';
        }
    },

    setEraserMode(isErasing) {
        canvas.isDrawingMode = isErasing;
        if (isErasing) {
            canvas.freeDrawingBrush.width = 20;
            canvas.freeDrawingBrush.color = canvas.backgroundColor || '#ffffff';
        }
    },

    initCrop() {
        if (!canvas.backgroundImage) return null;
        
        const img = canvas.backgroundImage;
        const cropRect = new fabric.Rect({
            left: img.left,
            top: img.top,
            width: img.width * img.scaleX / 2,
            height: img.height * img.scaleY / 2,
            fill: 'rgba(0,0,0,0.3)',
            stroke: '#fff',
            strokeWidth: 1,
            cornerColor: '#fff',
            cornerStrokeColor: '#000',
            transparentCorners: false,
            absolutePositioned: true
        });
        
        canvas.add(cropRect);
        canvas.setActiveObject(cropRect);
        canvas.renderAll();
        
        return cropRect;
    },

    applyCrop(cropRect) {
        if (!canvas.backgroundImage || !cropRect) return;
        
        const img = canvas.backgroundImage;
        
        // Calculate the image's top-left corner on the canvas
        const imageCanvasLeft = img.left - (img.width * img.scaleX / 2);
        const imageCanvasTop = img.top - (img.height * img.scaleY / 2);
        
        // Crop rectangle's position relative to the image's top-left
        const cropRelativeLeft = cropRect.left - imageCanvasLeft;
        const cropRelativeTop = cropRect.top - imageCanvasTop;
        
        // Convert to the original image's coordinate system (unscaled)
        const cropOriginalLeft = cropRelativeLeft / img.scaleX;
        const cropOriginalTop = cropRelativeTop / img.scaleY;
        const cropOriginalWidth = cropRect.width / img.scaleX;
        const cropOriginalHeight = cropRect.height / img.scaleY;
        
        // Create a new canvas sized to the crop area
        const newCanvas = document.createElement('canvas');
        newCanvas.width = cropOriginalWidth;
        newCanvas.height = cropOriginalHeight;
        const newCtx = newCanvas.getContext('2d');
        
        // Draw only the cropped portion of the original image
        newCtx.drawImage(
            img._element,              // Source image element
            cropOriginalLeft,          // Source x
            cropOriginalTop,           // Source y
            cropOriginalWidth,         // Source width
            cropOriginalHeight,        // Source height
            0,                         // Destination x
            0,                         // Destination y
            cropOriginalWidth,         // Destination width
            cropOriginalHeight         // Destination height
        );
        
        // Create a new Fabric.js image from the cropped canvas
        fabric.Image.fromURL(newCanvas.toDataURL(), (croppedImg) => {
            canvas.clear();
            canvas.setBackgroundImage(croppedImg, canvas.renderAll.bind(canvas), {
                originX: 'center',
                originY: 'center',
                left: canvas.width / 2,
                top: canvas.height / 2
            });
            
            // Fit the new image to the canvas (assuming fitImageToCanvas is defined)
            fitImageToCanvas();
        });
        
        // Remove the crop rectangle from the canvas
        canvas.remove(cropRect);
    },

    resizeImage(width, height) {
        if (!canvas.backgroundImage) return;
        
        const img = canvas.backgroundImage;
        const scaleX = width / (img.width * img.scaleX);
        const scaleY = height / (img.height * img.scaleY);
        
        img.scale(img.scaleX * scaleX, img.scaleY * scaleY);
        canvas.renderAll();
        
        const scaledWidth = Math.round(img.width * img.scaleX);
        const scaledHeight = Math.round(img.height * img.scaleY);
        document.getElementById('image-info').textContent = 
            `Image: ${scaledWidth}×${scaledHeight} px (${Math.round(img.scaleX * 100)}%)`;
    },

    downloadImage() {
        if (!canvas.backgroundImage) {
            alert('Please upload an image first');
            return;
        }
        
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1
        });
        
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'edited-image.png';
        link.click();
    }
};

window.tools = tools;