function initEvents() {
    // Upload
    document.getElementById('uploadBtn').addEventListener('click', () => {
        document.getElementById('imageUpload').click();
    });

    document.getElementById('imageUpload').addEventListener('change', (e) => {
        if (e.target.files?.[0]) {
            tools.uploadImage(e.target.files[0]);
        }
    });

    // Text
    document.getElementById('textBtn').addEventListener('click', () => {
        tools.addText();
    });

    // Emoji
    document.getElementById('emojiBtn').addEventListener('click', () => {
        tools.addEmoji();
    });

    // Drawing
    document.getElementById('drawBtn').addEventListener('click', (e) => {
        const isDrawing = !canvas.isDrawingMode;
        tools.setDrawingMode(isDrawing);
        e.currentTarget.classList.toggle('bg-blue-100', isDrawing);
        document.getElementById('eraserBtn').classList.remove('bg-blue-100');
    });

    // Eraser
    document.getElementById('eraserBtn').addEventListener('click', (e) => {
        const isErasing = !canvas.isDrawingMode;
        tools.setEraserMode(isErasing);
        e.currentTarget.classList.toggle('bg-blue-100', isErasing);
        document.getElementById('drawBtn').classList.remove('bg-blue-100');
    });

    // Filter
    document.getElementById('filterBtn').addEventListener('click', () => {
        const filterMenu = document.createElement('div');
        filterMenu.className = 'absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg';
        filterMenu.innerHTML = `
            <div class="py-1">
                <button onclick="filters.grayscale()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Grayscale</button>
                <button onclick="filters.sepia()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Sepia</button>
                <button onclick="filters.brightness(0.1)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Brighten</button>
                <button onclick="filters.contrast(0.1)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Increase Contrast</button>
                <button onclick="filters.saturation(0.1)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Increase Saturation</button>
                <button onclick="filters.blur(0.1)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Blur</button>
                <button onclick="filters.removeFilter()" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Remove Filters</button>
            </div>
        `;
        
        document.getElementById('filterBtn').appendChild(filterMenu);
        
        // Close menu when clicking outside
        const closeMenu = (e) => {
            if (!filterMenu.contains(e.target)) {
                filterMenu.remove();
                document.removeEventListener('click', closeMenu);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 0);
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filterType = btn.dataset.filter;
            if (filterType === 'none') {
                filters.removeFilter();
            } else {
                filters[filterType]?.();
            }
        });
    });

    // Crop
    let cropRect = null;
    document.getElementById('cropBtn').addEventListener('click', () => {
        if (!cropRect) {
            cropRect = tools.initCrop();
            document.getElementById('cropBtn').classList.add('bg-blue-100');
        } else {
            tools.applyCrop(cropRect);
            cropRect = null;
            document.getElementById('cropBtn').classList.remove('bg-blue-100');
        }
    });

    // Resize
    document.getElementById('resizeBtn').addEventListener('click', () => {
        const img = canvas.backgroundImage;
        if (!img) return;

        const width = prompt('Enter width (px):', Math.round(img.width * img.scaleX));
        const height = prompt('Enter height (px):', Math.round(img.height * img.scaleY));
        
        if (width && height) {
            tools.resizeImage(parseInt(width), parseInt(height));
        }
    });

    // Shape
    document.getElementById('shapeBtn').addEventListener('click', () => {
        const menu = document.createElement('div');
        menu.className = 'absolute left-full ml-2 bg-white rounded-lg shadow-lg p-2';
        menu.innerHTML = `
            <button class="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded" onclick="tools.addShape('rect')">Rectangle</button>
            <button class="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded" onclick="tools.addShape('circle')">Circle</button>
            <button class="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded" onclick="tools.addShape('triangle')">Triangle</button>
        `;
        document.getElementById('shapeBtn').appendChild(menu);

        const closeMenu = (e) => {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        };
        setTimeout(() => document.addEventListener('click', closeMenu), 0);
    });

    // Download
    document.getElementById('downloadBtn').addEventListener('click', () => {
        tools.downloadImage();
    });
}
