webpackHotUpdate(0,{

/***/ 827:
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./frontend/components/profile/ProfileParticipant.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ 14);\n\nvar _redux = __webpack_require__(/*! redux */ 19);\n\nvar _moment = __webpack_require__(/*! moment */ 6);\n\nvar _moment2 = _interopRequireDefault(_moment);\n\nvar _semanticUiReact = __webpack_require__(/*! semantic-ui-react */ 11);\n\nvar _ = __webpack_require__(/*! ../ */ 23);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar targets = {\n  'phone': {\n    constraintMsg: \"Only numbers, please\",\n    isLegal: function isLegal(val) {\n      return (/^$|^[1-9][0-9]*$/.test(val)\n      );\n    }\n  },\n  'grade': {\n    //isLegal: val => /^$|^[1-9]|1[0-2]|college]$/.test(val)\n    isLegal: function isLegal(val) {\n      return (/^$/.test(val)\n      );\n    }\n    //options: [6,7,8,9,10,11,12]\n  },\n  'race': {\n    isLegal: function isLegal(val) {\n      return (/^[a-zA-Z\\s]*$/.test(val)\n      );\n    }\n  },\n  'school': {\n    isLegal: function isLegal(val) {\n      return (/^[\\w\\s]*$/.test(val)\n      );\n    }\n  },\n  'leader': {\n    isLegal: function isLegal(val) {\n      return (/^[a-zA-Z\\s]*$/.test(val)\n      );\n    }\n  },\n  'emergencyContactName': {\n    isLegal: function isLegal(val) {\n      return (/^[a-zA-Z\\s]*$/.test(val)\n      );\n    }\n  },\n  'emergencyContactPhone': {\n    isLegal: function isLegal(val) {\n      return (/^$|^[1-9][0-9]*$/.test(val)\n      );\n    }\n  },\n  'emergencyContactRelation': {\n    isLegal: function isLegal(val) {\n      return (/^[a-zA-Z\\s]*$/.test(val)\n      );\n    }\n  }\n};\n\n// Only for mutable fields\nvar ProfileParticipant = function ProfileParticipant(props) {\n  return _react2.default.createElement(\n    _semanticUiReact.Card,\n    { style: styles.softCard },\n    _react2.default.createElement(\n      _semanticUiReact.Card.Content,\n      null,\n      _react2.default.createElement(\n        _semanticUiReact.Card.Header,\n        null,\n        ' Additional Details: '\n      ),\n      _react2.default.createElement(\n        _semanticUiReact.Card.Description,\n        null,\n        _react2.default.createElement(_.ProfileForm, { targets: targets })\n      )\n    )\n  );\n};\n\nvar styles = {\n  softCard: {\n    padding: '1em',\n    width: '50%' // Pretty whimsical\n  }\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    user: state.user,\n    error: state.error\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(ProfileParticipant);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODI3LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2NvbXBvbmVudHMvcHJvZmlsZS9Qcm9maWxlUGFydGljaXBhbnQuanM/ODRkYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IEJ1dHRvbiwgQ2FyZCwgQ29udGFpbmVyLCBIZWFkZXIsIExvYWRlciwgU2VnbWVudCB9IGZyb20gJ3NlbWFudGljLXVpLXJlYWN0J1xuaW1wb3J0IHsgUHJvZmlsZUZvcm0gfSBmcm9tICcuLi8nXG5cbmNvbnN0IHRhcmdldHMgPSB7XG4gICdwaG9uZSc6IHtcbiAgICBjb25zdHJhaW50TXNnOiBcIk9ubHkgbnVtYmVycywgcGxlYXNlXCIsXG4gICAgaXNMZWdhbDogdmFsID0+IC9eJHxeWzEtOV1bMC05XSokLy50ZXN0KHZhbClcbiAgfSxcbiAgJ2dyYWRlJzoge1xuICAgIC8vaXNMZWdhbDogdmFsID0+IC9eJHxeWzEtOV18MVswLTJdfGNvbGxlZ2VdJC8udGVzdCh2YWwpXG4gICAgaXNMZWdhbDogdmFsID0+IC9eJC8udGVzdCh2YWwpXG4gICAgLy9vcHRpb25zOiBbNiw3LDgsOSwxMCwxMSwxMl1cbiAgfSxcbiAgJ3JhY2UnOiB7XG4gICAgaXNMZWdhbDogdmFsID0+IC9eW2EtekEtWlxcc10qJC8udGVzdCh2YWwpXG4gIH0sXG4gICdzY2hvb2wnOiB7XG4gICAgaXNMZWdhbDogdmFsID0+IC9eW1xcd1xcc10qJC8udGVzdCh2YWwpXG4gIH0sXG4gICdsZWFkZXInOiB7XG4gICAgaXNMZWdhbDogdmFsID0+IC9eW2EtekEtWlxcc10qJC8udGVzdCh2YWwpXG4gIH0sXG4gICdlbWVyZ2VuY3lDb250YWN0TmFtZSc6IHtcbiAgICBpc0xlZ2FsOiB2YWwgPT4gL15bYS16QS1aXFxzXSokLy50ZXN0KHZhbClcbiAgfSxcbiAgJ2VtZXJnZW5jeUNvbnRhY3RQaG9uZSc6IHtcbiAgICBpc0xlZ2FsOiB2YWwgPT4gL14kfF5bMS05XVswLTldKiQvLnRlc3QodmFsKVxuICB9LFxuICAnZW1lcmdlbmN5Q29udGFjdFJlbGF0aW9uJzoge1xuICAgIGlzTGVnYWw6IHZhbCA9PiAvXlthLXpBLVpcXHNdKiQvLnRlc3QodmFsKVxuICB9XG59O1xuXG4vLyBPbmx5IGZvciBtdXRhYmxlIGZpZWxkc1xuY29uc3QgUHJvZmlsZVBhcnRpY2lwYW50ID0gcHJvcHMgPT4ge1xuICByZXR1cm4gKFxuICAgIDxDYXJkIHN0eWxlPXtzdHlsZXMuc29mdENhcmR9PlxuICAgICAgPENhcmQuQ29udGVudD5cblx0PENhcmQuSGVhZGVyPiBBZGRpdGlvbmFsIERldGFpbHM6IDwvQ2FyZC5IZWFkZXI+XG5cdDxDYXJkLkRlc2NyaXB0aW9uPlxuXHQgIDxQcm9maWxlRm9ybSB0YXJnZXRzPXt0YXJnZXRzfSAvPlxuXHQ8L0NhcmQuRGVzY3JpcHRpb24+XG4gICAgICA8L0NhcmQuQ29udGVudD5cbiAgICA8L0NhcmQ+XG4gIClcbn1cblxuY29uc3Qgc3R5bGVzID0ge1xuICBzb2Z0Q2FyZDoge1xuICAgIHBhZGRpbmc6ICcxZW0nLFxuICAgIHdpZHRoOiAnNTAlJyAvLyBQcmV0dHkgd2hpbXNpY2FsXG4gIH0sXG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcbiAgcmV0dXJuIHtcbiAgICB1c2VyOiBzdGF0ZS51c2VyLFxuICAgIGVycm9yOiBzdGF0ZS5lcnJvclxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShQcm9maWxlUGFydGljaXBhbnQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2NvbXBvbmVudHMvcHJvZmlsZS9Qcm9maWxlUGFydGljaXBhbnQuanMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBR0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBR0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBR0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBR0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBR0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBekJBO0FBQ0E7QUE2QkE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBRkE7QUFEQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBREE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///827\n");

/***/ })

})