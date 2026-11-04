module.exports = {
    default: {
        paths: ['features/**/*.feature'],
        require: [
            'support/world.ts',
            'support/hooks.ts',
            'src/step-definitions/**/*.ts'
        ],
        requireModule: ['ts-node/register'],
        formatOptions: {
            snippetInterface: 'async-await'
        }
    }
};
