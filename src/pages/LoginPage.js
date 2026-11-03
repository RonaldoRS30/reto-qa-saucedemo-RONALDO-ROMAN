
class LoginPage {

    constructor(page, baseUrl) {

        this.page = page;
        this.baseUrl = baseUrl;

        // Localizadores de los elementos
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');

        // Mensaje de error
        this.errorMessage = page.locator('[data-test="error"]');
        

    }

    // Abrir la página de inicio de sesión
    async navigate() {

        await this.page.goto(this.baseUrl);

    }

    // Ingresar las credenciales
    async enterCredentials(username, password) {

        await this.usernameInput.fill(username);

        await this.passwordInput.fill(password);

    }

    // Presionar el botón Login
    async clickLogin() {

        await this.loginButton.click();

    }

    // Método que permite iniciar sesión realizando ambas acciones
    async login(username, password) {

        await this.enterCredentials(username, password);

        await this.clickLogin();

    }

}

module.exports = LoginPage;
