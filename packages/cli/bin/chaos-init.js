#! /usr/bin/env node
var program = require('commander')
var init = require('../lib').init

program
.option('--project-path [projectPath]', 'project path')
.parse(process.argv)

const { projectPath } = program

init(projectPath || '')
