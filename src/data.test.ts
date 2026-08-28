import { describe, expect, it } from 'vitest'
import { ancestries, callings, classes, domains, skills, steps } from './data'
import { blankCharacter } from './storage'

describe('character creator data', () => {
  it('offers the complete core ancestry, calling, and class choice counts', () => {
    expect(ancestries).toHaveLength(4)
    expect(callings).toHaveLength(5)
    expect(classes).toHaveLength(9)
  })

  it('keeps the official skill and domain lists available to the builder', () => {
    expect(skills).toHaveLength(9)
    expect(domains).toHaveLength(8)
    expect(steps.map((step) => step.id)).toEqual(['welcome', 'identity', 'ancestry', 'calling', 'class', 'build', 'story', 'review'])
  })

  it('creates a versioned blank character with two keepsake and beat slots', () => {
    const character = blankCharacter()
    expect(character.version).toBe(1)
    expect(character.keepsakes).toHaveLength(2)
    expect(character.activeBeats).toHaveLength(2)
  })
})
