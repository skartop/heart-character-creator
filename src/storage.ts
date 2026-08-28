import type { Character } from './types'

const key = 'heart-character-creator/v1'

export const blankCharacter = (): Character => ({
  version: 1, name: '', pronouns: '', ancestry: '', ancestryPrompt: '', keepsakes: ['', ''],
  calling: '', callingPrompt: '', callingItem: '', activeBeats: ['', ''], characterClass: '',
  coreAbility: '', abilities: '', skills: [], skillKnacks: {}, domains: [], domainKnacks: {},
  protections: '', equipment: '', resources: '', history: '', relationships: '', appearance: '',
  bonds: '', notes: '',
})

export function loadCharacter(): Character {
  try {
    const value = localStorage.getItem(key)
    return value ? { ...blankCharacter(), ...JSON.parse(value) } : blankCharacter()
  } catch { return blankCharacter() }
}

export function saveCharacter(character: Character) {
  localStorage.setItem(key, JSON.stringify(character))
}

export function downloadCharacter(character: Character) {
  const blob = new Blob([JSON.stringify(character, null, 2)], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${character.name.trim() || 'heart-character'}-backup.json`
  link.click()
  URL.revokeObjectURL(link.href)
}
