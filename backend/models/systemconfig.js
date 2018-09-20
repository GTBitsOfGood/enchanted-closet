import mongoose from 'mongoose'

var SystemConfigSchema = new mongoose.Schema({
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
})

let SystemConfig = mongoose.model('SystemConfig', SystemConfigSchema)

export default SystemConfig
