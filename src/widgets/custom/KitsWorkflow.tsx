import React from 'react'
import Link from 'next/link'
import type { WidgetServerProps } from 'payload'

const STAGES = ['Concept', 'Design', 'Materials', 'Construction', 'Entity Assignment', 'Gallery', 'Visualization', 'Complete'] as const
type Stage = typeof STAGES[number]

function getStage(kit: any): { stage: Stage; index: number; missing: string[] } {
  const missing: string[] = []

  if (!kit.details?.design?.concept) {
    missing.push('Design concept')
    return { stage: 'Concept', index: 0, missing }
  }
  if (!kit.traits?.composition?.construction) {
    missing.push('Construction method')
    return { stage: 'Design', index: 1, missing }
  }
  if (!kit.traits?.materials?.length) {
    missing.push('Material specifications')
    return { stage: 'Materials', index: 2, missing }
  }
  if (!kit.traits?.appearance?.colors) {
    missing.push('Colors and appearance')
    return { stage: 'Construction', index: 3, missing }
  }
  if (!kit.contexts?.enable) {
    missing.push('Entity assignment')
    return { stage: 'Entity Assignment', index: 4, missing }
  }
  if (!kit.assets?.enable) {
    missing.push('Photo gallery')
    return { stage: 'Gallery', index: 5, missing }
  }
  return { stage: 'Complete', index: 7, missing: [] }
}

// ─── Exported render function — called by orchestrator directly ───────────────

export async function renderKitsWorkflow(payload: any): Promise<React.ReactNode> {
  const result = await payload.find({
    collection: 'kits',
    depth: 1,
    limit: 20,
    sort: '-updatedAt',
  })

  const rows = result.docs.map((kit: any) => {
    const { stage, index, missing } = getStage(kit)
    const typeName = typeof kit.type === 'object' && kit.type !== null ? kit.type.name : '—'
    const application = kit.basics?.purpose?.application ?? null
    const updatedAt = new Date(kit.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    const progress = Math.round(((index + 1) / STAGES.length) * 100)
    return { id: kit.id, name: kit.name, typeName, application, stage, index, missing, progress, updatedAt }
  })

  const completedCount = rows.filter((r: any) => r.stage === 'Complete').length

  const stageColor = (idx: number, current: number) => {
    if (idx < current) return 'var(--theme-success-500)'
    if (idx === current) return 'var(--theme-elevation-900)'
    return 'var(--theme-elevation-200)'
  }

  const card: React.CSSProperties = {
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0 16px 0' }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--theme-elevation-900)' }}>Kit Development Pipeline</div>
          <div style={{ fontSize: '12px', color: 'var(--theme-elevation-400)', marginTop: '2px' }}>
            {completedCount} complete · {rows.length - completedCount} in progress
          </div>
        </div>
        <Link href="/admin/collections/kits/create" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--theme-elevation-0)', background: 'var(--theme-elevation-900)', padding: '7px 14px', borderRadius: '4px', textDecoration: 'none' }}>
          Add Kit
        </Link>
      </div>

      {/* Stage legend */}
      <div style={{ ...card, marginBottom: '2px' }}>
        <div style={sectionTitleStyle}>Pipeline Stages</div>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '6px', left: 0, right: 0, height: '2px', background: 'var(--theme-elevation-100)' }} />
          {STAGES.map((stage) => (
            <div key={stage} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'var(--theme-elevation-900)', border: '2px solid var(--theme-elevation-0)', outline: '1px solid var(--theme-elevation-900)' }} />
              <span style={{ fontSize: '9px', color: 'var(--theme-elevation-500)', textAlign: 'center', lineHeight: 1.3 }}>{stage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Kit rows */}
      {rows.length === 0
        ? <div style={{ ...card, fontSize: '12px', color: 'var(--theme-elevation-400)' }}>No kits found.</div>
        : rows.map((row: any) => (
          <Link key={row.id} href={`/admin/collections/kits/${row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ ...card, borderLeft: `3px solid ${row.stage === 'Complete' ? 'var(--theme-success-500)' : 'var(--theme-elevation-800)'}`, padding: '16px 20px' }}>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--theme-elevation-900)', marginBottom: '3px' }}>{row.name}</div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--theme-elevation-400)' }}>
                    <span>{row.typeName}</span>
                    {row.application && <><span>·</span><span>{row.application}</span></>}
                    <span>·</span><span>{row.updatedAt}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: row.stage === 'Complete' ? 'var(--theme-success-500)' : 'var(--theme-elevation-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {row.stage}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--theme-elevation-900)' }}>{row.progress}%</span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '2px', background: 'var(--theme-elevation-100)', borderRadius: '2px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: `${row.progress}%`, height: '100%', borderRadius: '2px', background: row.stage === 'Complete' ? 'var(--theme-success-500)' : 'var(--theme-elevation-800)' }} />
              </div>

              {/* Stage dots */}
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginBottom: row.missing.length > 0 ? '12px' : 0 }}>
                <div style={{ position: 'absolute', top: '5px', left: 0, right: 0, height: '1px', background: 'var(--theme-elevation-100)' }} />
                {STAGES.map((_, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: stageColor(i, row.index), border: i === row.index ? '2px solid var(--theme-elevation-0)' : 'none', outline: i === row.index ? '1px solid var(--theme-elevation-900)' : 'none' }} />
                  </div>
                ))}
              </div>

              {/* Missing requirements */}
              {row.missing.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '8px 10px', background: 'var(--theme-elevation-50)', border: '1px solid var(--theme-elevation-150)', borderRadius: '3px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--theme-elevation-500)', textTransform: 'uppercase', letterSpacing: '0.05em', width: '100%', marginBottom: '4px' }}>Required</span>
                  {row.missing.map((m: string, i: number) => (
                    <span key={i} style={{ fontSize: '11px', color: 'var(--theme-elevation-600)', background: 'var(--theme-elevation-100)', padding: '2px 8px', borderRadius: '2px' }}>{m}</span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))
      }
    </div>
  )
}

// ─── Default export for direct Payload registration if needed ─────────────────

export default async function KitsWorkflow(props: WidgetServerProps) {
  return renderKitsWorkflow(props.req)
}