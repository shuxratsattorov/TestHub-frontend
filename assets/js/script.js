const maxInputs = 5;
let inputCount = 1;

document.getElementById('add-input').addEventListener('click', function () {
    if (inputCount < maxInputs) {
        const inputContainer = document.getElementById('input-container');
        const newInputDiv = document.createElement('div');
        newInputDiv.classList.add('input-radio-pair');

        const nameIndex = inputCount;

        newInputDiv.innerHTML = `
            <input class="width-input js-width-input" type="text" name="answers-${nameIndex}-answer" placeholder="Variant ${inputCount + 1} ni kiriting">
            <label class="custom-checkbox">
            <input class="single-select" type="checkbox" id="option${nameIndex}" name="answers-${nameIndex}-is_correct" value="${nameIndex}">
            <span class="checkmark"></span>
            </label>
            <button type="button" class="delete-btn"><img src="assets/icon/delete.svg"></button>
        `;

        inputContainer.appendChild(newInputDiv);
        inputCount++;

        const deleteButton = newInputDiv.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function () {
            newInputDiv.remove();
            inputCount--;
            updateInputNames();
        });

        // Add event listener to the new checkbox
        const checkbox = newInputDiv.querySelector('.single-select');
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                const checkboxes = document.querySelectorAll('.single-select');
                checkboxes.forEach((otherCheckbox) => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    } else {
        alert('Maksimal 5 ta variant qo\'shishingiz mumkin');
    }
});

function updateInputNames() {
    const inputPairs = document.querySelectorAll('.input-radio-pair');
    inputPairs.forEach((pair, index) => {
        const textInput = pair.querySelector('input[type="text"]');
        const checkboxInput = pair.querySelector('input[type="checkbox"]');

        textInput.name = `answers-${index}-answer`;

        checkboxInput.name = `answers-${index}-is_correct`;  // Kept same for consistency
        checkboxInput.id = `option${index}`;
        checkboxInput.value = index;

        // Update the checkbox event listener
        checkboxInput.addEventListener('change', function() {
            if (this.checked) {
                const checkboxes = document.querySelectorAll('.single-select');
                checkboxes.forEach((otherCheckbox) => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });
}

