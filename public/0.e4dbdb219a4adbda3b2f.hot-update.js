webpackHotUpdate(0,{

/***/ 823:
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./frontend/components/forms/ProfileForm.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ 14);\n\nvar _redux = __webpack_require__(/*! redux */ 19);\n\nvar _lodash = __webpack_require__(/*! lodash */ 85);\n\nvar _semanticUiReact = __webpack_require__(/*! semantic-ui-react */ 11);\n\nvar _actions = __webpack_require__(/*! ../../actions */ 22);\n\nvar _ = __webpack_require__(/*! ./ */ 137);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// ProfileForm that takes soft field props (targets)\nvar ProfileForm = function (_Component) {\n  _inherits(ProfileForm, _Component);\n\n  function ProfileForm(props) {\n    _classCallCheck(this, ProfileForm);\n\n    var _this = _possibleConstructorReturn(this, (ProfileForm.__proto__ || Object.getPrototypeOf(ProfileForm)).call(this, props));\n\n    _this.regLegalTest = function (field, val) {\n      if (_this.targets[field]) {\n        return _this.targets[field][\"isLegal\"](val);\n      } else return true;\n    };\n\n    _this.regFinalTest = function (field, val) {\n      if (!val) return false; // no falsey!\n      if (_this.targets[field]) {\n        if (\"isFinal\" in _this.targets[field]) return _this.targets[field][\"isFinal\"](val);\n        return _this.targets[field][\"isLegal\"](val) && val.length !== 0; // Fallback\n      }\n      return true; // Field not found in targets, no restrictions\n    };\n\n    _this.changeFunctionFactory = function (field, warningMessage, filter) {\n      return function (e) {\n        if (_this.regLegalTest(field, e.target.value)) {\n          _this.props.setValid();\n          _this.setState({\n            userData: _extends({}, _this.state.userData, _defineProperty({}, field, filter ? filter(e.target.value) : e.target.value))\n          });\n          _this.updateStatus(field, 0);\n        } else {\n          _this.props.setError(warningMessage);\n        }\n      };\n    };\n\n    _this.updateStatus = function (field, val, cb) {\n      _this.setState({\n        status: _extends({}, _this.state.status, _defineProperty({}, field, val))\n      }, function () {\n        if (cb) _this.verifyCb();\n      });\n    };\n\n    _this.verifyCb = function () {\n      if (_this.verifyAll()) {\n        _this.props.setComplete();\n      }\n    };\n\n    _this.blurFunctions = {// Implement finer control here\n    };\n\n    _this.blurFunctionFactory = function (field) {\n      return function (e) {\n        if (_this.regFinalTest(field, e.target.value)) {\n          _this.props.setValid();\n          _this.updateStatus(field, 0, true);\n        } else {\n          _this.props.setError();\n          _this.updateStatus(field, 1, true);\n        }\n      };\n    };\n\n    _this.verifyAll = function () {\n      var status = _this.state.status;\n\n      return Object.keys(status).every(function (k) {\n        return status[k] === 0;\n      });\n    };\n\n    _this.errorFactory = function (field) {\n      return _this.state.status[field] === 1;\n    };\n\n    _this.onSubmit = function () {\n      var userData = _this.state.userData;\n\n      if (_this.verifyAll()) {\n        // diff the objects\n        var changedKeys = Object.keys(_this.state.userData).filter(function (key) {\n          return _this.state.cachedData[key] !== _this.state.userData[key];\n        });\n        var diffDict = {};\n        changedKeys.forEach(function (key) {\n          diffDict[key] = _this.state.userData[key];\n        });\n        if (Object.keys(diffDict).length === 0) _this.props.setError(\"No fields have changed!\");else {\n          _this.props.upsertUser(_extends({}, diffDict, { _id: _this.props.user._id }));\n          // optimistic update\n          _this.setState({ cachedData: _this.state.userData });\n        }\n      } else {\n        _this.props.setError(\"The form is completed incorrectly.\");\n      }\n    };\n\n    var user = props.user,\n        targets = props.targets;\n\n    _this.targets = targets;\n    var initStatus = {};\n    var initData = {};\n\n    Object.keys(_this.targets).forEach(function (tar) {\n      initData[tar] = user[tar] ? user[tar] : \"\";\n      initStatus[tar] = _this.regFinalTest(tar, user[tar] ? user[tar] : \"\") ? 0 : -1;\n    });\n\n    _this.state = {\n      status: initStatus,\n      userData: initData,\n      cachedData: initData\n    };\n    _this.handleChangeDropdown = _this.handleChangeDropdown.bind(_this);\n    return _this;\n  }\n\n  // Filter is what filter to apply to value into state\n\n\n  _createClass(ProfileForm, [{\n    key: 'handleChangeDropdown',\n    value: function handleChangeDropdown(event) {\n      console.log(event.toString());\n      this.setState({\n        userData: _extends({}, this.state.userData, _defineProperty({}, 'grade', event.value))\n      });\n    }\n\n    // verify cb\n\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this2 = this;\n\n      var userData = this.state.userData;\n      var _props = this.props,\n          setError = _props.setError,\n          setValid = _props.setValid,\n          setComplete = _props.setComplete,\n          setMessage = _props.setMessage;\n\n      var grade_options = [{ value: 6, label: 6 }, { value: 7, label: 7 }, { value: 8, label: 8 }, { value: 9, label: 9 }, { value: 10, label: 10 }, { value: 11, label: 11 }, { value: 12, label: 12 }];\n\n      return _react2.default.createElement(\n        'div',\n        null,\n        _react2.default.createElement(\n          _semanticUiReact.Form,\n          null,\n          Object.keys(this.targets).map(function (key) {\n            var tar = _this2.targets[key];\n            console.log(userData[key]);\n            if (key == 'grade') {\n              return _react2.default.createElement(_semanticUiReact.Form.Select, {\n                key: 'profile' + key\n                //inline transparent\n                , label: tar.label ? tar.label : (0, _lodash.startCase)(key),\n                error: _this2.errorFactory(key),\n                name: key\n                //type={tar.type ? tar.type : \"text\"}\n                , value: userData[key],\n                onChange: _this2.handleChangeDropdown,\n                onBlur: _this2.blurFunctionFactory(key),\n                options: grade_options\n              });\n            } else {\n              return _react2.default.createElement(_semanticUiReact.Form.Input, {\n                key: 'profile' + key\n                //inline transparent\n                , label: tar.label ? tar.label : (0, _lodash.startCase)(key),\n                error: _this2.errorFactory(key),\n                name: key,\n                type: tar.type ? tar.type : \"text\",\n                value: userData[key],\n                onChange: _this2.changeFunctionFactory(key, tar.constraintMsg ? tar.constraintMsg : \"Invalid character\"),\n                onBlur: _this2.blurFunctionFactory(key)\n              });\n            }\n          }),\n          _react2.default.createElement(_semanticUiReact.Form.Button, {\n            color: 'violet',\n            onClick: this.onSubmit,\n            content: 'Save Profile',\n            type: 'submit'\n          })\n        )\n      );\n    }\n  }]);\n\n  return ProfileForm;\n}(_react.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    errorMessage: state.errorMessage,\n    modalLoaderActive: state.modalLoaderActive,\n    user: state.user,\n    error: state.error\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return (0, _redux.bindActionCreators)({\n    upsertUser: _actions.upsertUser\n  }, dispatch);\n};\n\nexports.default = (0, _.formWrapper)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ProfileForm));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODIzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2NvbXBvbmVudHMvZm9ybXMvUHJvZmlsZUZvcm0uanM/OGM2MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNhcGl0YWxpemUgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQnV0dG9uLCBEaXZpZGVyLCBGb3JtIH0gZnJvbSAnc2VtYW50aWMtdWktcmVhY3QnO1xuaW1wb3J0IHsgZmV0Y2hVc2VycywgdXBzZXJ0VXNlciB9IGZyb20gJy4uLy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgZm9ybVdyYXBwZXIgfSBmcm9tICcuLyc7XG5pbXBvcnQgeyBzdGFydENhc2UgfSBmcm9tICdsb2Rhc2gnO1xuXG4vLyBQcm9maWxlRm9ybSB0aGF0IHRha2VzIHNvZnQgZmllbGQgcHJvcHMgKHRhcmdldHMpXG5jbGFzcyBQcm9maWxlRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgeyB1c2VyLCB0YXJnZXRzIH0gPSBwcm9wcztcbiAgICB0aGlzLnRhcmdldHMgPSB0YXJnZXRzO1xuICAgIGxldCBpbml0U3RhdHVzID0ge307XG4gICAgbGV0IGluaXREYXRhID0ge307XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLnRhcmdldHMpLmZvckVhY2goIHRhciA9PiB7XG4gICAgICBpbml0RGF0YVt0YXJdID0gdXNlclt0YXJdID8gdXNlclt0YXJdIDogXCJcIjtcbiAgICAgIGluaXRTdGF0dXNbdGFyXSA9IHRoaXMucmVnRmluYWxUZXN0KHRhciwgdXNlclt0YXJdID8gdXNlclt0YXJdIDogXCJcIikgPyAwOiAtMTtcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGF0dXM6IGluaXRTdGF0dXMsXG4gICAgICB1c2VyRGF0YTogaW5pdERhdGEsXG4gICAgICBjYWNoZWREYXRhOiBpbml0RGF0YVxuICAgIH1cbiAgICB0aGlzLmhhbmRsZUNoYW5nZURyb3Bkb3duID0gdGhpcy5oYW5kbGVDaGFuZ2VEcm9wZG93bi5iaW5kKHRoaXMpO1xuICB9XG5cbiAgcmVnTGVnYWxUZXN0ID0gKGZpZWxkLCB2YWwpID0+IHtcbiAgICBpZiAodGhpcy50YXJnZXRzW2ZpZWxkXSkge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0c1tmaWVsZF1bXCJpc0xlZ2FsXCJdKHZhbCk7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVnRmluYWxUZXN0ID0gKGZpZWxkLCB2YWwpID0+IHtcbiAgICBpZiAoIXZhbCkgcmV0dXJuIGZhbHNlOyAvLyBubyBmYWxzZXkhXG4gICAgaWYgKHRoaXMudGFyZ2V0c1tmaWVsZF0pIHtcbiAgICAgIGlmIChcImlzRmluYWxcIiBpbiB0aGlzLnRhcmdldHNbZmllbGRdKVxuXHRyZXR1cm4gdGhpcy50YXJnZXRzW2ZpZWxkXVtcImlzRmluYWxcIl0odmFsKTtcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldHNbZmllbGRdW1wiaXNMZWdhbFwiXSh2YWwpICYmIHZhbC5sZW5ndGggIT09IDA7IC8vIEZhbGxiYWNrXG4gICAgfVxuICAgIHJldHVybiB0cnVlOyAvLyBGaWVsZCBub3QgZm91bmQgaW4gdGFyZ2V0cywgbm8gcmVzdHJpY3Rpb25zXG4gIH1cblxuICAvLyBGaWx0ZXIgaXMgd2hhdCBmaWx0ZXIgdG8gYXBwbHkgdG8gdmFsdWUgaW50byBzdGF0ZVxuICBjaGFuZ2VGdW5jdGlvbkZhY3RvcnkgPSAoZmllbGQsIHdhcm5pbmdNZXNzYWdlLCBmaWx0ZXIpID0+IHtcbiAgICByZXR1cm4gZSA9PiB7XG4gICAgICBpZiAodGhpcy5yZWdMZWdhbFRlc3QoZmllbGQsIGUudGFyZ2V0LnZhbHVlKSkge1xuXHR0aGlzLnByb3BzLnNldFZhbGlkKCk7XG5cdHRoaXMuc2V0U3RhdGUoe1xuXHQgIHVzZXJEYXRhOiB7IC4uLnRoaXMuc3RhdGUudXNlckRhdGEsXG5cdFx0ICAgICAgW2ZpZWxkXTogKGZpbHRlciA/IGZpbHRlcihlLnRhcmdldC52YWx1ZSkgOiBlLnRhcmdldC52YWx1ZSl9XG5cdH0pO1xuXHR0aGlzLnVwZGF0ZVN0YXR1cyhmaWVsZCwgMCk7XG4gICAgICB9IGVsc2Uge1xuXHR0aGlzLnByb3BzLnNldEVycm9yKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VEcm9wZG93bihldmVudCl7XG4gICAgY29uc29sZS5sb2coZXZlbnQudG9TdHJpbmcoKSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gIFx0ICB1c2VyRGF0YTogeyAuLi50aGlzLnN0YXRlLnVzZXJEYXRhLFxuICBcdFx0ICAgICAgWydncmFkZSddOiBldmVudC52YWx1ZX1cbiAgXHR9KTtcblxuICB9XG5cbiAgLy8gdmVyaWZ5IGNiXG4gIHVwZGF0ZVN0YXR1cyA9IChmaWVsZCwgdmFsLCBjYikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3RhdHVzOiB7IC4uLnRoaXMuc3RhdGUuc3RhdHVzLCBbZmllbGRdOiB2YWwgfVxuICAgIH0sICgpID0+IHtpZiAoY2IpIHRoaXMudmVyaWZ5Q2IoKTt9KTtcbiAgfVxuXG4gIHZlcmlmeUNiID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnZlcmlmeUFsbCgpKSB7XG4gICAgICB0aGlzLnByb3BzLnNldENvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgYmx1ckZ1bmN0aW9ucyA9IHsgLy8gSW1wbGVtZW50IGZpbmVyIGNvbnRyb2wgaGVyZVxuICB9XG5cbiAgYmx1ckZ1bmN0aW9uRmFjdG9yeSA9IGZpZWxkID0+IChlKSA9PiB7XG4gICAgaWYgKHRoaXMucmVnRmluYWxUZXN0KGZpZWxkLCBlLnRhcmdldC52YWx1ZSkpIHtcbiAgICAgIHRoaXMucHJvcHMuc2V0VmFsaWQoKTtcbiAgICAgIHRoaXMudXBkYXRlU3RhdHVzKGZpZWxkLCAwLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wcy5zZXRFcnJvcigpO1xuICAgICAgdGhpcy51cGRhdGVTdGF0dXMoZmllbGQsIDEsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHZlcmlmeUFsbCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHN0YXR1cyB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc3RhdHVzKS5ldmVyeShrID0+IHN0YXR1c1trXSA9PT0gMClcbiAgfVxuXG4gIGVycm9yRmFjdG9yeSA9IGZpZWxkID0+IHRoaXMuc3RhdGUuc3RhdHVzW2ZpZWxkXSA9PT0gMVxuXG4gIG9uU3VibWl0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgdXNlckRhdGEgfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKHRoaXMudmVyaWZ5QWxsKCkpIHtcbiAgICAgIC8vIGRpZmYgdGhlIG9iamVjdHNcbiAgICAgIGNvbnN0IGNoYW5nZWRLZXlzID0gT2JqZWN0LmtleXModGhpcy5zdGF0ZS51c2VyRGF0YSkuZmlsdGVyKGtleSA9PiB0aGlzLnN0YXRlLmNhY2hlZERhdGFba2V5XSAhPT0gdGhpcy5zdGF0ZS51c2VyRGF0YVtrZXldKTtcbiAgICAgIGxldCBkaWZmRGljdD0ge307XG4gICAgICBjaGFuZ2VkS2V5cy5mb3JFYWNoKGtleSA9PiB7XG5cdGRpZmZEaWN0W2tleV0gPSB0aGlzLnN0YXRlLnVzZXJEYXRhW2tleV07XG4gICAgICB9KTtcbiAgICAgIGlmIChPYmplY3Qua2V5cyhkaWZmRGljdCkubGVuZ3RoID09PSAwKVxuXHR0aGlzLnByb3BzLnNldEVycm9yKFwiTm8gZmllbGRzIGhhdmUgY2hhbmdlZCFcIik7XG4gICAgICBlbHNlIHtcblx0dGhpcy5wcm9wcy51cHNlcnRVc2VyKHsgLi4uZGlmZkRpY3QsIF9pZDogdGhpcy5wcm9wcy51c2VyLl9pZCB9KTtcblx0Ly8gb3B0aW1pc3RpYyB1cGRhdGVcblx0dGhpcy5zZXRTdGF0ZSh7Y2FjaGVkRGF0YTogdGhpcy5zdGF0ZS51c2VyRGF0YX0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLnNldEVycm9yKFwiVGhlIGZvcm0gaXMgY29tcGxldGVkIGluY29ycmVjdGx5LlwiKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB1c2VyRGF0YSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IHNldEVycm9yLCBzZXRWYWxpZCwgc2V0Q29tcGxldGUsIHNldE1lc3NhZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZ3JhZGVfb3B0aW9ucyA9IFtcbiAgICAgIHsgdmFsdWU6IDYsIGxhYmVsOiA2IH0sXG4gICAgICB7IHZhbHVlOiA3LCBsYWJlbDogNyB9LFxuICAgICAgeyB2YWx1ZTogOCwgbGFiZWw6IDggfSxcbiAgICAgIHsgdmFsdWU6IDksIGxhYmVsOiA5IH0sXG4gICAgICB7IHZhbHVlOiAxMCwgbGFiZWw6IDEwIH0sXG4gICAgICB7IHZhbHVlOiAxMSwgbGFiZWw6IDExIH0sXG4gICAgICB7IHZhbHVlOiAxMiwgbGFiZWw6IDEyIH1cbiAgICBdO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG5cdDxGb3JtPlxuXHQgIHtcblx0ICAgIE9iamVjdC5rZXlzKHRoaXMudGFyZ2V0cykubWFwKCBrZXkgPT4ge1xuXHQgICAgICBjb25zdCB0YXIgPSB0aGlzLnRhcmdldHNba2V5XTtcbiAgICAgICAgY29uc29sZS5sb2codXNlckRhdGFba2V5XSlcbiAgICAgICAgaWYoa2V5PT0nZ3JhZGUnKXtcbiAgICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8Rm9ybS5TZWxlY3RcbiAgICAgICAgXHRcdCAga2V5PXtgcHJvZmlsZSR7a2V5fWB9XG4gICAgICAgIFx0XHQgIC8vaW5saW5lIHRyYW5zcGFyZW50XG4gICAgICAgICAgICAgIGxhYmVsPXt0YXIubGFiZWwgPyB0YXIubGFiZWwgOiBzdGFydENhc2Uoa2V5KX1cbiAgICAgICAgXHRcdCAgZXJyb3I9e3RoaXMuZXJyb3JGYWN0b3J5KGtleSl9XG4gICAgICAgIFx0XHQgIG5hbWU9e2tleX1cbiAgICAgICAgXHQgICAgICAgICAgLy90eXBlPXt0YXIudHlwZSA/IHRhci50eXBlIDogXCJ0ZXh0XCJ9XG4gICAgICAgIFx0ICAgICAgICAgIHZhbHVlPXt1c2VyRGF0YVtrZXldfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VEcm9wZG93bn1cbiAgICAgICAgXHQgICAgICAgICAgb25CbHVyPXt0aGlzLmJsdXJGdW5jdGlvbkZhY3Rvcnkoa2V5KX1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17Z3JhZGVfb3B0aW9uc31cbiAgICAgICAgXHRcdC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGb3JtLklucHV0XG4gICAgICAgIFx0XHQgIGtleT17YHByb2ZpbGUke2tleX1gfVxuICAgICAgICBcdFx0ICAvL2lubGluZSB0cmFuc3BhcmVudFxuICAgICAgICBcdFx0ICBsYWJlbD17dGFyLmxhYmVsID8gdGFyLmxhYmVsIDogc3RhcnRDYXNlKGtleSl9XG4gICAgICAgIFx0XHQgIGVycm9yPXt0aGlzLmVycm9yRmFjdG9yeShrZXkpfVxuICAgICAgICBcdFx0ICBuYW1lPXtrZXl9XG4gICAgICAgIFx0ICAgICAgICAgIHR5cGU9e3Rhci50eXBlID8gdGFyLnR5cGUgOiBcInRleHRcIn1cbiAgICAgICAgXHQgICAgICAgICAgdmFsdWU9e3VzZXJEYXRhW2tleV19XG4gICAgICAgIFx0ICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoYW5nZUZ1bmN0aW9uRmFjdG9yeShrZXksIHRhci5jb25zdHJhaW50TXNnID8gdGFyLmNvbnN0cmFpbnRNc2cgOiBcIkludmFsaWQgY2hhcmFjdGVyXCIpfVxuICAgICAgICBcdCAgICAgICAgICBvbkJsdXI9e3RoaXMuYmx1ckZ1bmN0aW9uRmFjdG9yeShrZXkpfVxuICAgICAgICBcdFx0Lz5cbiAgICAgICAgICApO1xuICAgICAgfX0pXG5cdCAgfVxuXHQgIDxGb3JtLkJ1dHRvblxuXHQgICAgY29sb3I9XCJ2aW9sZXRcIlxuXHQgICAgb25DbGljaz17dGhpcy5vblN1Ym1pdH1cblx0ICAgIGNvbnRlbnQ9J1NhdmUgUHJvZmlsZSdcblx0ICAgIHR5cGU9J3N1Ym1pdCdcblx0ICAvPlxuXHQ8L0Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGVycm9yTWVzc2FnZTogc3RhdGUuZXJyb3JNZXNzYWdlLFxuICAgIG1vZGFsTG9hZGVyQWN0aXZlOiBzdGF0ZS5tb2RhbExvYWRlckFjdGl2ZSxcbiAgICB1c2VyOiBzdGF0ZS51c2VyLFxuICAgIGVycm9yOiBzdGF0ZS5lcnJvclxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICB1cHNlcnRVc2VyOiB1cHNlcnRVc2VyXG4gIH0sIGRpc3BhdGNoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JtV3JhcHBlcihjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wc1xuKShQcm9maWxlRm9ybSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2NvbXBvbmVudHMvZm9ybXMvUHJvZmlsZUZvcm0uanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBcUJBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUEzQkE7QUE2QkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXJDQTtBQXdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXJEQTtBQWlFQTtBQUNBO0FBREE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQXJFQTtBQXVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBM0VBO0FBNEVBO0FBQ0E7QUE3RUE7QUErRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFDQTtBQWhGQTtBQXlGQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQTdGQTtBQThGQTtBQUFBO0FBQ0E7QUEvRkE7QUFnR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBcEhBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQWpCQTtBQWtCQTtBQUNBO0FBbUJBO0FBQ0E7QUFDQTs7O0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUtBO0FBQ0E7QUFDQTtBQUNBOzs7QUFxREE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBU0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBVkE7QUFhQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFZQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBcENBO0FBREE7QUE4Q0E7Ozs7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///823\n");

/***/ })

})