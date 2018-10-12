webpackHotUpdate(0,{

/***/ 834:
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./frontend/components/common/UploadModal.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ 16);\n\nvar _redux = __webpack_require__(/*! redux */ 21);\n\nvar _index = __webpack_require__(/*! ../../actions/index */ 23);\n\nvar _semanticUiReact = __webpack_require__(/*! semantic-ui-react */ 9);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// Upload Modal - Wrapper - todo: validate filesize\nvar UploadModal = function (_Component) {\n  _inherits(UploadModal, _Component);\n\n  function UploadModal(props) {\n    _classCallCheck(this, UploadModal);\n\n    var _this = _possibleConstructorReturn(this, (UploadModal.__proto__ || Object.getPrototypeOf(UploadModal)).call(this, props));\n\n    _this.state = {\n      file: null,\n      modalOpen: props.openModal\n    };\n    _this.onChange = _this.onChange.bind(_this);\n    return _this;\n  }\n\n  _createClass(UploadModal, [{\n    key: 'onFormSubmit',\n    value: function onFormSubmit(e) {\n      e.preventDefault();\n      if (this.props.type.toLowerCase() === \"user\") this.props.uploadUserImage(this.state);else {\n        this.props.uploadEventImage(this.state, this.props.id);\n      }\n    }\n  }, {\n    key: 'onChange',\n    value: function onChange(e) {\n      this.setState({ file: e.target.files[0] });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this2 = this;\n\n      console.log(\"Rendering again\");\n      var _props = this.props,\n          children = _props.children,\n          id = _props.id,\n          type = _props.type;\n      var file = this.state.file;\n      // process filename real fast\n\n      var label = file ? file.name.length > 14 ? file.name.substr(0, 4) + \"...\" + file.name.substr(-7) : file.name : \"Select a File\";\n      /* // Bugged\n      const trigger = (\n        <Reveal animated=\"fade\">\n      <Reveal.Content visible>\n      {children}\n      </Reveal.Content>\n      <Reveal.Content hidden>\n      <Container>\n       Tests\n      </Container>\n      </Reveal.Content>\n        </Reveal>\n      );\n      */\n      return _react2.default.createElement(\n        _semanticUiReact.Modal,\n        { trigger: children, open: this.state.modalOpen },\n        _react2.default.createElement(\n          _semanticUiReact.Modal.Header,\n          null,\n          type.toLowerCase() === \"user\" ? \"Profile Picture Upload\" : \"Event Image Upload\"\n        ),\n        _react2.default.createElement(\n          _semanticUiReact.Modal.Description,\n          null,\n          _react2.default.createElement(\n            _semanticUiReact.Container,\n            { style: styles.modalContentWrap },\n            _react2.default.createElement(\n              _semanticUiReact.Form,\n              { onSubmit: function onSubmit(e) {\n                  return _this2.onFormSubmit(e);\n                } },\n              _react2.default.createElement('input', { style: styles.fileStyle,\n                name: 'file', id: 'file',\n                type: 'file', onChange: this.onChange,\n                accept: 'image/*'\n              }),\n              _react2.default.createElement(\n                'label',\n                { htmlFor: 'file', style: styles.labelStyle },\n                label\n              ),\n              _react2.default.createElement(\n                _semanticUiReact.Form.Button,\n                {\n                  color: 'purple', type: 'submit'\n                },\n                ' Upload'\n              )\n            )\n          )\n        )\n      );\n    }\n  }]);\n\n  return UploadModal;\n}(_react.Component);\n\n;\n\nvar styles = {\n  fileStyle: {\n    width: \"0.1px\",\n    height: \"0.1px\",\n    opacity: \"0\",\n    overflow: \"hidden\",\n    position: \"absolute\",\n    zIndex: \"-1\"\n  },\n  labelStyle: {\n    border: \"2px solid black\",\n    borderRadius: \"4px\",\n    cursor: 'pointer',\n    fontSize: \"1.25em\",\n    fontWeight: \"700\",\n    padding: \"1em\",\n    margin: \"1em\",\n    display: \"inline-block\"\n  },\n  modalContentWrap: {\n    padding: '1em'\n  }\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {};\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return (0, _redux.bindActionCreators)({\n    uploadEventImage: _index.uploadEventImage,\n    uploadUserImage: _index.uploadUserImage\n  }, dispatch);\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UploadModal);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODM0LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2NvbXBvbmVudHMvY29tbW9uL1VwbG9hZE1vZGFsLmpzPzQ3YmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyB1cGxvYWRVc2VySW1hZ2UsIHVwbG9hZEV2ZW50SW1hZ2UgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4JztcblxuaW1wb3J0IHsgQnV0dG9uLCBDb250YWluZXIsIEZvcm0sIEhlYWRlciwgTW9kYWwsIFJldmVhbCB9IGZyb20gJ3NlbWFudGljLXVpLXJlYWN0J1xuXG4vLyBVcGxvYWQgTW9kYWwgLSBXcmFwcGVyIC0gdG9kbzogdmFsaWRhdGUgZmlsZXNpemVcbmNsYXNzIFVwbG9hZE1vZGFsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGZpbGU6IG51bGwsXG4gICAgICBtb2RhbE9wZW46IHByb3BzLm9wZW5Nb2RhbFxuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpXG4gIH1cblxuICBvbkZvcm1TdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5wcm9wcy50eXBlLnRvTG93ZXJDYXNlKCkgPT09IFwidXNlclwiKVxuICAgICAgdGhpcy5wcm9wcy51cGxvYWRVc2VySW1hZ2UodGhpcy5zdGF0ZSk7XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLnVwbG9hZEV2ZW50SW1hZ2UodGhpcy5zdGF0ZSwgdGhpcy5wcm9wcy5pZCk7XG4gICAgfVxuXG4gIH1cblxuICBvbkNoYW5nZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZmlsZTplLnRhcmdldC5maWxlc1swXX0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnNvbGUubG9nKFwiUmVuZGVyaW5nIGFnYWluXCIpO1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIGlkLCB0eXBlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgZmlsZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAvLyBwcm9jZXNzIGZpbGVuYW1lIHJlYWwgZmFzdFxuICAgIGNvbnN0IGxhYmVsID0gZmlsZSA/XG5cdFx0ICAoZmlsZS5uYW1lLmxlbmd0aCA+IDE0ID9cblx0XHQgICBmaWxlLm5hbWUuc3Vic3RyKDAsIDQpICsgXCIuLi5cIiArIGZpbGUubmFtZS5zdWJzdHIoLTcpIDogZmlsZS5uYW1lKSA6IFwiU2VsZWN0IGEgRmlsZVwiO1xuICAgIC8qIC8vIEJ1Z2dlZFxuICAgIGNvbnN0IHRyaWdnZXIgPSAoXG4gICAgICA8UmV2ZWFsIGFuaW1hdGVkPVwiZmFkZVwiPlxuXHQ8UmV2ZWFsLkNvbnRlbnQgdmlzaWJsZT5cblx0ICB7Y2hpbGRyZW59XG5cdDwvUmV2ZWFsLkNvbnRlbnQ+XG5cdDxSZXZlYWwuQ29udGVudCBoaWRkZW4+XG5cdCAgPENvbnRhaW5lcj5cblx0ICAgIFRlc3RzXG5cdCAgPC9Db250YWluZXI+XG5cdDwvUmV2ZWFsLkNvbnRlbnQ+XG4gICAgICA8L1JldmVhbD5cbiAgICApO1xuICAgICovXG4gICAgcmV0dXJuIChcbiAgICAgIDxNb2RhbCB0cmlnZ2VyPXtjaGlsZHJlbn0gb3Blbj17dGhpcy5zdGF0ZS5tb2RhbE9wZW59PlxuXHQ8TW9kYWwuSGVhZGVyPlxuXHQgIHt0eXBlLnRvTG93ZXJDYXNlKCkgPT09IFwidXNlclwiID9cblx0ICAgXCJQcm9maWxlIFBpY3R1cmUgVXBsb2FkXCIgOiBcIkV2ZW50IEltYWdlIFVwbG9hZFwifVxuXHQ8L01vZGFsLkhlYWRlcj5cblx0PE1vZGFsLkRlc2NyaXB0aW9uPlxuXHQgIDxDb250YWluZXIgc3R5bGU9e3N0eWxlcy5tb2RhbENvbnRlbnRXcmFwfT5cbiAgICAgICAgICAgIDxGb3JtIG9uU3VibWl0PXtlID0+IHRoaXMub25Gb3JtU3VibWl0KGUpfT5cblx0ICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXMuZmlsZVN0eWxlfVxuXHRcdCAgICAgbmFtZT1cImZpbGVcIiBpZD1cImZpbGVcIlxuXHRcdCAgICAgdHlwZT1cImZpbGVcIiBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX1cblx0XHQgICAgIGFjY2VwdD1cImltYWdlLypcIlxuXHQgICAgICAvPlxuXHQgICAgICA8bGFiZWwgaHRtbEZvcj1cImZpbGVcIiBzdHlsZT17c3R5bGVzLmxhYmVsU3R5bGV9PlxuXHRcdHsgbGFiZWwgfVxuXHQgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8Rm9ybS5CdXR0b25cblx0XHRjb2xvcj1cInB1cnBsZVwiIHR5cGU9XCJzdWJtaXRcIlxuXHQgICAgICA+IFVwbG9hZFxuXHQgICAgICA8L0Zvcm0uQnV0dG9uPlxuICAgICAgICAgICAgPC9Gb3JtPlxuXHQgIDwvQ29udGFpbmVyPlxuXHQ8L01vZGFsLkRlc2NyaXB0aW9uPlxuICAgICAgPC9Nb2RhbD5cbiAgICApXG4gIH1cbn07XG5cbmNvbnN0IHN0eWxlcyA9IHtcbiAgZmlsZVN0eWxlOiB7XG4gICAgd2lkdGg6IFwiMC4xcHhcIixcbiAgICBoZWlnaHQ6IFwiMC4xcHhcIixcbiAgICBvcGFjaXR5OiBcIjBcIixcbiAgICBvdmVyZmxvdzogXCJoaWRkZW5cIixcbiAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgIHpJbmRleDogXCItMVwiXG4gIH0sXG4gIGxhYmVsU3R5bGU6IHtcbiAgICBib3JkZXI6IFwiMnB4IHNvbGlkIGJsYWNrXCIsXG4gICAgYm9yZGVyUmFkaXVzOiBcIjRweFwiLFxuICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGZvbnRTaXplOiBcIjEuMjVlbVwiLFxuICAgIGZvbnRXZWlnaHQ6IFwiNzAwXCIsXG4gICAgcGFkZGluZzogXCIxZW1cIixcbiAgICBtYXJnaW46IFwiMWVtXCIsXG4gICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIlxuICB9LFxuICBtb2RhbENvbnRlbnRXcmFwOiB7XG4gICAgcGFkZGluZzogJzFlbSdcbiAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XG4gIHJldHVybiB7fTtcbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9ycyh7XG4gICAgdXBsb2FkRXZlbnRJbWFnZSxcbiAgICB1cGxvYWRVc2VySW1hZ2VcbiAgfSwgZGlzcGF0Y2gpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShVcGxvYWRNb2RhbCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvY29tcG9uZW50cy9jb21tb24vVXBsb2FkTW9kYWwuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FBQ0E7QUFDQTs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFOQTtBQU9BO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTs7O0FBRUE7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUNBO0FBQUE7QUFHQTs7Ozs7Ozs7Ozs7Ozs7QUFjQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBSUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFUQTtBQURBO0FBREE7QUFMQTtBQXlCQTs7OztBQXhFQTtBQUNBO0FBd0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFSQTtBQVVBO0FBQ0E7QUFEQTtBQW5CQTtBQUNBO0FBdUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///834\n");

/***/ })

})