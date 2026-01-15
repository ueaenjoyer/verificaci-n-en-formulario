document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ageInput = document.getElementById('age');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Validation State
    const validState = {
        name: false,
        email: false,
        age: false,
        password: false,
        confirmPassword: false
    };

    // Regex Patterns
    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        // Password: At least 8 chars, 1 number, 1 special char (any symbol)
        password: /^(?=.*\d)(?=.*[\W_]).{8,}$/
    };

    // Helper functions
    const setStatus = (input, isValid) => {
        const formGroup = input.closest('.form-group');

        if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            formGroup.classList.remove('error');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
            formGroup.classList.add('error');
        }

        validateForm();
    };

    // Validation Logic
    const validateName = () => {
        const value = nameInput.value.trim();
        const isValid = value.length >= 3;
        validState.name = isValid;
        setStatus(nameInput, isValid);
    };

    const validateEmail = () => {
        const value = emailInput.value.trim();
        const isValid = patterns.email.test(value);
        validState.email = isValid;
        setStatus(emailInput, isValid);
    };

    const validateAge = () => {
        const value = parseInt(ageInput.value);
        const isValid = !isNaN(value) && value >= 18;
        validState.age = isValid;
        setStatus(ageInput, isValid);
    };

    const validatePassword = () => {
        const value = passwordInput.value;
        const isValid = patterns.password.test(value);
        validState.password = isValid;
        setStatus(passwordInput, isValid);

        // Re-validate confirm password if it has a value
        if (confirmPasswordInput.value) validateConfirmPassword();
    };

    const validateConfirmPassword = () => {
        const value = confirmPasswordInput.value;
        const password = passwordInput.value;
        const isValid = value === password && value.length > 0;
        validState.confirmPassword = isValid;
        setStatus(confirmPasswordInput, isValid);
    };

    const validateForm = () => {
        const allValid = Object.values(validState).every(status => status === true);
        submitBtn.disabled = !allValid;
    };

    // Reset Functionality
    const resetForm = () => {
        // Clear visual states
        [nameInput, emailInput, ageInput, passwordInput, confirmPasswordInput].forEach(input => {
            input.classList.remove('valid', 'invalid');
            input.closest('.form-group').classList.remove('error');
        });

        // Reset state object
        Object.keys(validState).forEach(key => validState[key] = false);

        submitBtn.disabled = true;
    };

    // Event Listeners - Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    ageInput.addEventListener('input', validateAge);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!submitBtn.disabled) {
            alert('¡Formulario enviado con éxito! Bienvenido.');
            form.reset();
            resetForm();
        }
    });

    // Reset Button
    resetBtn.addEventListener('click', () => {
        // The reset event happens after click, so we use a small timeout or just let default happen then clean styles
        setTimeout(resetForm, 10);
    });
});
