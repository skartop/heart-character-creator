export type StepId = 'welcome' | 'identity' | 'ancestry' | 'calling' | 'class' | 'build' | 'story' | 'review'

export type Choice = {
  id: string
  name: string
  summary: string
  source: string
}

export type Character = {
  version: 1
  name: string
  pronouns: string
  ancestry: string
  ancestryPrompt: string
  keepsakes: string[]
  calling: string
  callingPrompt: string
  callingItem: string
  activeBeats: string[]
  characterClass: string
  coreAbility: string
  abilities: string
  skills: string[]
  skillKnacks: Record<string, string>
  domains: string[]
  domainKnacks: Record<string, string>
  protections: string
  equipment: string
  resources: string
  history: string
  relationships: string
  appearance: string
  bonds: string
  notes: string
}
