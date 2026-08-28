export type StepId = 'welcome' | 'identity' | 'ancestry' | 'calling' | 'class' | 'abilities' | 'build' | 'story' | 'review'

export type Choice = {
  id: string
  name: string
  summary: string
  source: string
}

export type Ability = {
  id: string
  name: string
  description: string
}

export type ClassChoice = Choice & {
  coreAbilities: Ability[]
  starter: {
    skills: string[]
    domains: string[]
    resource: string
    equipment: string[]
    protectionNote: string
  }
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
  selectedCoreAbilities: string[]
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
