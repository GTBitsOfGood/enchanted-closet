"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SystemConfigSchema = new _mongoose.default.Schema({
  configKey: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  configType: {
    type: String,
    enum: ['String', 'Number', 'Array', 'Object'],
    required: true
  },
  configDefault: {
    type: String,
    default: '',
    required: true
  },
  configValue: {
    type: String,
    default: '',
    required: true
  }
});

let SystemConfig = _mongoose.default.model('SystemConfig', SystemConfigSchema);

var _default = SystemConfig;
exports.default = _default;