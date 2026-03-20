import { existsSync, readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

let hasLoadedEnv = false

function parseEnvFile(filePath: string) {
  const fileContents = readFileSync(filePath, "utf8")

  for (const line of fileContents.split(/\r?\n/)) {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue
    }

    const [key, ...rest] = trimmed.split("=")

    if (!key) {
      continue
    }

    const value = rest.join("=").trim().replace(/^['"]|['"]$/g, "")

    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}

function collectAncestorDirs(startDir: string) {
  const directories: string[] = []
  let currentDir = resolve(startDir)

  while (!directories.includes(currentDir)) {
    directories.push(currentDir)

    const parentDir = dirname(currentDir)

    if (parentDir === currentDir) {
      break
    }

    currentDir = parentDir
  }

  return directories
}

export function loadMonorepoEnv() {
  if (hasLoadedEnv) {
    return
  }

  const moduleDir = dirname(fileURLToPath(import.meta.url))
  const candidateDirs = new Set([
    ...collectAncestorDirs(process.cwd()),
    ...collectAncestorDirs(moduleDir),
  ])

  for (const directory of candidateDirs) {
    const envLocalPath = resolve(directory, ".env.local")
    const envPath = resolve(directory, ".env")

    if (existsSync(envLocalPath)) {
      parseEnvFile(envLocalPath)
    }

    if (existsSync(envPath)) {
      parseEnvFile(envPath)
    }
  }

  hasLoadedEnv = true
}
