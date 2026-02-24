import React from 'react'

import { renderKitsWorkflow } from './custom/KitsWorkflow'
import { renderRacingOperationsWorkflow } from './custom/RacingOperationsWorkflow'

type CustomRenderer = (payload: any) => Promise<React.ReactNode>

export const CUSTOM_WIDGET_REGISTRY = new Map<string, CustomRenderer>([
  ['KitsWorkflow', renderKitsWorkflow],
  ['RacingOperationsWorkflow', renderRacingOperationsWorkflow],
])