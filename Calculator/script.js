document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove the 'btn-clicked' class from all buttons first
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('btn-clicked'));

        // Add the 'btn-clicked' class to the clicked button
        button.classList.add('btn-clicked');
    });
});
