webpackHotUpdate(0,{

/***/ 823:
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./frontend/components/forms/ProfileForm.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ 14);\n\nvar _redux = __webpack_require__(/*! redux */ 19);\n\nvar _lodash = __webpack_require__(/*! lodash */ 85);\n\nvar _semanticUiReact = __webpack_require__(/*! semantic-ui-react */ 11);\n\nvar _actions = __webpack_require__(/*! ../../actions */ 22);\n\nvar _ = __webpack_require__(/*! ./ */ 137);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// ProfileForm that takes soft field props (targets)\nvar ProfileForm = function (_Component) {\n  _inherits(ProfileForm, _Component);\n\n  function ProfileForm(props) {\n    _classCallCheck(this, ProfileForm);\n\n    var _this = _possibleConstructorReturn(this, (ProfileForm.__proto__ || Object.getPrototypeOf(ProfileForm)).call(this, props));\n\n    _this.regLegalTest = function (field, val) {\n      if (_this.targets[field]) {\n        return _this.targets[field][\"isLegal\"](val);\n      } else return true;\n    };\n\n    _this.regFinalTest = function (field, val) {\n      if (!val) return false; // no falsey!\n      if (_this.targets[field]) {\n        if (\"isFinal\" in _this.targets[field]) return _this.targets[field][\"isFinal\"](val);\n        return _this.targets[field][\"isLegal\"](val) && val.length !== 0; // Fallback\n      }\n      return true; // Field not found in targets, no restrictions\n    };\n\n    _this.changeFunctionFactory = function (field, warningMessage, filter) {\n      return function (e) {\n        if (_this.regLegalTest(field, e.target.value) || field == 'grade') {\n          _this.props.setValid();\n          _this.setState({\n            userData: _extends({}, _this.state.userData, _defineProperty({}, field, filter ? filter(e.target.value) : e.target.value))\n          });\n          _this.updateStatus(field, 0);\n        } else {\n          _this.props.setError(warningMessage);\n        }\n      };\n    };\n\n    _this.updateStatus = function (field, val, cb) {\n      _this.setState({\n        status: _extends({}, _this.state.status, _defineProperty({}, field, val))\n      }, function () {\n        if (cb) _this.verifyCb();\n      });\n    };\n\n    _this.verifyCb = function () {\n      if (_this.verifyAll()) {\n        _this.props.setComplete();\n      }\n    };\n\n    _this.blurFunctions = {// Implement finer control here\n    };\n\n    _this.blurFunctionFactory = function (field) {\n      return function (e) {\n        if (_this.regFinalTest(field, e.target.value) || field == 'grade') {\n          _this.props.setValid();\n          _this.updateStatus(field, 0, true);\n        } else {\n          _this.props.setError();\n          _this.updateStatus(field, 1, true);\n        }\n      };\n    };\n\n    _this.verifyAll = function () {\n      var status = _this.state.status;\n\n      return Object.keys(status).every(function (k) {\n        return status[k] === 0;\n      });\n    };\n\n    _this.errorFactory = function (field) {\n      return _this.state.status[field] === 1;\n    };\n\n    _this.onSubmit = function () {\n      var userData = _this.state.userData;\n\n      if (_this.verifyAll()) {\n        // diff the objects\n        var changedKeys = Object.keys(_this.state.userData).filter(function (key) {\n          return _this.state.cachedData[key] !== _this.state.userData[key];\n        });\n        var diffDict = {};\n        changedKeys.forEach(function (key) {\n          diffDict[key] = _this.state.userData[key];\n        });\n        if (Object.keys(diffDict).length === 0) _this.props.setError(\"No fields have changed!\");else {\n          _this.props.upsertUser(_extends({}, diffDict, { _id: _this.props.user._id }));\n          // optimistic update\n          _this.setState({ cachedData: _this.state.userData });\n        }\n      } else {\n        _this.props.setError(\"The form is completed incorrectly.\");\n      }\n    };\n\n    var user = props.user,\n        targets = props.targets;\n\n    _this.targets = targets;\n    var initStatus = {};\n    var initData = {};\n\n    Object.keys(_this.targets).forEach(function (tar) {\n      initData[tar] = user[tar] ? user[tar] : \"\";\n      initStatus[tar] = _this.regFinalTest(tar, user[tar] ? user[tar] : \"\") ? 0 : -1;\n    });\n\n    _this.state = {\n      status: initStatus,\n      userData: initData,\n      cachedData: initData\n      //dropdown: \"6\"\n    };\n\n    _this.handleChange = _this.handleChange.bind(_this);\n    return _this;\n  }\n\n  // Filter is what filter to apply to value into state\n\n\n  _createClass(ProfileForm, [{\n    key: 'handleChange',\n    value: function handleChange(event) {\n      var text = event.target.innerHTML.substring(19, 21);\n      if (text.substring(1, 2) == \"<\") {\n        text = text.substring(0, 1);\n      }\n      this.setState({\n        userData: _extends({}, this.state.userData, _defineProperty({}, 'grade', text))\n        //dropdown: text\n      });\n      //this.updateStatus('grade', 0);\n    }\n\n    // verify cb\n\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this2 = this;\n\n      var userData = this.state.userData;\n      var _props = this.props,\n          setError = _props.setError,\n          setValid = _props.setValid,\n          setComplete = _props.setComplete,\n          setMessage = _props.setMessage;\n\n      console.log(userData);\n\n      return _react2.default.createElement(\n        'div',\n        null,\n        _react2.default.createElement(\n          _semanticUiReact.Form,\n          null,\n          Object.keys(this.targets).map(function (key) {\n            var tar = _this2.targets[key];\n            if (key == 'grade') {\n              return _react2.default.createElement(_semanticUiReact.Form.Select, {\n                key: 'profile' + key,\n                label: tar.label ? tar.label : (0, _lodash.startCase)(key),\n                options: _this2.targets[key][\"options\"]\n                //placeholder='Grade'\n                , value: userData[key]\n                //onChange={this.handleChange}\n                , onChange: _this2.handleChange,\n                onBlur: _this2.blurFunctionFactory(key)\n              });\n            } else {\n              return _react2.default.createElement(_semanticUiReact.Form.Input, {\n                key: 'profile' + key\n                //inline transparent\n                , label: tar.label ? tar.label : (0, _lodash.startCase)(key),\n                error: _this2.errorFactory(key),\n                name: key,\n                type: tar.type ? tar.type : \"text\",\n                value: userData[key],\n                onChange: _this2.changeFunctionFactory(key, tar.constraintMsg ? tar.constraintMsg : \"Invalid character\"),\n                onBlur: _this2.blurFunctionFactory(key)\n              });\n            }\n          }),\n          _react2.default.createElement(_semanticUiReact.Form.Button, {\n            color: 'violet',\n            onClick: this.onSubmit,\n            content: 'Save Profile',\n            type: 'submit'\n          })\n        )\n      );\n    }\n  }]);\n\n  return ProfileForm;\n}(_react.Component);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    errorMessage: state.errorMessage,\n    modalLoaderActive: state.modalLoaderActive,\n    user: state.user,\n    error: state.error\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return (0, _redux.bindActionCreators)({\n    upsertUser: _actions.upsertUser\n  }, dispatch);\n};\n\nexports.default = (0, _.formWrapper)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ProfileForm));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODIzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2NvbXBvbmVudHMvZm9ybXMvUHJvZmlsZUZvcm0uanM/OGM2MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IGNhcGl0YWxpemUgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgQnV0dG9uLCBEaXZpZGVyLCBGb3JtIH0gZnJvbSAnc2VtYW50aWMtdWktcmVhY3QnO1xuaW1wb3J0IHsgZmV0Y2hVc2VycywgdXBzZXJ0VXNlciB9IGZyb20gJy4uLy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgZm9ybVdyYXBwZXIgfSBmcm9tICcuLyc7XG5pbXBvcnQgeyBzdGFydENhc2UgfSBmcm9tICdsb2Rhc2gnO1xuXG4vLyBQcm9maWxlRm9ybSB0aGF0IHRha2VzIHNvZnQgZmllbGQgcHJvcHMgKHRhcmdldHMpXG5jbGFzcyBQcm9maWxlRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgeyB1c2VyLCB0YXJnZXRzIH0gPSBwcm9wcztcbiAgICB0aGlzLnRhcmdldHMgPSB0YXJnZXRzO1xuICAgIGxldCBpbml0U3RhdHVzID0ge307XG4gICAgbGV0IGluaXREYXRhID0ge307XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLnRhcmdldHMpLmZvckVhY2goIHRhciA9PiB7XG4gICAgICBpbml0RGF0YVt0YXJdID0gdXNlclt0YXJdID8gdXNlclt0YXJdIDogXCJcIjtcbiAgICAgIGluaXRTdGF0dXNbdGFyXSA9IHRoaXMucmVnRmluYWxUZXN0KHRhciwgdXNlclt0YXJdID8gdXNlclt0YXJdIDogXCJcIikgPyAwOiAtMTtcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzdGF0dXM6IGluaXRTdGF0dXMsXG4gICAgICB1c2VyRGF0YTogaW5pdERhdGEsXG4gICAgICBjYWNoZWREYXRhOiBpbml0RGF0YSxcbiAgICAgIC8vZHJvcGRvd246IFwiNlwiXG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVDaGFuZ2U9dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKVxuICB9XG5cbiAgcmVnTGVnYWxUZXN0ID0gKGZpZWxkLCB2YWwpID0+IHtcbiAgICBpZiAodGhpcy50YXJnZXRzW2ZpZWxkXSkge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0c1tmaWVsZF1bXCJpc0xlZ2FsXCJdKHZhbCk7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVnRmluYWxUZXN0ID0gKGZpZWxkLCB2YWwpID0+IHtcbiAgICBpZiAoIXZhbCkgcmV0dXJuIGZhbHNlOyAvLyBubyBmYWxzZXkhXG4gICAgaWYgKHRoaXMudGFyZ2V0c1tmaWVsZF0pIHtcbiAgICAgIGlmIChcImlzRmluYWxcIiBpbiB0aGlzLnRhcmdldHNbZmllbGRdKVxuXHRyZXR1cm4gdGhpcy50YXJnZXRzW2ZpZWxkXVtcImlzRmluYWxcIl0odmFsKTtcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldHNbZmllbGRdW1wiaXNMZWdhbFwiXSh2YWwpICYmIHZhbC5sZW5ndGggIT09IDA7IC8vIEZhbGxiYWNrXG4gICAgfVxuICAgIHJldHVybiB0cnVlOyAvLyBGaWVsZCBub3QgZm91bmQgaW4gdGFyZ2V0cywgbm8gcmVzdHJpY3Rpb25zXG4gIH1cblxuICAvLyBGaWx0ZXIgaXMgd2hhdCBmaWx0ZXIgdG8gYXBwbHkgdG8gdmFsdWUgaW50byBzdGF0ZVxuICBjaGFuZ2VGdW5jdGlvbkZhY3RvcnkgPSAoZmllbGQsIHdhcm5pbmdNZXNzYWdlLCBmaWx0ZXIpID0+IHtcbiAgICByZXR1cm4gZSA9PiB7XG4gICAgICBpZiAodGhpcy5yZWdMZWdhbFRlc3QoZmllbGQsIGUudGFyZ2V0LnZhbHVlKSB8fCBmaWVsZD09J2dyYWRlJykge1xuXHR0aGlzLnByb3BzLnNldFZhbGlkKCk7XG5cdHRoaXMuc2V0U3RhdGUoe1xuXHQgIHVzZXJEYXRhOiB7IC4uLnRoaXMuc3RhdGUudXNlckRhdGEsXG5cdFx0ICAgICAgW2ZpZWxkXTogKGZpbHRlciA/IGZpbHRlcihlLnRhcmdldC52YWx1ZSkgOiBlLnRhcmdldC52YWx1ZSl9XG5cdH0pO1xuXHR0aGlzLnVwZGF0ZVN0YXR1cyhmaWVsZCwgMCk7XG4gICAgICB9IGVsc2Uge1xuXHR0aGlzLnByb3BzLnNldEVycm9yKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaGFuZGxlQ2hhbmdlKGV2ZW50KSB7XG4gICAgdmFyIHRleHQ9ZXZlbnQudGFyZ2V0LmlubmVySFRNTC5zdWJzdHJpbmcoMTksMjEpXG4gICAgaWYodGV4dC5zdWJzdHJpbmcoMSwyKT09XCI8XCIpe1xuICAgICAgdGV4dD10ZXh0LnN1YnN0cmluZygwLDEpXG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICBcdCAgdXNlckRhdGE6IHsgLi4udGhpcy5zdGF0ZS51c2VyRGF0YSxcbiAgXHRcdCAgICAgIFsnZ3JhZGUnXTogdGV4dH1cbiAgICAgIC8vZHJvcGRvd246IHRleHRcbiAgXHR9KTtcbiAgICAvL3RoaXMudXBkYXRlU3RhdHVzKCdncmFkZScsIDApO1xuICB9XG5cbiAgLy8gdmVyaWZ5IGNiXG4gIHVwZGF0ZVN0YXR1cyA9IChmaWVsZCwgdmFsLCBjYikgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3RhdHVzOiB7IC4uLnRoaXMuc3RhdGUuc3RhdHVzLCBbZmllbGRdOiB2YWwgfVxuICAgIH0sICgpID0+IHtpZiAoY2IpIHRoaXMudmVyaWZ5Q2IoKTt9KTtcbiAgfVxuXG4gIHZlcmlmeUNiID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnZlcmlmeUFsbCgpKSB7XG4gICAgICB0aGlzLnByb3BzLnNldENvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgYmx1ckZ1bmN0aW9ucyA9IHsgLy8gSW1wbGVtZW50IGZpbmVyIGNvbnRyb2wgaGVyZVxuICB9XG5cbiAgYmx1ckZ1bmN0aW9uRmFjdG9yeSA9IGZpZWxkID0+IChlKSA9PiB7XG4gICAgaWYgKHRoaXMucmVnRmluYWxUZXN0KGZpZWxkLCBlLnRhcmdldC52YWx1ZSl8fCBmaWVsZD09J2dyYWRlJykge1xuICAgICAgdGhpcy5wcm9wcy5zZXRWYWxpZCgpO1xuICAgICAgdGhpcy51cGRhdGVTdGF0dXMoZmllbGQsIDAsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BzLnNldEVycm9yKCk7XG4gICAgICB0aGlzLnVwZGF0ZVN0YXR1cyhmaWVsZCwgMSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmVyaWZ5QWxsID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgc3RhdHVzIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzdGF0dXMpLmV2ZXJ5KGsgPT4gc3RhdHVzW2tdID09PSAwKVxuICB9XG5cbiAgZXJyb3JGYWN0b3J5ID0gZmllbGQgPT4gdGhpcy5zdGF0ZS5zdGF0dXNbZmllbGRdID09PSAxXG5cbiAgb25TdWJtaXQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyB1c2VyRGF0YSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBpZiAodGhpcy52ZXJpZnlBbGwoKSkge1xuICAgICAgLy8gZGlmZiB0aGUgb2JqZWN0c1xuICAgICAgY29uc3QgY2hhbmdlZEtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnN0YXRlLnVzZXJEYXRhKS5maWx0ZXIoa2V5ID0+IHRoaXMuc3RhdGUuY2FjaGVkRGF0YVtrZXldICE9PSB0aGlzLnN0YXRlLnVzZXJEYXRhW2tleV0pO1xuICAgICAgbGV0IGRpZmZEaWN0PSB7fTtcbiAgICAgIGNoYW5nZWRLZXlzLmZvckVhY2goa2V5ID0+IHtcblx0ZGlmZkRpY3Rba2V5XSA9IHRoaXMuc3RhdGUudXNlckRhdGFba2V5XTtcbiAgICAgIH0pO1xuICAgICAgaWYgKE9iamVjdC5rZXlzKGRpZmZEaWN0KS5sZW5ndGggPT09IDApXG5cdHRoaXMucHJvcHMuc2V0RXJyb3IoXCJObyBmaWVsZHMgaGF2ZSBjaGFuZ2VkIVwiKTtcbiAgICAgIGVsc2Uge1xuXHR0aGlzLnByb3BzLnVwc2VydFVzZXIoeyAuLi5kaWZmRGljdCwgX2lkOiB0aGlzLnByb3BzLnVzZXIuX2lkIH0pO1xuXHQvLyBvcHRpbWlzdGljIHVwZGF0ZVxuXHR0aGlzLnNldFN0YXRlKHtjYWNoZWREYXRhOiB0aGlzLnN0YXRlLnVzZXJEYXRhfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMuc2V0RXJyb3IoXCJUaGUgZm9ybSBpcyBjb21wbGV0ZWQgaW5jb3JyZWN0bHkuXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHVzZXJEYXRhIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgc2V0RXJyb3IsIHNldFZhbGlkLCBzZXRDb21wbGV0ZSwgc2V0TWVzc2FnZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zb2xlLmxvZyh1c2VyRGF0YSlcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuXHQ8Rm9ybT5cblx0ICB7XG5cdCAgICBPYmplY3Qua2V5cyh0aGlzLnRhcmdldHMpLm1hcCgga2V5ID0+IHtcblx0ICAgICAgY29uc3QgdGFyID0gdGhpcy50YXJnZXRzW2tleV07XG4gICAgICAgICAgaWYoa2V5PT0nZ3JhZGUnKXtcbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgPEZvcm0uU2VsZWN0XG4gICAgICAgICAgICAgIGtleT17YHByb2ZpbGUke2tleX1gfVxuICAgICAgICAgICAgICBsYWJlbD17dGFyLmxhYmVsID8gdGFyLmxhYmVsIDogc3RhcnRDYXNlKGtleSl9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e3RoaXMudGFyZ2V0c1trZXldW1wib3B0aW9uc1wiXX1cbiAgICAgICAgICAgICAgLy9wbGFjZWhvbGRlcj0nR3JhZGUnXG4gICAgICAgICAgICAgIHZhbHVlPXtcbiAgICAgICAgICAgICAgICB1c2VyRGF0YVtrZXldXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy9vbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmJsdXJGdW5jdGlvbkZhY3Rvcnkoa2V5KX1cbiAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICA8Rm9ybS5JbnB1dFxuICAgICAgICAgIFx0XHQgIGtleT17YHByb2ZpbGUke2tleX1gfVxuICAgICAgICAgIFx0XHQgIC8vaW5saW5lIHRyYW5zcGFyZW50XG4gICAgICAgICAgXHRcdCAgbGFiZWw9e3Rhci5sYWJlbCA/IHRhci5sYWJlbCA6IHN0YXJ0Q2FzZShrZXkpfVxuICAgICAgICAgIFx0XHQgIGVycm9yPXt0aGlzLmVycm9yRmFjdG9yeShrZXkpfVxuICAgICAgICAgIFx0XHQgIG5hbWU9e2tleX1cbiAgICAgICAgICBcdCAgICAgICAgICB0eXBlPXt0YXIudHlwZSA/IHRhci50eXBlIDogXCJ0ZXh0XCJ9XG4gICAgICAgICAgXHQgICAgICAgICAgdmFsdWU9e3VzZXJEYXRhW2tleV19XG4gICAgICAgICAgXHQgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlRnVuY3Rpb25GYWN0b3J5KGtleSwgdGFyLmNvbnN0cmFpbnRNc2cgPyB0YXIuY29uc3RyYWludE1zZyA6IFwiSW52YWxpZCBjaGFyYWN0ZXJcIil9XG4gICAgICAgICAgXHQgICAgICAgICAgb25CbHVyPXt0aGlzLmJsdXJGdW5jdGlvbkZhY3Rvcnkoa2V5KX1cbiAgICAgICAgICBcdFx0Lz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG5cdCAgICAgIH0pXG5cdCAgfVxuXHQgIDxGb3JtLkJ1dHRvblxuXHQgICAgY29sb3I9XCJ2aW9sZXRcIlxuXHQgICAgb25DbGljaz17dGhpcy5vblN1Ym1pdH1cblx0ICAgIGNvbnRlbnQ9J1NhdmUgUHJvZmlsZSdcblx0ICAgIHR5cGU9J3N1Ym1pdCdcblx0ICAvPlxuXHQ8L0Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGVycm9yTWVzc2FnZTogc3RhdGUuZXJyb3JNZXNzYWdlLFxuICAgIG1vZGFsTG9hZGVyQWN0aXZlOiBzdGF0ZS5tb2RhbExvYWRlckFjdGl2ZSxcbiAgICB1c2VyOiBzdGF0ZS51c2VyLFxuICAgIGVycm9yOiBzdGF0ZS5lcnJvclxuICB9O1xufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICByZXR1cm4gYmluZEFjdGlvbkNyZWF0b3JzKHtcbiAgICB1cHNlcnRVc2VyOiB1cHNlcnRVc2VyXG4gIH0sIGRpc3BhdGNoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JtV3JhcHBlcihjb25uZWN0KFxuICBtYXBTdGF0ZVRvUHJvcHMsXG4gIG1hcERpc3BhdGNoVG9Qcm9wc1xuKShQcm9maWxlRm9ybSkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL2NvbXBvbmVudHMvZm9ybXMvUHJvZmlsZUZvcm0uanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBdUJBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUE3QkE7QUErQkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXZDQTtBQTBDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXZEQTtBQXNFQTtBQUNBO0FBREE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQTFFQTtBQTRFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEZBO0FBaUZBO0FBQ0E7QUFsRkE7QUFvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUkE7QUFDQTtBQXJGQTtBQThGQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQWxHQTtBQW1HQTtBQUFBO0FBQ0E7QUFwR0E7QUFxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBekhBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFuQkE7QUFvQkE7QUFDQTtBQW1CQTtBQUNBO0FBQ0E7OztBQWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQXFEQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFRQTtBQVJBO0FBVUE7QUFWQTtBQWNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVlBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUF0Q0E7QUFEQTtBQWdEQTs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///823\n");

/***/ }),

/***/ 827:
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./frontend/components/profile/ProfileParticipant.js ***!
  \***********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ 14);\n\nvar _redux = __webpack_require__(/*! redux */ 19);\n\nvar _moment = __webpack_require__(/*! moment */ 6);\n\nvar _moment2 = _interopRequireDefault(_moment);\n\nvar _semanticUiReact = __webpack_require__(/*! semantic-ui-react */ 11);\n\nvar _ = __webpack_require__(/*! ../ */ 23);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar targets = {\n  'phone': {\n    constraintMsg: \"Only numbers, please\",\n    isLegal: function isLegal(val) {\n      return (/^$|^[1-9][0-9]*$/.test(val)\n      );\n    }\n  },\n  'grade': {\n    isLegal: function isLegal(val) {\n      return (/^$|^[1-9]|1[0-2]|college]$/.test(val)\n      );\n    },\n    options: [{ key: '6', text: '6', value: '6' }, { key: '7', text: '7', value: '7' }, { key: '8', text: '8', value: '8' }, { key: '9', text: '9', value: '9' }, { key: '10', text: '10', value: '10' }, { key: '11', text: '11', value: '11' }, { key: '12', text: '12', value: '12' }]\n  },\n  'race': {\n    isLegal: function isLegal(val) {\n      return (/^[a-zA-Z\\s]*$/.test(val)\n      );\n    }\n  },\n  'school': {\n    isLegal: function isLegal(val) {\n      return (/^[\\w\\s]*$/.test(val)\n      );\n    }\n  },\n  'leader': {\n    isLegal: function isLegal(val) {\n      return (/^[a-zA-Z\\s]*$/.test(val)\n      );\n    }\n  },\n  'emergencyContactName': {\n    isLegal: function isLegal(val) {\n      return (/^[a-zA-Z\\s]*$/.test(val)\n      );\n    }\n  },\n  'emergencyContactPhone': {\n    isLegal: function isLegal(val) {\n      return (/^$|^[1-9][0-9]*$/.test(val)\n      );\n    }\n  },\n  'emergencyContactRelation': {\n    isLegal: function isLegal(val) {\n      return (/^[a-zA-Z\\s]*$/.test(val)\n      );\n    }\n  }\n};\n\n// Only for mutable fields\nvar ProfileParticipant = function ProfileParticipant(props) {\n  return _react2.default.createElement(\n    _semanticUiReact.Card,\n    { style: styles.softCard },\n    _react2.default.createElement(\n      _semanticUiReact.Card.Content,\n      null,\n      _react2.default.createElement(\n        _semanticUiReact.Card.Header,\n        null,\n        ' Additional Details: '\n      ),\n      _react2.default.createElement(\n        _semanticUiReact.Card.Description,\n        null,\n        _react2.default.createElement(_.ProfileForm, { targets: targets })\n      )\n    )\n  );\n};\n\nvar styles = {\n  softCard: {\n    padding: '1em',\n    width: '50%' // Pretty whimsical\n  }\n};\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    user: state.user,\n    error: state.error\n  };\n};\n\nexports.default = (0, _reactRedux.connect)(mapStateToProps)(ProfileParticipant);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODI3LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2Zyb250ZW5kL2NvbXBvbmVudHMvcHJvZmlsZS9Qcm9maWxlUGFydGljaXBhbnQuanM/ODRkYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IEJ1dHRvbiwgQ2FyZCwgQ29udGFpbmVyLCBIZWFkZXIsIExvYWRlciwgU2VnbWVudCB9IGZyb20gJ3NlbWFudGljLXVpLXJlYWN0J1xuaW1wb3J0IHsgUHJvZmlsZUZvcm0gfSBmcm9tICcuLi8nXG5cbmNvbnN0IHRhcmdldHMgPSB7XG4gICdwaG9uZSc6IHtcbiAgICBjb25zdHJhaW50TXNnOiBcIk9ubHkgbnVtYmVycywgcGxlYXNlXCIsXG4gICAgaXNMZWdhbDogdmFsID0+IC9eJHxeWzEtOV1bMC05XSokLy50ZXN0KHZhbClcbiAgfSxcbiAgJ2dyYWRlJzoge1xuICAgIGlzTGVnYWw6IHZhbCA9PiAvXiR8XlsxLTldfDFbMC0yXXxjb2xsZWdlXSQvLnRlc3QodmFsKSxcbiAgICBvcHRpb25zOiBbXG4gICAgICB7IGtleTogJzYnLCB0ZXh0OiAnNicsIHZhbHVlOiAnNicgfSxcbiAgICAgIHsga2V5OiAnNycsIHRleHQ6ICc3JywgdmFsdWU6ICc3JyB9LFxuICAgICAgeyBrZXk6ICc4JywgdGV4dDogJzgnLCB2YWx1ZTogJzgnIH0sXG4gICAgICB7IGtleTogJzknLCB0ZXh0OiAnOScsIHZhbHVlOiAnOScgfSxcbiAgICAgIHsga2V5OiAnMTAnLCB0ZXh0OiAnMTAnLCB2YWx1ZTogJzEwJyB9LFxuICAgICAgeyBrZXk6ICcxMScsIHRleHQ6ICcxMScsIHZhbHVlOiAnMTEnIH0sXG4gICAgICB7IGtleTogJzEyJywgdGV4dDogJzEyJywgdmFsdWU6ICcxMicgfSxcbiAgICBdXG4gIH0sXG4gICdyYWNlJzoge1xuICAgIGlzTGVnYWw6IHZhbCA9PiAvXlthLXpBLVpcXHNdKiQvLnRlc3QodmFsKVxuICB9LFxuICAnc2Nob29sJzoge1xuICAgIGlzTGVnYWw6IHZhbCA9PiAvXltcXHdcXHNdKiQvLnRlc3QodmFsKVxuICB9LFxuICAnbGVhZGVyJzoge1xuICAgIGlzTGVnYWw6IHZhbCA9PiAvXlthLXpBLVpcXHNdKiQvLnRlc3QodmFsKVxuICB9LFxuICAnZW1lcmdlbmN5Q29udGFjdE5hbWUnOiB7XG4gICAgaXNMZWdhbDogdmFsID0+IC9eW2EtekEtWlxcc10qJC8udGVzdCh2YWwpXG4gIH0sXG4gICdlbWVyZ2VuY3lDb250YWN0UGhvbmUnOiB7XG4gICAgaXNMZWdhbDogdmFsID0+IC9eJHxeWzEtOV1bMC05XSokLy50ZXN0KHZhbClcbiAgfSxcbiAgJ2VtZXJnZW5jeUNvbnRhY3RSZWxhdGlvbic6IHtcbiAgICBpc0xlZ2FsOiB2YWwgPT4gL15bYS16QS1aXFxzXSokLy50ZXN0KHZhbClcbiAgfVxufTtcblxuLy8gT25seSBmb3IgbXV0YWJsZSBmaWVsZHNcbmNvbnN0IFByb2ZpbGVQYXJ0aWNpcGFudCA9IHByb3BzID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Q2FyZCBzdHlsZT17c3R5bGVzLnNvZnRDYXJkfT5cbiAgICAgIDxDYXJkLkNvbnRlbnQ+XG5cdDxDYXJkLkhlYWRlcj4gQWRkaXRpb25hbCBEZXRhaWxzOiA8L0NhcmQuSGVhZGVyPlxuXHQ8Q2FyZC5EZXNjcmlwdGlvbj5cblx0ICA8UHJvZmlsZUZvcm0gdGFyZ2V0cz17dGFyZ2V0c30gLz5cblx0PC9DYXJkLkRlc2NyaXB0aW9uPlxuICAgICAgPC9DYXJkLkNvbnRlbnQ+XG4gICAgPC9DYXJkPlxuICApXG59XG5cbmNvbnN0IHN0eWxlcyA9IHtcbiAgc29mdENhcmQ6IHtcbiAgICBwYWRkaW5nOiAnMWVtJyxcbiAgICB3aWR0aDogJzUwJScgLy8gUHJldHR5IHdoaW1zaWNhbFxuICB9LFxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XG4gIHJldHVybiB7XG4gICAgdXNlcjogc3RhdGUudXNlcixcbiAgICBlcnJvcjogc3RhdGUuZXJyb3JcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoUHJvZmlsZVBhcnRpY2lwYW50KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9jb21wb25lbnRzL3Byb2ZpbGUvUHJvZmlsZVBhcnRpY2lwYW50LmpzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7QUFBQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBSUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRkE7QUFZQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFHQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBREE7QUFoQ0E7QUFDQTtBQW9DQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFGQTtBQURBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFEQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///827\n");

/***/ })

})