import React from 'react'
import Link from 'next/link'
import type { WidgetServerProps } from 'payload'

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

const card: React.CSSProperties = {
  width: '50%',
  background: 'var(--theme-elevation-0)',
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: '4px',
  padding: '20px',
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--theme-elevation-400)',
  marginBottom: '16px',
}

// ─── Exported render function — called by orchestrator directly ───────────────

export async function renderRacingOperationsWorkflow(_payload: any): Promise<React.ReactNode> {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

      {/* Header */}
      <div style={{ padding: '0 0 16px 0' }}>
        <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--theme-elevation-900)' }}>Racing Operations</div>
        <div style={{ fontSize: '12px', color: 'var(--theme-elevation-400)', marginTop: '2px' }}>
          {WORKFLOWS.length} workflows · {WORKFLOWS.reduce((a, w) => a + w.steps.length, 0)} total steps
        </div>
      </div>

      {/* Workflow cards */}
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '8px' }}>

        {WORKFLOWS.map(workflow => (
          <div key={workflow.title} style={{ ...card, marginBottom: '2px' }}>
            <div style={sectionTitleStyle}>{workflow.title}</div>

            {/* Step chain */}
            <div style={{ display: 'flex', alignItems: 'flex-start', overflowX: 'auto', paddingBottom: '4px' }}>
              {workflow.steps.map((step, i) => {
                const isLast = i === workflow.steps.length - 1
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--theme-elevation-100)', border: '1px solid var(--theme-elevation-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--theme-elevation-600)' }}>
                        {i + 1}
                      </div>
                      <span style={{ fontSize: '10px', color: 'var(--theme-elevation-600)', textAlign: 'center', lineHeight: 1.3, wordBreak: 'break-word' }}>
                        {step.label}
                      </span>
                      {step.collection && (
                        <Link href={`/admin/collections/${step.collection}`} style={{ fontSize: '9px', fontWeight: 600, color: 'var(--theme-elevation-400)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.04em', border: '1px solid var(--theme-elevation-200)', padding: '1px 5px', borderRadius: '2px', whiteSpace: 'nowrap' }}>
                          {step.collection}
                        </Link>
                      )}
                    </div>
                    {!isLast && (
                      <div style={{ width: '24px', flexShrink: 0, height: '1px', background: 'var(--theme-elevation-200)', marginTop: '13px' }} />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Step table */}
            <div style={{ marginTop: '16px', borderTop: '1px solid var(--theme-elevation-100)', paddingTop: '16px' }}>
              {workflow.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '7px 0', borderBottom: i === workflow.steps.length - 1 ? 'none' : '1px solid var(--theme-elevation-100)' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--theme-elevation-400)', width: '16px', textAlign: 'right', flexShrink: 0, marginTop: '1px' }}>{i + 1}</span>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--theme-elevation-700)', width: '140px', flexShrink: 0 }}>{step.label}</span>
                  <span style={{ fontSize: '12px', color: 'var(--theme-elevation-500)', flex: 1 }}>{step.description}</span>
                  {step.collection && (
                    <Link href={`/admin/collections/${step.collection}`} style={{ fontSize: '10px', fontWeight: 600, color: 'var(--theme-elevation-0)', background: 'var(--theme-elevation-700)', padding: '2px 8px', borderRadius: '2px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      → {step.collection}
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

// ─── Default export for direct Payload registration if needed ─────────────────

export default async function RacingOperationsWorkflow(props: WidgetServerProps) {
  return renderRacingOperationsWorkflow(props.req)
}