module.exports = {
    default: {
        paths: ['features/**/*.feature'],
        require: [
            'support/world.ts',
            'support/hooks.ts',
            'src/step-definitions/**/*.ts'
        ],
        requireModule: ['ts-node/register'],
        format: [
            'progress',
            'summary',
            'allure-cucumberjs/reporter'
        ],
        formatOptions: {
            snippetInterface: 'async-await',
            resultsDir: 'allure-results'
        }
    }
};
