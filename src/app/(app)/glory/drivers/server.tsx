import { getCachedDoc } from '@/lib/payload'
import { PageClient } from './PageClient'

export async function Server() {
  const [legend, conquests, gloryNumbers, rivals, machines, team, strategy, celebrations, voice, visual] = await Promise.all([
    getCachedDoc('legends', 'driver-123'),
    getCachedDoc('conquests', 'driver-123'),
    getCachedDoc('glory-numbers', 'driver-123'),
    getCachedDoc('rivals', 'driver-123'),
    getCachedDoc('machines', 'driver-123'),
    getCachedDoc('team', 'driver-123'),
    getCachedDoc('strategy', 'driver-123'),
    getCachedDoc('celebrations', 'driver-123'),
    getCachedDoc('voice', 'driver-123'),
    getCachedDoc('visual', 'driver-123')
  ])

  const pageData = {
    sections: [
      { blockType: 'LegendSection', data: legend },
      { blockType: 'ConquestsSection', data: conquests },
      { blockType: 'GloryNumbersSection', data: gloryNumbers },
      { blockType: 'RivalsOvercomeSection', data: rivals },
      { blockType: 'MachinesThatCarriedThemSection', data: machines },
      { blockType: 'TeamBehindTheGlorySection', data: team },
      { blockType: 'DefiningStrategySection', data: strategy },
      { blockType: 'CelebrationsSection', data: celebrations },
      { blockType: 'VoiceOfAChampionSection', data: voice },
      { blockType: 'VisualMonumentSection', data: visual }
    ]
  }

  return <PageClient pageData={pageData} />
}