module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  jest: {
    configure: (jestConfig) => {
      jestConfig.testMatch = ['<rootDir>/src/__tests__/cases/**/*'];
      jestConfig.setupFilesAfterEnv = [
        '<rootDir>/src/__tests__/config/setup-files-after-env.js',
      ];
      return jestConfig;
    },
  },
};
