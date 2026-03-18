const fs = require('fs')
const path = require('path')

function loadJSON(file) {
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  }
  return {}
}

function resolveEnv(value) {
  if (value && typeof value === 'object' && value.env) {
    const raw = process.env[value.env]
    if (raw === undefined) return undefined
    if (raw === 'true') return true
    if (raw === 'false') return false
    if (/^\d+$/.test(raw)) return Number(raw)
    return raw
  }
  return value
}

function deepResolve(obj) {
  if (obj && typeof obj === 'object') {
    const out = Array.isArray(obj) ? [] : {}
    for (const k of Object.keys(obj)) {
      const v = obj[k]
      if (v && typeof v === 'object' && v.env) {
        out[k] = resolveEnv(v)
      } else {
        out[k] = deepResolve(v)
      }
    }
    return out
  }
  return obj
}

const root = path.resolve(__dirname)
const isProd = process.env.NODE_ENV === 'production'
const file = isProd ? path.join(root, 'config.prod.json') : path.join(root, 'config.dev.json')
const raw = loadJSON(file)
const cfg = isProd ? deepResolve(raw) : raw

module.exports = cfg
