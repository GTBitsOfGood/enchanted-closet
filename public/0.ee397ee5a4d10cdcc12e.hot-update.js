webpackHotUpdate(0,{

/***/ 834:
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./frontend/components/common/UploadModal.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ 16);\n\nvar _redux = __webpack_require__(/*! redux */ 21);\n\nvar _index = __webpack_require__(/*! ../../actions/index */ 23);\n\nvar _semanticUiReact = __webpack_require__(/*! semantic-ui-react */ 9);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// Upload Modal - Wrapper - todo: validate filesize\nvar UploadModal = function (_Component) {\n  _inherits(UploadModal, _Component);\n\n  function UploadModal(props) {\n    _classCallCheck(this, UploadModal);\n\n    var _this = _possibleConstructorReturn(this, (UploadModal.__proto__ || Object.getPrototypeOf(UploadModal)).call(this, props));\n\n    _this.state = {\n      file: null,\n      modalOpen: false\n    };\n    _this.onChange = _this.onChange.bind(_this);\n    return _this;\n  }\n\n  _createClass(UploadModal, [{\n    key: 'onFormSubmit',\n    value: function onFormSubmit(e) {\n      e.preventDefault();\n      this.handleClose();\n      if (this.props.type.toLowerCase() === \"user\") this.props.uploadUserImage(this.state);else {\n        this.props.uploadEventImage(this.state, this.props.id);\n      }\n    }\n  }, {\n    key: 'onChange',\n    value: function onChange(e) {\n      this.setState({ file: e.target.files[0] });\n    }\n  }, {\n    key: 'handleOpen',\n    value: function handleOpen() {\n      this.setState({ modalOpen: true });\n    }\n  }, {\n    key: 'handleClose',\n    value: function handleClose() {\n      this.setState({ modalOpen: false });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this2 = this;\n\n      console.log(this.props.url);\n      var _props = this.props,\n          url = _props.url,\n          id = _props.id,\n          type = _props.type,\n          style = _props.style;\n      var file = this.state.file;\n      // process filename real fast\n\n      var label = file ? file.name.length > 14 ? file.name.substr(0, 4) + \"...\" + file.name.substr(-7) : file.name : \"Select a File\";\n      /* // Bugged\n      const trigger = (\n        <Reveal animated=\"fade\">\n      <Reveal.Content visible>\n      {children}\n      </Reveal.Content>\n      <Reveal.Content hidden>\n      <Container>\n       Tests\n      </Container>\n      </Reveal.Content>\n        </Reveal>\n      );\n      */\n      return _react2.default.createElement(\n        _semanticUiReact.Modal,\n        { trigger: _react2.default.createElement(_semanticUiReact.Image, {\n            style: style,\n            src: url,\n            size: 'medium',\n            onClick: this.handleOpen.bind(this)\n          }), open: this.state.modalOpen, onClose: this.handleClose.bind(this) },\n        _react2.default.createElement(\n          _semanticUiReact.Modal.Header,\n          null,\n          type.toLowerCase() === \"user\" ? \"Profile Picture Upload\" : \"Event Image Upload\"\n        ),\n        _react2.default.createElement(\n          _semanticUiReact.Modal.Description,\n          null,\n          _react2.default.createElement(\n            _semanticUiReact.Container,\n            { style: styles.modalContentWrap },\n            _react2.default.createElement(\n              _semanticUiReact.Form,\n              { onSubmit: function onSubmit(e) {\n                  return _this2.onFormSubmit(e);\n                } },\n              _react2.default.createElement('input', { style: styles.fileStyle,\n                name: 'file', id: 'file',\n                type: 'file', onChange: this.onChange,\n                accept: 'image/*'\n              }),\n              _react2.default.createElement(\n                'label',\n                { htmlFor: 'file', style: styles.labelStyle },\n                label\n              ),\n              _react2.default.createElement(\n                _semanticUiReact.Form.Button,\n                {\n                  color: 'purple', type: 'submit'\n                },\n                ' Upload'\n              )\n            )\n          )\n        )\n      );\n    }\n  }]);\n\n  return UploadModal;\n}(_react.Component);\n\n;\n\nvar styles = {\n  fileStyle: {\n    width: \"0.1px\",\n    height: \"0.1px\",\n    opacity: \"0\",\n    overflow: \"hidden\",\n    position: \"absolute\",\n    zIndex: \"-1\"\n  },\n  labelStyle: {\n    border: \"2px solid black\",\n    borderRadius: \"4px\",\n    cursor: 'pointer',\n    fontSize: \"1.25em\",\n    fontWeight: \"700\",\n    padding: \"1em\",\n    margin: \"1em\",\n    display: \"inline-block\"\n  },\n  modalContentWrap: {\n    padding: '1em'\n  }\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {};\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return (0, _redux.bindActionCreators)({\n    uploadEventImage: _index.uploadEventImage,\n    uploadUserImage: _index.uploadUserImage\n  }, dispatch);\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UploadModal);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODM0LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2NvbXBvbmVudHMvY29tbW9uL1VwbG9hZE1vZGFsLmpzPzQ3YmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyB1cGxvYWRVc2VySW1hZ2UsIHVwbG9hZEV2ZW50SW1hZ2UgfSBmcm9tICcuLi8uLi9hY3Rpb25zL2luZGV4JztcblxuaW1wb3J0IHsgQnV0dG9uLCBDb250YWluZXIsIEZvcm0sIEhlYWRlciwgTW9kYWwsIFJldmVhbCwgSW1hZ2UgfSBmcm9tICdzZW1hbnRpYy11aS1yZWFjdCdcblxuLy8gVXBsb2FkIE1vZGFsIC0gV3JhcHBlciAtIHRvZG86IHZhbGlkYXRlIGZpbGVzaXplXG5jbGFzcyBVcGxvYWRNb2RhbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBmaWxlOiBudWxsLFxuICAgICAgbW9kYWxPcGVuOiBmYWxzZVxuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpXG4gIH1cblxuICBvbkZvcm1TdWJtaXQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmhhbmRsZUNsb3NlKCk7XG4gICAgaWYgKHRoaXMucHJvcHMudHlwZS50b0xvd2VyQ2FzZSgpID09PSBcInVzZXJcIilcbiAgICAgIHRoaXMucHJvcHMudXBsb2FkVXNlckltYWdlKHRoaXMuc3RhdGUpO1xuICAgIGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy51cGxvYWRFdmVudEltYWdlKHRoaXMuc3RhdGUsIHRoaXMucHJvcHMuaWQpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2hhbmdlKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtmaWxlOmUudGFyZ2V0LmZpbGVzWzBdfSk7XG4gIH1cbiAgaGFuZGxlT3Blbigpe1xuICAgIHRoaXMuc2V0U3RhdGUoe21vZGFsT3Blbjp0cnVlfSk7XG4gIH1cbiAgaGFuZGxlQ2xvc2UoKXtcbiAgICB0aGlzLnNldFN0YXRlKHttb2RhbE9wZW46ZmFsc2V9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByb3BzLnVybCk7XG4gICAgY29uc3QgeyB1cmwsIGlkLCB0eXBlLCBzdHlsZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGZpbGUgfSA9IHRoaXMuc3RhdGU7XG4gICAgLy8gcHJvY2VzcyBmaWxlbmFtZSByZWFsIGZhc3RcbiAgICBjb25zdCBsYWJlbCA9IGZpbGUgP1xuXHRcdCAgKGZpbGUubmFtZS5sZW5ndGggPiAxNCA/XG5cdFx0ICAgZmlsZS5uYW1lLnN1YnN0cigwLCA0KSArIFwiLi4uXCIgKyBmaWxlLm5hbWUuc3Vic3RyKC03KSA6IGZpbGUubmFtZSkgOiBcIlNlbGVjdCBhIEZpbGVcIjtcbiAgICAvKiAvLyBCdWdnZWRcbiAgICBjb25zdCB0cmlnZ2VyID0gKFxuICAgICAgPFJldmVhbCBhbmltYXRlZD1cImZhZGVcIj5cblx0PFJldmVhbC5Db250ZW50IHZpc2libGU+XG5cdCAge2NoaWxkcmVufVxuXHQ8L1JldmVhbC5Db250ZW50PlxuXHQ8UmV2ZWFsLkNvbnRlbnQgaGlkZGVuPlxuXHQgIDxDb250YWluZXI+XG5cdCAgICBUZXN0c1xuXHQgIDwvQ29udGFpbmVyPlxuXHQ8L1JldmVhbC5Db250ZW50PlxuICAgICAgPC9SZXZlYWw+XG4gICAgKTtcbiAgICAqL1xuICAgIHJldHVybiAoXG4gICAgICA8TW9kYWwgdHJpZ2dlcj17PEltYWdlXG4gICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgc3JjPXt1cmx9XG4gICAgICAgIHNpemU9J21lZGl1bSdcbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPcGVuLmJpbmQodGhpcyl9XG4gICAgICAvPn0gb3Blbj17dGhpcy5zdGF0ZS5tb2RhbE9wZW59IG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2UuYmluZCh0aGlzKX0+XG5cdDxNb2RhbC5IZWFkZXI+XG5cdCAge3R5cGUudG9Mb3dlckNhc2UoKSA9PT0gXCJ1c2VyXCIgP1xuXHQgICBcIlByb2ZpbGUgUGljdHVyZSBVcGxvYWRcIiA6IFwiRXZlbnQgSW1hZ2UgVXBsb2FkXCJ9XG5cdDwvTW9kYWwuSGVhZGVyPlxuXHQ8TW9kYWwuRGVzY3JpcHRpb24+XG5cdCAgPENvbnRhaW5lciBzdHlsZT17c3R5bGVzLm1vZGFsQ29udGVudFdyYXB9PlxuICAgICAgICAgICAgPEZvcm0gb25TdWJtaXQ9e2UgPT4gdGhpcy5vbkZvcm1TdWJtaXQoZSl9PlxuXHQgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlcy5maWxlU3R5bGV9XG5cdFx0ICAgICBuYW1lPVwiZmlsZVwiIGlkPVwiZmlsZVwiXG5cdFx0ICAgICB0eXBlPVwiZmlsZVwiIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdCAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG5cdCAgICAgIC8+XG5cdCAgICAgIDxsYWJlbCBodG1sRm9yPVwiZmlsZVwiIHN0eWxlPXtzdHlsZXMubGFiZWxTdHlsZX0+XG5cdFx0eyBsYWJlbCB9XG5cdCAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxGb3JtLkJ1dHRvblxuXHRcdGNvbG9yPVwicHVycGxlXCIgdHlwZT1cInN1Ym1pdFwiXG5cdCAgICAgID4gVXBsb2FkXG5cdCAgICAgIDwvRm9ybS5CdXR0b24+XG4gICAgICAgICAgICA8L0Zvcm0+XG5cdCAgPC9Db250YWluZXI+XG5cdDwvTW9kYWwuRGVzY3JpcHRpb24+XG4gICAgICA8L01vZGFsPlxuICAgIClcbiAgfVxufTtcblxuY29uc3Qgc3R5bGVzID0ge1xuICBmaWxlU3R5bGU6IHtcbiAgICB3aWR0aDogXCIwLjFweFwiLFxuICAgIGhlaWdodDogXCIwLjFweFwiLFxuICAgIG9wYWNpdHk6IFwiMFwiLFxuICAgIG92ZXJmbG93OiBcImhpZGRlblwiLFxuICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgekluZGV4OiBcIi0xXCJcbiAgfSxcbiAgbGFiZWxTdHlsZToge1xuICAgIGJvcmRlcjogXCIycHggc29saWQgYmxhY2tcIixcbiAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXG4gICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgZm9udFNpemU6IFwiMS4yNWVtXCIsXG4gICAgZm9udFdlaWdodDogXCI3MDBcIixcbiAgICBwYWRkaW5nOiBcIjFlbVwiLFxuICAgIG1hcmdpbjogXCIxZW1cIixcbiAgICBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiXG4gIH0sXG4gIG1vZGFsQ29udGVudFdyYXA6IHtcbiAgICBwYWRkaW5nOiAnMWVtJ1xuICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcbiAgcmV0dXJuIHt9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICB1cGxvYWRFdmVudEltYWdlLFxuICAgIHVwbG9hZFVzZXJJbWFnZVxuICB9LCBkaXNwYXRjaCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFVwbG9hZE1vZGFsKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9jb21wb25lbnRzL2NvbW1vbi9VcGxvYWRNb2RhbC5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUFDQTtBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQU5BO0FBT0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQUE7QUFDQTtBQUFBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQUFBO0FBR0E7Ozs7Ozs7Ozs7Ozs7O0FBY0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFHQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQVRBO0FBREE7QUFEQTtBQVZBO0FBOEJBOzs7O0FBbkZBO0FBQ0E7QUFtRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBVUE7QUFDQTtBQURBO0FBbkJBO0FBQ0E7QUF1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///834\n");

/***/ })

})