import { spawnSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

const args = process.argv.slice(2)
const envPath = resolve(process.cwd(), ".env")
const envFile = readFileSync(envPath, "utf8")
const parsedEnv = {}

for (const line of envFile.split(/\r?\n/)) {
  const trimmed = line.trim()

  if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
    continue
  }

  const [key, ...rest] = trimmed.split("=")
  parsedEnv[key] = rest
    .join("=")
    .trim()
    .replace(/^['"]|['"]$/g, "")
}

const prismaBinary = resolve(
  process.cwd(),
  "node_modules",
  ".bin",
  process.platform === "win32" ? "prisma.cmd" : "prisma"
)

const command = process.platform === "win32" ? "cmd.exe" : prismaBinary
const commandArgs =
  process.platform === "win32" ? ["/c", prismaBinary, ...args] : args

const result = spawnSync(command, commandArgs, {
  stdio: "inherit",
  env: {
    ...process.env,
    ...parsedEnv,
  },
})

if (result.error) {
  console.error(result.error)
  process.exit(1)
}

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}
