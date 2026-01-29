const nextCoreWebVitals = require("eslint-config-next/core-web-vitals");
const nextTypescript = require("eslint-config-next/typescript");

module.exports = [{ ignores: ["eslint.config.js"] }, ...nextCoreWebVitals, ...nextTypescript];

