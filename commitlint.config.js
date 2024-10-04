export default {
    extends: ['@commitlint/config-conventional'],
    formatter: '@commitlint/format',
    rules: {
        "header-max-length": [2, 'always', 50],
        "body-max-line-length": [2, 'always', 72],
        "subject-empty": [0],
        "type-empty": [0]
    }
};
