import Link from 'next/link'
import type { WidgetServerProps } from 'payload'
import React from 'react'

type WorkflowStep = {
  label: string
  collection?: string
  description: string
}

type Workflow = {
  title: string
  steps: WorkflowStep[]
}

const WORKFLOWS: Workflow[] = [
  {
    title: 'Championship Management',
    steps: [
      { label: 'Series Creation', collection: 'series', description: 'Define the racing series, its rules and structure.' },
      { label: 'Season Setup', collection: 'seasons', description: 'Configure the season calendar and participation rules.' },
      { label: 'Event Scheduling', collection: 'events', description: 'Schedule all race weekends and their locations.' },
      { label: 'Session Config', collection: 'sessions', description: 'Set up practice, qualifying and race sessions.' },
      { label: 'Entry Management', collection: 'entries', description: 'Register all competing drivers and teams.' },
      { label: 'Result Recording', collection: 'results', description: 'Log official race and session results.' },
      { label: 'Points Allocation', collection: 'points', description: 'Calculate and distribute championship points.' },
    ],
  },
  {
    title: 'Event Execution',
    steps: [
      { label: 'Event Planning', collection: 'events', description: 'Define event objectives and logistics.' },
      { label: 'Location Assignment', collection: 'locations', description: 'Assign and configure the venue.' },
      { label: 'Schedule Creation', collection: 'schedules', description: 'Build the full event timetable.' },
      { label: 'Protocol Definition', collection: 'protocols', description: 'Set safety and operational protocols.' },
      { label: 'Session Setup', collection: 'sessions', description: 'Configure each session within the event.' },
      { label: 'Entry Registration', collection: 'entries', description: 'Confirm all entries for the event.' },
      { label: 'Result Processing', collection: 'results', description: 'Process and verify all results.' },
      { label: 'Highlights Capture', collection: 'highlights', description: 'Document key moments from the event.' },
    ],
  },
  {
    title: 'Competition Recording',
    steps: [
      { label: 'Session Prep', collection: 'sessions', description: 'Prepare session configuration and entry list.' },
      { label: 'Entry Confirmation', collection: 'entries', description: 'Confirm all entries are valid and ready.' },
      { label: 'Live Tracking', collection: 'results', description: 'Track results as the session unfolds.' },
      { label: 'Incident Docs', collection: 'incidents', description: 'Document any incidents during the session.' },
      { label: 'Performance Metrics', collection: 'results', description: 'Record detailed performance data.' },
      { label: 'Post Analysis', collection: 'stories', description: 'Analyse session performance post-event.' },
      { label: 'Classification', collection: 'results', description: 'Publish the official session classification.' },
    ],
  },
  {
    title: 'Race Weekend Documentation',
    steps: [
      { label: 'Event Setup', collection: 'events', description: 'Configure the full race weekend.' },
      { label: 'Practice', collection: 'sessions', description: 'Run and document all practice sessions.' },
      { label: 'Qualifying', collection: 'sessions', description: 'Run and document qualifying sessions.' },
      { label: 'Race Sessions', collection: 'sessions', description: 'Run and document the race.' },
      { label: 'Incident Reports', collection: 'incidents', description: 'File all incident and protest reports.' },
      { label: 'Highlight Reels', collection: 'highlights', description: 'Compile key moments into highlights.' },
      { label: 'Post-Event Review', collection: 'stories', description: 'Publish the full post-event review.' },
    ],
  },
]

export async function renderRacingOperationsWorkflow(_payload: any): Promise<React.ReactNode> {
  const UI = {
    bg: 'var(--theme-elevation-0)',
    surface: 'var(--theme-elevation-50)',
    surfaceMuted: 'var(--theme-elevation-100)',
    border: 'var(--theme-elevation-150)',
    line: 'var(--theme-elevation-200)',
    textMuted: 'var(--theme-elevation-400)',
    textMid: 'var(--theme-elevation-600)',
    textStrong: 'var(--theme-elevation-900)',
    accent: 'var(--theme-error-500)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <div style={{ padding: '0 0 24px 0' }}>
        <div style={{ fontSize: '20px', fontWeight: 950, color: UI.textStrong, textTransform: 'uppercase', fontStyle: 'italic' }}>Racing_Operations_Telemetry</div>
        <div style={{ fontSize: '10px', fontWeight: 800, color: UI.textMuted, marginTop: '4px', letterSpacing: '0.1em' }}>
          {WORKFLOWS.length} ACTIVE_STREAMS // {WORKFLOWS.reduce((a, w) => a + w.steps.length, 0)} TOTAL_NODES
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
        {WORKFLOWS.map(workflow => (
          <div key={workflow.title} style={{ background: UI.bg, border: `1px solid ${UI.border}`, padding: '24px' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: UI.textMuted, marginBottom: '20px' }}>
              {workflow.title.replace(/\s+/g, '_')}
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', overflowX: 'auto', paddingBottom: '20px', marginBottom: '20px', borderBottom: `1px solid ${UI.line}`, gap: '1px', background: UI.line }}>
              {workflow.steps.map((step, i) => {
                const isLast = i === workflow.steps.length - 1
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0, background: UI.bg, padding: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '80px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 950, fontStyle: 'italic', color: UI.accent }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <span style={{ fontSize: '8px', fontWeight: 900, color: UI.textStrong, textAlign: 'center', textTransform: 'uppercase', height: '20px', overflow: 'hidden' }}>
                        {step.label}
                      </span>
                      {step.collection && (
                        <div style={{ fontSize: '7px', fontWeight: 900, color: UI.textMuted, border: `1px solid ${UI.line}`, padding: '2px 4px' }}>
                          {step.collection.toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: UI.line }}>
              {workflow.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '10px 14px', background: UI.surface }}>
                  <span style={{ fontSize: '10px', fontWeight: 950, color: UI.textMuted, width: '20px', fontStyle: 'italic' }}>{String(i + 1).padStart(2, '0')}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', fontWeight: 900, color: UI.textStrong, textTransform: 'uppercase' }}>{step.label}</div>
                    <div style={{ fontSize: '9px', fontWeight: 800, color: UI.textMuted, marginTop: '2px' }}>{step.description}</div>
                  </div>
                  {step.collection && (
                    <Link href={`/admin/collections/${step.collection}`} style={{ fontSize: '8px', fontWeight: 900, color: UI.bg, background: UI.textStrong, padding: '4px 10px', textDecoration: 'none', letterSpacing: '0.05em' }}>
                      JUMP_TO_{step.collection.toUpperCase()}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function RacingOperationsWorkflow(props: WidgetServerProps) {
  return renderRacingOperationsWorkflow(props.req.payload)
}