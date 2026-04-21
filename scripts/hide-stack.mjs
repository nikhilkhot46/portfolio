// Post-build cleanup for `next build && output: 'export'`:
//
// 1. Renames out/_next → out/static and rewrites every `/_next/` reference in
//    the emitted HTML/JS/CSS, so the Network tab doesn't advertise the framework.
//
// 2. Prunes RSC artifacts. With all Link components replaced by plain <a> tags,
//    nothing ever requests the __next.*.txt payloads or the _not-found/* route
//    — keeping them just bloats the deploy.
//
// Runs as part of `npm run build`. No dependencies.

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '..', 'out')
const FROM = '_next'
const TO = 'static'

const TEXT_EXTS = new Set([
  '.html', '.htm', '.js', '.mjs', '.css',
  '.json', '.xml', '.txt', '.map', '.svg', '.webmanifest',
])

// Files/dirs under out/ that must stay untouched by the prune pass.
const KEEP_FILES = new Set(['robots.txt'])

async function walk(dir) {
  const out = []
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(p)))
    else out.push(p)
  }
  return out
}

async function renameNextDir() {
  const fromDir = path.join(OUT, FROM)
  const toDir = path.join(OUT, TO)

  try {
    await fs.access(fromDir)
  } catch {
    console.error(`[hide-stack] ${fromDir} not found — did \`next build\` run first?`)
    process.exit(1)
  }

  // Windows can briefly lock files just after `next build` finishes (AV scans,
  // IDE watchers, Turbopack finalization). A plain fs.rename is atomic and
  // fails hard on any single locked file. Copy + remove per-file is slower but
  // survives transient locks because each step retries.
  await fs.rm(toDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 150 })
  await fs.cp(fromDir, toDir, { recursive: true, force: true })
  await fs.rm(fromDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 150 })
  console.log(`[hide-stack] copied out/${FROM}/ → out/${TO}/`)
}

async function rewriteReferences() {
  const files = await walk(OUT)
  let changed = 0
  for (const f of files) {
    const ext = path.extname(f).toLowerCase()
    if (!TEXT_EXTS.has(ext)) continue
    const buf = await fs.readFile(f, 'utf8')
    if (!buf.includes(`/${FROM}/`)) continue
    await fs.writeFile(f, buf.replaceAll(`/${FROM}/`, `/${TO}/`))
    changed++
  }
  console.log(`[hide-stack] rewrote /${FROM}/ → /${TO}/ in ${changed} files`)
}

async function pruneRscArtifacts(dir) {
  let removed = 0
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const name = entry.name
    const p = path.join(dir, name)

    // RSC metadata/payloads — files or directories at any depth.
    if (name.startsWith('__next.') || name.startsWith('__next_')) {
      await fs.rm(p, { recursive: true, force: true })
      removed++
      continue
    }

    // The _not-found route — we serve via `error_page 404 /404.html` in nginx.
    if (name === '_not-found' || name === '_not-found.html' || name === '_not-found.txt') {
      await fs.rm(p, { recursive: true, force: true })
      removed++
      continue
    }

    // Stray RSC .txt payloads (about.txt, blog.txt, index.txt, <slug>.txt, …).
    if (entry.isFile() && name.endsWith('.txt') && !KEEP_FILES.has(name)) {
      await fs.rm(p, { force: true })
      removed++
      continue
    }

    if (entry.isDirectory()) {
      // Skip our renamed build-asset dir — nothing to prune inside.
      if (name === TO) continue
      removed += await pruneRscArtifacts(p)
    }
  }
  return removed
}

async function main() {
  await renameNextDir()
  await rewriteReferences()
  const removed = await pruneRscArtifacts(OUT)
  console.log(`[hide-stack] pruned ${removed} RSC artifact(s)`)
}

main().catch((err) => {
  console.error('[hide-stack] failed:', err)
  process.exit(1)
})
