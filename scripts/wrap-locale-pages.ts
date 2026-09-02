// scripts/wrap-locale-pages.ts
// Wrap every locale home/about/contact/tours page in <CmsPage locale=...>
// with the existing static body as fallback. Idempotent: if a page
// is already wrapped, it's skipped.
import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'

const ROOT = path.join(process.cwd(), 'app', '(marketing)')
const LOCALES = ['de', 'it', 'hi', 'ar', 'zh'] as const
const PAGES: { dir: string; slug: string }[] = [
  { dir: '', slug: 'home' },
  { dir: 'about', slug: 'about' },
  { dir: 'contact', slug: 'contact' },
  { dir: 'tours', slug: 'tours' },
]

async function wrap(file: string, slug: string, locale: string) {
  let src = await fs.readFile(file, 'utf8')
  if (src.includes(`<CmsPage`)) {
    return { status: 'skip', reason: 'already wrapped' }
  }
  // 1. Add import line. We insert immediately after the first line
  //    that contains `from "@/lib/i18n/config"` so we don't disturb
  //    local-data imports like `from "@/lib/i18n/data/.../tours-data"`.
  if (!src.includes("from \"../../_components/CmsPage\"")) {
    const importLine = `import { CmsPage } from "../../_components/CmsPage"\n`
    src = src.replace(/(from "@\/lib\/i18n\/config"\n)/, `$1${importLine}`)
  }

  // 2. Wrap return body. We match the first `return (\n` line and
  //    inject <CmsPage ...>, then close at the matching final `)`.
  //    The pattern handles both `<>` and `<div>` openers.
  const openingRe = /(export default function \w+\(\) \{\n(?:  [^/].*\n)*?  return \(\n)/
  const m = src.match(openingRe)
  if (!m) {
    return { status: 'skip', reason: 'opening return() not matched' }
  }
  // Track brace/paren depth to find the closing of the return.
  // For these files the last `  )` before `}` closes the return.
  // Insert wrapper opening after the matched region.
  const afterReturnIdx = m.index! + m[0].length
  src =
    src.slice(0, afterReturnIdx) +
    `    <CmsPage slug="${slug}" locale="${locale}" fallback={\n` +
    src.slice(afterReturnIdx)

  // Now find the last `    )` (4-space indent) before final `}` and
  // close the wrapper just before it.
  const lines = src.split('\n')
  // find last "  )" or "    )" that is followed by "}" at end of file
  let lastCloseParen = -1
  for (let i = lines.length - 1; i >= 0; i--) {
    if (/^\s+\)$/.test(lines[i])) {
      lastCloseParen = i
      break
    }
  }
  if (lastCloseParen === -1) {
    return { status: 'skip', reason: 'closing paren not found' }
  }
  lines.splice(lastCloseParen, 0, '    } />')
  src = lines.join('\n')

  await fs.writeFile(file, src, 'utf8')
  return { status: 'ok' }
}

async function run() {
  let touched = 0
  let skipped = 0
  for (const locale of LOCALES) {
    for (const page of PAGES) {
      const file = path.join(ROOT, locale, page.dir, 'page.tsx')
      try {
        await fs.access(file)
      } catch {
        console.log(`  [missing] ${locale}/${page.slug} — ${file}`)
        skipped++
        continue
      }
      const r = await wrap(file, page.slug, locale)
      console.log(`  [${r.status}] ${locale}/${page.slug} — ${r.reason ?? 'wrapped'}`)
      if (r.status === 'ok') touched++
      else skipped++
    }
  }
  console.log(`\nTouched: ${touched}, Skipped: ${skipped}`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
