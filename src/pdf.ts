import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import type { Character } from './types'

const safe = (value: string) => value.replace(/[^\x20-\x7E\n]/g, "'")
const lines = (value: string, max = 46) => {
  const words = safe(value).split(/\s+/).filter(Boolean)
  const result: string[] = []
  let line = ''
  for (const word of words) {
    if (`${line} ${word}`.trim().length > max) { if (line) result.push(line); line = word } else line = `${line} ${word}`.trim()
  }
  if (line) result.push(line)
  return result
}

export async function downloadSheet(character: Character) {
  const template = await fetch(`${import.meta.env.BASE_URL}heart-character-sheet.pdf`).then((response) => response.arrayBuffer())
  const pdf = await PDFDocument.load(template)
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const page1 = pdf.getPage(0)
  const page2 = pdf.getPage(1)
  const ink = rgb(0.08, 0.05, 0.06)
  const text = (page: typeof page1, value: string, x: number, y: number, size = 8, strong = false) => page.drawText(safe(value), { x, y, size, font: strong ? bold : font, color: ink, maxWidth: 210 })
  const block = (page: typeof page1, value: string, x: number, y: number, maxLines: number, width = 210) => lines(value).slice(0, maxLines).forEach((line, index) => page.drawText(line, { x, y: y - index * 10, size: 7.5, font, color: ink, maxWidth: width }))

  text(page1, character.name, 93, 744, 14, true)
  text(page1, character.characterClass, 93, 727, 8)
  text(page1, character.calling, 93, 712, 8)
  block(page1, character.activeBeats.filter(Boolean).join('\n'), 350, 744, 2, 160)
  block(page1, [character.coreAbility, character.abilities].filter(Boolean).join('\n\n'), 52, 514, 12, 218)
  block(page1, character.protections, 52, 410, 4, 218)
  block(page1, character.equipment, 52, 170, 4, 220)
  block(page1, character.resources, 284, 170, 4, 220)
  const skillY = [480, 462, 444, 426, 408, 390, 372, 354, 336]
  character.skills.forEach((skill) => { const i = ['Compel','Delve','Discern','Endure','Evade','Hunt','Kill','Mend','Sneak'].indexOf(skill); if (i >= 0) { text(page1, 'X', 294, skillY[i], 9, true); text(page1, character.skillKnacks[skill] ?? '', 335, skillY[i], 7) } })
  const domainY = [480, 462, 444, 426, 408, 390, 372, 354]
  character.domains.forEach((domain) => { const i = ['Cursed','Desolate','Haven','Occult','Religion','Technology','Warren','Wild'].indexOf(domain); if (i >= 0) { text(page1, 'X', 500, domainY[i], 9, true); text(page1, character.domainKnacks[domain] ?? '', 530, domainY[i], 7) } })
  block(page2, character.history, 52, 711, 17, 240)
  block(page2, character.relationships, 316, 711, 17, 240)
  block(page2, character.appearance, 52, 395, 10, 240)
  block(page2, character.notes, 316, 395, 10, 240)
  block(page2, character.bonds, 52, 164, 5, 510)
  const bytes = await pdf.save()
  const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${character.name.trim() || 'heart-character'}-sheet.pdf`
  link.click()
  URL.revokeObjectURL(link.href)
}
