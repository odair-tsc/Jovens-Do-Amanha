
document.addEventListener("DOMContentLoaded", () => {
    const steps = Array.from(document.querySelectorAll(".guide-step"));
    const stepButtons = Array.from(document.querySelectorAll(".step-item"));

    const backButton = document.getElementById("step-back");
    const nextButton = document.getElementById("step-next");

    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");
    const completeMessage = document.getElementById("guide-complete");

    if (!steps.length || !backButton || !nextButton) return;

    let currentStep = 0;

    function showStep(index) {
        currentStep = Math.max(0, Math.min(index, steps.length - 1));

        steps.forEach((step, i) => {
            step.classList.toggle("active", i === currentStep);
        });

        stepButtons.forEach((button, i) => {
            button.classList.toggle("active", i === currentStep);

            if (i === currentStep) {
                button.setAttribute("aria-current", "step");
            } else {
                button.removeAttribute("aria-current");
            }
        });

        const progress = ((currentStep + 1) / steps.length) * 100;

        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Etapa ${currentStep + 1} de ${steps.length}`;

        backButton.disabled = currentStep === 0;

        const isLastStep = currentStep === steps.length - 1;

        nextButton.textContent = isLastStep
            ? "Recomeçar guia ↻"
            : "Próxima etapa →";

        completeMessage.hidden = !isLastStep;
    }

    nextButton.addEventListener("click", () => {
        if (currentStep === steps.length - 1) {
            showStep(0);
            return;
        }

        showStep(currentStep + 1);
    });

    backButton.addEventListener("click", () => {
        showStep(currentStep - 1);
    });

    stepButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.step);

            if (Number.isInteger(index)) {
                showStep(index);
            }
        });
    });

    showStep(0);
});
