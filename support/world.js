const { setWorldConstructor } = require('@cucumber/cucumber');

require('dotenv').config();

class CustomWorld {

    constructor() {

        this.browser = null;
        this.context = null;
        this.page = null;

        this.baseUrl = process.env.BASE_URL;

    }

}

setWorldConstructor(CustomWorld);