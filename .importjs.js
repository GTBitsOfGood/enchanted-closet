module.exports = {
  environments: ['browser', 'jest'],
  danglingCommas: false,
  importStatementFormatter({ importStatement }) {
    return importStatement.replace(/{ PropTypes }/, 'PropTypes').replace(/;$/, '');
  },
  useRelativePaths: false,
  namedExports: {
    'prop-types': ['PropTypes'],
  },
  moduleNameFormatter({moduleName}) {
    return moduleName
  }
}
