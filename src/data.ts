import type { Choice, StepId } from './types'

export const steps: { id: StepId; label: string; kicker: string }[] = [
  { id: 'welcome', label: 'Begin', kicker: 'Before you delve' },
  { id: 'identity', label: 'Identity', kicker: 'Who are you?' },
  { id: 'ancestry', label: 'Ancestry', kicker: 'Where did you begin?' },
  { id: 'calling', label: 'Calling', kicker: 'Why do you keep going?' },
  { id: 'class', label: 'Class', kicker: 'How do you survive?' },
  { id: 'build', label: 'Loadout', kicker: 'What do you bring?' },
  { id: 'story', label: 'Story', kicker: 'What matters to you?' },
  { id: 'review', label: 'Finish', kicker: 'Ready to descend' },
]

export const ancestries: Choice[] = [
  { id: 'drow', name: 'Drow', summary: 'A survivor shaped by the impossible city above and the roads beneath it. Choose details that make your relationship with Spire feel personal.', source: 'Heart core book, character creation: ancestry' },
  { id: 'human', name: 'Human', summary: 'Grounded, adaptable, and never uncomplicated. Decide what brought you to the City Beneath and what you are still trying to prove.', source: 'Heart core book, character creation: ancestry' },
  { id: 'aelfir', name: 'Aelfir', summary: 'Beautiful, long-lived, and deeply out of place. Consider what status or certainty you have lost - or what you hope the depths will erase.', source: 'Heart core book, character creation: ancestry' },
  { id: 'gnoll', name: 'Gnoll', summary: 'A person of fierce communities, memory, and appetite. Think about the people you carry with you, whether they are present or not.', source: 'Heart core book, character creation: ancestry' },
]

export const callings: Choice[] = [
  { id: 'adventure', name: 'Adventure', summary: 'You want the story, the danger, and the thing no sensible person would pursue. Give your hunger for discovery a face.', source: 'Heart core book, callings' },
  { id: 'enlightenment', name: 'Enlightenment', summary: 'You believe the depths hold a truth worth the cost. Name the question that keeps pulling you farther down.', source: 'Heart core book, callings' },
  { id: 'forced', name: 'Forced', summary: 'You did not choose this road freely. Decide who or what has made the descent unavoidable.', source: 'Heart core book, callings' },
  { id: 'heartsong', name: 'Heartsong', summary: 'Something in the Heart calls to you in a voice only you can hear. Describe the promise it seems to make.', source: 'Heart core book, callings' },
  { id: 'penitent', name: 'Penitent', summary: 'You came below to answer for something. Decide whether you seek forgiveness, punishment, or a way to make amends.', source: 'Heart core book, callings' },
]

export const classes: Choice[] = [
  { id: 'cleaver', name: 'Cleaver', summary: 'A fighter who meets horror head-on. Choose this if you want your character’s violence to feel direct, costly, and personal.', source: 'Heart core book, classes' },
  { id: 'deadwalker', name: 'Deadwalker', summary: 'Someone who has crossed close to death and learned to travel with it. Choose this for ghostly ties and an intimate relationship with endings.', source: 'Heart core book, classes' },
  { id: 'deep-apiarist', name: 'Deep Apiarist', summary: 'A keeper of strange bees and stranger symbioses. Choose this for body horror, care, and a living colony at your side.', source: 'Heart core book, classes' },
  { id: 'heretic', name: 'Heretic', summary: 'A believer whose faith does not fit safely in the world. Choose this to wrestle with devotion, miracles, and dangerous certainty.', source: 'Heart core book, classes' },
  { id: 'hound', name: 'Hound', summary: 'A tracker who follows people, monsters, and unfinished business. Choose this for pursuit, isolation, and relentless competence.', source: 'Heart core book, classes' },
  { id: 'incarnadine', name: 'Incarnadine', summary: 'A person remade by the Heart’s impossible beauty. Choose this for transformation, desire, and power that changes what you are.', source: 'Heart core book, classes' },
  { id: 'junk-mage', name: 'Junk Mage', summary: 'A scavenger-mystic who finds magic in discarded things. Choose this for inventive problem-solving and wonderfully unreliable rituals.', source: 'Heart core book, classes' },
  { id: 'vermissian-knight', name: 'Vermissian Knight', summary: 'A veteran of the cursed underground railway. Choose this for martial discipline, old routes, and loyalty to a lost institution.', source: 'Heart core book, classes' },
  { id: 'witch', name: 'Witch', summary: 'A practitioner of intimate, unsettling magic. Choose this for bargains, secrets, and power that is never emotionally neutral.', source: 'Heart core book, classes' },
]

export const skills = ['Compel', 'Delve', 'Discern', 'Endure', 'Evade', 'Hunt', 'Kill', 'Mend', 'Sneak']
export const domains = ['Cursed', 'Desolate', 'Haven', 'Occult', 'Religion', 'Technology', 'Warren', 'Wild']
