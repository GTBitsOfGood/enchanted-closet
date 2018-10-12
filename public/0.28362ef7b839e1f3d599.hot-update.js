webpackHotUpdate(0,{

/***/ 842:
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./frontend/components/events/EventImage.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ 16);\n\nvar _semanticUiReact = __webpack_require__(/*! semantic-ui-react */ 9);\n\nvar _ = __webpack_require__(/*! ../ */ 24);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// User Pfp display/linker / lock if not admin - id of event\nvar EventImage = function EventImage(_ref) {\n  var _ref$imageUrl = _ref.imageUrl,\n      imageUrl = _ref$imageUrl === undefined ? \"defaultEventPicture.png\" : _ref$imageUrl,\n      role = _ref.role,\n      id = _ref.id;\n\n  if (role !== 'Admin') return _react2.default.createElement(_semanticUiReact.Image, {\n    centered: true,\n    src: '/uploaded/events/' + imageUrl,\n    size: 'medium'\n  });else return _react2.default.createElement(\n    _.UploadModal,\n    { type: 'event', id: id, openModal: true },\n    _react2.default.createElement(_semanticUiReact.Image, {\n      style: styles.imageStyle,\n      centered: true,\n      src: '/uploaded/events/' + imageUrl,\n      size: 'medium'\n    })\n  );\n};\n\nvar styles = {\n  imageStyle: {\n    cursor: 'pointer'\n  }\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    role: state.user ? state.user.role : \"loggedOut\"\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(EventImage);\n// TODO: Style//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODQyLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2NvbXBvbmVudHMvZXZlbnRzL0V2ZW50SW1hZ2UuanM/MTEyNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IENvbnRhaW5lciwgSW1hZ2UsIFJldmVhbCB9IGZyb20gJ3NlbWFudGljLXVpLXJlYWN0J1xuaW1wb3J0IHsgVXBsb2FkTW9kYWwgfSBmcm9tICcuLi8nO1xuXG4vLyBVc2VyIFBmcCBkaXNwbGF5L2xpbmtlciAvIGxvY2sgaWYgbm90IGFkbWluIC0gaWQgb2YgZXZlbnRcbmNvbnN0IEV2ZW50SW1hZ2UgPSAoeyBpbWFnZVVybCA9IFwiZGVmYXVsdEV2ZW50UGljdHVyZS5wbmdcIiwgcm9sZSwgaWQgfSkgPT4ge1xuICBpZiAocm9sZSAhPT0gJ0FkbWluJylcbiAgICByZXR1cm4gKFxuICAgICAgPEltYWdlXG5cdGNlbnRlcmVkXG5cdHNyYz17YC91cGxvYWRlZC9ldmVudHMvJHtpbWFnZVVybH1gfVxuXHRzaXplPSdtZWRpdW0nXG4gICAgICAvPlxuICAgICk7XG4gIGVsc2VcbiAgICByZXR1cm4gKFxuICAgICAgPFVwbG9hZE1vZGFsIHR5cGU9XCJldmVudFwiIGlkPXtpZH0gb3Blbk1vZGFsPXt0cnVlfT5cblx0PEltYWdlXG5cdCAgc3R5bGU9e3N0eWxlcy5pbWFnZVN0eWxlfVxuXHQgIGNlbnRlcmVkXG5cdCAgc3JjPXtgL3VwbG9hZGVkL2V2ZW50cy8ke2ltYWdlVXJsfWB9XG5cdCAgc2l6ZT0nbWVkaXVtJ1xuXHQvPlxuICAgICAgPC9VcGxvYWRNb2RhbD5cbiAgICApO1xufVxuXG5jb25zdCBzdHlsZXMgPSB7XG4gIGltYWdlU3R5bGU6IHtcbiAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcbiAgcmV0dXJuIHtcbiAgICByb2xlOiBzdGF0ZS51c2VyID8gc3RhdGUudXNlci5yb2xlIDogXCJsb2dnZWRPdXRcIlxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShFdmVudEltYWdlKTtcbi8vIFRPRE86IFN0eWxlXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvY29tcG9uZW50cy9ldmVudHMvRXZlbnRJbWFnZS5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBSEE7QUFRQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFEQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///842\n");

/***/ })

})