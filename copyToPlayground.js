// copyToPlayground.js
document.addEventListener("DOMContentLoaded", () => {
    // Select all buttons with the class 'copy-btn'
    const copyButtons = document.querySelectorAll(".copy-btn");
    // Select the textarea where the code will be copied
    const codeInput = document.getElementById("code-input");

    // Add a click event listener to each copy button
    copyButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Get the code from the data-code attribute of the button
            let code = button.getAttribute("data-code");
            if (code) {
                // Replace literal '\n' with actual newlines
                code = code.replace(/\\n/g, "\n");
                // Set the textarea value to the formatted code
                codeInput.value = code;
                // Scroll the textarea to the top
                codeInput.scrollTop = 0;
                // Focus the textarea to indicate the code has been copied
                codeInput.focus();
            }
        });
    });
});