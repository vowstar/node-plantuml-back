#!/usr/bin/env node
'use strict'

const path = require('path')
const download = require('./download')
const fs = require('fs')

const JAR_DIR_PATH = path.join(__dirname, '../vendor')
const VIZJS_JAR = path.join(JAR_DIR_PATH, 'vizjs.jar')
const VIZJS_JAR_VER_FILE = path.join(JAR_DIR_PATH, 'vizjs')
const VIZJS_URL = 'http://beta.plantuml.net/vizjs.jar'

if (!fs.existsSync(JAR_DIR_PATH)) {
  fs.mkdirSync(JAR_DIR_PATH)
}

async function main () {
  console.info('Downloading VIZJS...')
  try {
    if (!fs.existsSync(VIZJS_JAR_VER_FILE) || !fs.existsSync(VIZJS_JAR)) {
      await download(VIZJS_URL, VIZJS_JAR, false)
      try {
        const time = new Date()
        fs.utimesSync(VIZJS_JAR_VER_FILE, time, time)
      } catch (err) {
        fs.closeSync(fs.openSync(VIZJS_JAR_VER_FILE, 'w'))
      }
      console.info('VIZJS download complete.')
    }
  } catch (error) {
    console.error('Failed to download VIZJS:', error)
  }
}

main().catch(error => console.error('Error during download:', error))
