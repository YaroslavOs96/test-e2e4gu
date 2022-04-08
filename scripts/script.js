window.addEventListener('load', () => {
    const form = document.forms['form_registration'];
    form.addEventListener('input', handleInput);
    form.addEventListener('submit', handleSubmit);

    function handleSubmit(e) {
        e.preventDefault();
        const inputArr = form.querySelectorAll('input'),
            arrInputValidStatus = [];
        inputArr.forEach(function (item) {
            item.classList.contains('value-valid') ? arrInputValidStatus.push(true) : arrInputValidStatus.push(false)
        });
        arrInputValidStatus.every(item => item) ? sendForm() : abortSendForm()
    }

    function checkAge() {
        const dateBirth = document.getElementById('date-of-birth');
        if (Date.parse(new Date()) - Date.parse(dateBirth.value) < 567648000000) {
            toggleClassElement(dateBirth, 'value-not-valid', 'value-valid')
        }
    }

    function sendForm() {
        failture.classList.remove('hint-active');
        submited.classList.add('hint-active');
        resetForm()
    }

    function abortSendForm() {
        submited.classList.remove('hint-active');
        failture.classList.add('hint-active');
    }

    function handleInput({ target }) {
        if (target.hasAttribute("data-reg")) {
            checkInput(target)
        }
        if (target.getAttribute("id") === 'password_repeat' || target.getAttribute("id") === 'password') {
            checkPasswords()
        }
    }

    function checkPasswords() {
        password.value === password_repeat.value ? toggleClassElement(password_repeat, 'value-valid', 'value-not-valid') : toggleClassElement(password_repeat, 'value-not-valid', 'value-valid')
    }

    function checkInput(elem) {
        const
            inputReg = new RegExp(elem.getAttribute("data-reg")),
            inputValue = elem.value;

        if (inputReg.test(inputValue)) {
            toggleClassElement(elem, 'value-valid', 'value-not-valid')
            if (elem.getAttribute("data-reg") === "[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])") {
                checkAge()
            }
        } else {
            toggleClassElement(elem, 'value-not-valid', 'value-valid')
        }
    }

    function resetForm() {
        form.reset()
        const inputArr = form.querySelectorAll('input');
        inputArr.forEach(function (item) {
            item.classList.remove('value-valid');
        });
        setTimeout(() => {
            submited.classList.remove('hint-active');
        }, 5000);
    }

    function toggleClassElement(elem, addClassName, removeClassName) {
        elem.classList.remove(removeClassName);
        elem.classList.add(addClassName);
    }
})