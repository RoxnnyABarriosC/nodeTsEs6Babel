module.exports = {
    '*.{ts,tsx}': [
        () => 'pnpm lint:fix',
        () => 'pnpm ts:check',
        // () => 'pnpm test'
    ]
};
