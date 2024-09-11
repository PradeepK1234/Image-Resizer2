// Select elements
const imageInput = document.getElementById('imageInput');
const previewImg = document.getElementById('previewImg');
const resizeBtn = document.getElementById('resizeBtn');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const downloadBtn = document.getElementById('downloadBtn');
const imagePreview = document.getElementById('imagePreview');

let originalImage = null; // To store the original image

// Image upload and preview
imageInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
            originalImage = new Image();
            originalImage.src = e.target.result;
        }
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file.');
    }
});

// Resizing the image
resizeBtn.addEventListener('click', function () {
    if (!originalImage) {
        alert('Please upload an image first.');
        return;
    }

    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);

    if (!width || !height) {
        alert('Please enter valid width and height.');
        return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to user input
    canvas.width = width;
    canvas.height = height;

    // Draw the resized image
    ctx.drawImage(originalImage, 0, 0, width, height);

    // Update preview with the resized image
    const resizedImageURL = canvas.toDataURL('image/png');
    previewImg.src = resizedImageURL;

    // Prepare download link
    downloadBtn.href = resizedImageURL;
    downloadBtn.download = 'resized-image.png';
    downloadBtn.style.display = 'inline-block';
});
