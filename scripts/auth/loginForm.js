export const loginForm = () => {
    return `<fieldset class="form__field">
            <label for="loginName">Name</label>
            <input type="text" name="loginName" id="loginName" placeholder="Name">
        </fieldset>
        <fieldset class="form__field">
            <label for="loginEmail">Email</label>
            <input type="text" name="loginEmail" id="loginEmail" placeholder="Email">
        </fieldset>
        <button id="registerBtn" class="button button--register">Login/Register</button>
        `
}

export const renderLoginForm = () => {
    document.querySelector(".form").innerHTML = loginForm()
}