#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')

const download = require('./download')

const PACKAGE_JSON_PATH = path.join(__dirname, '../package.json')
const plantumlVersion = require(PACKAGE_JSON_PATH).plantumlVersion

const JAR_DIR_PATH = path.join(__dirname, '../vendor')
const PLANTUML_JAR = path.join(JAR_DIR_PATH, 'plantuml.jar')
const PLANTUML_JAR_VER_FILE = path.join(JAR_DIR_PATH, plantumlVersion)

const PLANTUML_FILES_URL = 'https://github.com/plantuml/plantuml/releases/download/'
const PLANTUML_FILES_JAR_PATH = 'v' + plantumlVersion + '/plantuml-' + plantumlVersion + '.jar'

if (!fs.existsSync(JAR_DIR_PATH)) {
  fs.mkdirSync(JAR_DIR_PATH)
}

if (!fs.existsSync(PLANTUML_JAR_VER_FILE) || !fs.existsSync(PLANTUML_JAR)) {
  console.log('Downloading plantuml.jar version ' + plantumlVersion)
  download(PLANTUML_FILES_URL + PLANTUML_FILES_JAR_PATH, PLANTUML_JAR, true)
  try {
    const time = new Date()
    fs.utimesSync(PLANTUML_JAR_VER_FILE, time, time)
  } catch (err) {
    fs.closeSync(fs.openSync(PLANTUML_JAR_VER_FILE, 'w'))
  }
} else {
  console.log('plantuml.jar version ' + plantumlVersion + ' already exist, if you want update please delete it.')
}
