#!/usr/bin/env node
'use strict'

var fs = require('fs')
var path = require('path')

var download = require('./download')

var PACKAGE_JSON_PATH = path.join(__dirname, '../package.json')
var plantumlVersion = require(PACKAGE_JSON_PATH).plantumlVersion

var JAR_DIR_PATH = path.join(__dirname, '../vendor')
var PLANTUML_JAR = path.join(JAR_DIR_PATH, 'plantuml.jar')
var PLANTUML_JAR_VER_FILE = path.join(JAR_DIR_PATH, plantumlVersion)

var PLANTUML_FILES_URL = 'https://sourceforge.net/projects/plantuml/files/'
var PLANTUML_FILES_JAR_PATH = plantumlVersion + '/plantuml.' + plantumlVersion + '.jar'

if (!fs.existsSync(JAR_DIR_PATH)) {
  fs.mkdirSync(JAR_DIR_PATH)
}

if (!fs.existsSync(PLANTUML_JAR_VER_FILE) || !fs.existsSync(PLANTUML_JAR)) {
  console.log('Downloading plantuml.jar version ' + plantumlVersion)
  download(PLANTUML_FILES_URL + PLANTUML_FILES_JAR_PATH, PLANTUML_JAR, true)
  try {
    var time = new Date()
    fs.utimesSync(PLANTUML_JAR_VER_FILE, time, time)
  } catch (err) {
    fs.closeSync(fs.openSync(PLANTUML_JAR_VER_FILE, 'w'))
  }
} else {
  console.log('plantuml.jar version ' + plantumlVersion + ' already exist, if you want update please delete it.')
}
