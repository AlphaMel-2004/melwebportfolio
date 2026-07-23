document.addEventListener("DOMContentLoaded", () => {
    const year = document.querySelector("[data-current-year]");
    const copyButtons = document.querySelectorAll("[data-copy-email]");
    const email = "eumaguerumel4@gmail.com";

    if (year) {
        year.textContent = new Date().getFullYear().toString();
    }

    copyButtons.forEach((button) => {
        const feedback = document.querySelector(button.dataset.feedbackTarget || "");
        button.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(email);
                if (feedback) {
                    feedback.textContent = "Email copied.";
                }
            } catch (error) {
                if (feedback) {
                    feedback.textContent = "Copy failed. Email: " + email;
                }
            }
        });
    });
});
