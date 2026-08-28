import fontkit from '@pdf-lib/fontkit'
import { PDFDocument, type PDFFont, type PDFPage, rgb } from 'pdf-lib'
import type { Character } from './types'

const skillOrder = ['Compel', 'Delve', 'Discern', 'Endure', 'Evade', 'Hunt', 'Kill', 'Mend', 'Sneak']
const domainOrder = ['Cursed', 'Desolate', 'Haven', 'Occult', 'Religion', 'Technology', 'Warren', 'Wild']
const clean = (value: string) => value.replace(/[\u2018\u2019]/g, "'").replace(/[\u2013\u2014]/g, '-').replace(/[ \t]+/g, ' ').trim()

function wrap(value: string, font: PDFFont, size: number, width: number) {
  const words = clean(value).split(' ').filter(Boolean)
  const result: string[] = []
  let line = ''
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(next, size) > width && line) { result.push(line); line = word } else line = next
  }
  if (line) result.push(line)
  return result
}

function drawBlock(page: PDFPage, value: string, x: number, y: number, width: number, maxLines: number, font: PDFFont, size = 8.4) {
  const text = clean(value)
  if (!text) return
  const lines = text.split(/\n+/).flatMap((paragraph) => wrap(paragraph, font, size, width))
  lines.slice(0, maxLines).forEach((line, index) => page.drawText(line, { x, y: y - index * (size + 2.1), size, font, color: rgb(0.34, 0.02, 0.04) }))
}

export async function downloadSheet(character: Character) {
  const base = import.meta.env.BASE_URL
  const [template, typeface] = await Promise.all([
    fetch(`${base}heart-character-sheet.pdf`).then((response) => response.arrayBuffer()),
    fetch(`${base}fonts/Alegreya-wght.ttf`).then((response) => response.arrayBuffer()),
  ])
  const pdf = await PDFDocument.load(template)
  pdf.registerFontkit(fontkit)
  // pdf-lib's subset writer corrupts glyphs for this variable TrueType face.
  // Keep the font whole so every character renders reliably in the exported sheet.
  const font = await pdf.embedFont(typeface)
  const page1 = pdf.getPage(0)
  const page2 = pdf.getPage(1)
  const ink = rgb(0.34, 0.02, 0.04)
  const line = (page: PDFPage, value: string, x: number, y: number, size: number, width: number) => {
    const content = clean(value)
    if (!content) return
    const fitted = font.widthOfTextAtSize(content, size) > width ? wrap(content, font, size, width)[0] : content
    page.drawText(fitted, { x, y, size, font, color: ink })
  }
  const mark = (page: PDFPage, x: number, y: number) => page.drawText('x', { x, y, size: 12, font, color: ink })

  // Page one: each coordinate is anchored to a writable rule or panel on the official sheet.
  line(page1, character.name, 116, 665, 14, 184)
  line(page1, character.characterClass, 116, 644, 10.5, 184)
  line(page1, character.calling, 116, 623, 10.5, 184)
  drawBlock(page1, character.activeBeats.filter(Boolean).join('\n'), 330, 644, 238, 2, font, 9.5)
  drawBlock(page1, [character.coreAbility, character.abilities].filter(Boolean).join('\n\n'), 330, 564, 224, 31, font, 8.2)
  const skillY = [465, 451, 437, 423, 409, 395, 381, 367, 353]
  character.skills.forEach((skill) => { const index = skillOrder.indexOf(skill); if (index >= 0) { mark(page1, 47, skillY[index]); line(page1, character.skillKnacks[skill] ?? '', 105, skillY[index] + 1, 7.4, 50) } })
  const domainY = [465, 451, 437, 423, 409, 395, 381, 367]
  character.domains.forEach((domain) => { const index = domainOrder.indexOf(domain); if (index >= 0) { mark(page1, 169, domainY[index]); line(page1, character.domainKnacks[domain] ?? '', 250, domainY[index] + 1, 7.4, 55) } })
  drawBlock(page1, character.equipment, 116, 157, 182, 5, font, 8.5)
  drawBlock(page1, character.resources, 330, 157, 238, 5, font, 8.5)
  // Protection guidance belongs in the builder. The sheet's small boxes remain
  // blank so players can track the actual values earned during play.

  // Page two: retain generous writing space and do not cover the sheet's illustrated headings.
  drawBlock(page2, [character.history && `History: ${character.history}`, character.relationships && `Relationships: ${character.relationships}`].filter(Boolean).join('\n\n'), 61, 672, 220, 38, font, 8.7)
  drawBlock(page2, character.appearance, 332, 682, 220, 37, font, 8.7)
  drawBlock(page2, character.notes, 302, 470, 245, 30, font, 8.7)
  drawBlock(page2, character.bonds, 61, 252, 210, 8, font, 8.5)
  const bytes = await pdf.save()
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${character.name.trim() || 'heart-character'}-sheet.pdf`
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(link.href), 60_000)
}
