#!/usr/bin/env node

const cli = require('commander')
const fs = require('fs')
const os = require('os')

interface PersistedData {
  created: string
  modified: string
  mapping: WorkingDir
}

interface WorkingDir {
  [workspaceKey: string]: string
}

const CURRENT_TIMESTAMP = new Date().toISOString()
const DEFAULT_SPACE_KEY = `__global`
const PERSISTED_DATA_FILE_PATH = `${__dirname}/db.json`
const PERSISTED_DATA_STUB: PersistedData = {
  created: CURRENT_TIMESTAMP,
  modified: CURRENT_TIMESTAMP,
  mapping: { [DEFAULT_SPACE_KEY]: os.homedir() }
}

cli
  .description('A CLI for setting an arbitrary working directory')
  .version('0.0.0')
  .usage(`

  Setting the working directory:

    workd set <dir>
    workd set <dir> --space <space>

  Retrieving the current working directory:

    workd get [space]
    $ /home/some-user/some-directory
    `)

cli
  .command('get [space]')
  .description('Get working directory')
  .action((space?: string) => {
    const data = readData()
    const key = space || DEFAULT_SPACE_KEY
    console.log(data.mapping[key] || data.mapping[DEFAULT_SPACE_KEY])
  })

cli
  .command('set <dir>')
  .description('Set working directory')
  .option('-s, --space <space>', 'workspace key')
  .action((dir: string, opts: { space?: string }) => {
    const { created, mapping } = readData()
    const key = opts.space || DEFAULT_SPACE_KEY
    const data = {
      created,
      modified: CURRENT_TIMESTAMP,
      mapping: { ...mapping, [key]: dir }
    }
    writeData(data)
  })

cli.parse(process.argv)

if(!process.argv.slice(2).length) {
  cli.outputHelp()
}

function readData(): PersistedData {
  if (fs.existsSync(PERSISTED_DATA_FILE_PATH)) {
    const fileContents = fs.readFileSync(PERSISTED_DATA_FILE_PATH)
    return JSON.parse(fileContents)
  } else {
    return PERSISTED_DATA_STUB
  }
}

function writeData(data: PersistedData): void {
  const content = JSON.stringify(data)
  fs.writeFileSync(PERSISTED_DATA_FILE_PATH, content)
}
