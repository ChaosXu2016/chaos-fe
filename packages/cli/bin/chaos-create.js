#! /usr/bin/env node
var program = require('commander')
var create = require('../lib').create

program
.option('--package-name [packageName]', 'package name')
.option('--config-path [configPath]', 'config path')
.option('--src [src]', 'template dir')
.option('--dest [dest]', 'target package dir')
.parse(process.argv)

const packageName = program.packageName || program.args[0] || ''

const {
  configPath = '',
  src,
  dest
} = program

create({ packageName, configPath, src, dest })
