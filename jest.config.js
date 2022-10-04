
/**
 * Foi cria esse arq para configuração particular do Jest,
 * Copiado da pasta de dependencias package.json
 */
 module.exports = {
  preset: "jest-expo",

  testPathIgnorePatterns: [
    "/node_modules",
    "/android",
    "/ios"
  ],

  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components"
  ],

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx", 
    "!src/**/*.spec.tsx"
  ],
  coverageReporters: [
    "lcov"    
  ]
}