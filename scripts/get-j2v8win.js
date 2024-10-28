#!/usr/bin/env node
'use strict'

const path = require('path')
const download = require('./download')
const fs = require('fs')

const JAR_DIR_PATH = path.join(__dirname, '../vendor')
const J2V8_WIN_JAR = path.join(JAR_DIR_PATH, 'j2v8_win32_x86_64-3.1.6.jar')
const J2V8_WIN_JAR_VER_FILE = path.join(JAR_DIR_PATH, 'j2v8_win32_x86_64')
const J2V8_WIN_URL = 'http://beta.plantuml.net/j2v8_win32_x86_64-3.1.6.jar'

if (!fs.existsSync(JAR_DIR_PATH)) {
  fs.mkdirSync(JAR_DIR_PATH)
}

async function main () {
  console.info('Downloading J2V8 for Windows...')
  try {
    if (!fs.existsSync(J2V8_WIN_JAR_VER_FILE) || !fs.existsSync(J2V8_WIN_JAR)) {
      await download(J2V8_WIN_URL, J2V8_WIN_JAR, false)
      try {
        const time = new Date()
        fs.utimesSync(J2V8_WIN_JAR_VER_FILE, time, time)
      } catch (err) {
        fs.closeSync(fs.openSync(J2V8_WIN_JAR_VER_FILE, 'w'))
      }
      console.info('J2V8 Windows download complete.')
    }
  } catch (error) {
    console.error('Failed to download J2V8 for Windows:', error)
  }
}

main().catch(error => console.error('Error during download:', error))
