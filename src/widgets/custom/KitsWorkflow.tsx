import Link from 'next/link'
import type { WidgetServerProps } from 'payload'
import React from 'react'

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

export async function renderKitsWorkflow(payload: any): Promise<React.ReactNode> {
  const result = await payload.find({
    collection: 'kits',
    depth: 1,
    limit: 20,
    sort: '-updatedAt',
  })

  const UI = {
    bg: 'var(--theme-elevation-0)',
    surface: 'var(--theme-elevation-50)',
    surfaceMuted: 'var(--theme-elevation-100)',
    border: 'var(--theme-elevation-150)',
    line: 'var(--theme-elevation-200)',
    textMuted: 'var(--theme-elevation-400)',
    textMid: 'var(--theme-elevation-600)',
    textStrong: 'var(--theme-elevation-900)',
    accent: 'var(--theme-elevation-900)',
    success: 'var(--theme-success-500)',
  }

  const rows = result.docs.map((kit: any) => {
    const { stage, index, missing } = getStage(kit)
    const typeName = typeof kit.type === 'object' && kit.type !== null ? kit.type.name : '—'
    const application = kit.basics?.purpose?.application ?? null
    const updatedAt = new Date(kit.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    const progress = Math.round(((index + 1) / STAGES.length) * 100)
    return { id: kit.id, name: kit.name, typeName, application, stage, index, missing, progress, updatedAt }
  })

  const completedCount = rows.filter((r: any) => r.stage === 'Complete').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0 16px 0' }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 900, color: UI.textStrong, textTransform: 'uppercase', fontStyle: 'italic' }}>Kit_Development_Pipeline</div>
          <div style={{ fontSize: '10px', fontWeight: 800, color: UI.textMuted, marginTop: '4px', letterSpacing: '0.05em' }}>
            {completedCount} READY_UNITS · {rows.length - completedCount} IN_ASSEMBLY
          </div>
        </div>
        <Link href="/admin/collections/kits/create" style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', color: UI.bg, background: UI.accent, padding: '8px 16px', borderRadius: '2px', textDecoration: 'none', letterSpacing: '0.1em' }}>
          Initialize_New_Kit
        </Link>
      </div>

      <div style={{ background: UI.bg, border: `1px solid ${UI.border}`, padding: '24px', marginBottom: '2px' }}>
        <div style={{ fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: UI.textMuted, marginBottom: '20px' }}>Workflow_Stage_Reference</div>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '7px', left: 0, right: 0, height: '1px', background: UI.surfaceMuted }} />
          {STAGES.map((stage) => (
            <div key={stage} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: UI.accent, border: `2px solid ${UI.bg}`, outline: `1px solid ${UI.accent}` }} />
              <span style={{ fontSize: '8px', fontWeight: 900, color: UI.textMuted, textAlign: 'center', textTransform: 'uppercase' }}>{stage}</span>
            </div>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <div style={{ background: UI.bg, border: `1px solid ${UI.border}`, padding: '40px', textAlign: 'center', fontSize: '11px', color: UI.textMuted, fontStyle: 'italic' }}>NO_KIT_TELEMETRY_FOUND</div>
      ) : (
        rows.map((row: any) => (
          <Link key={row.id} href={`/admin/collections/kits/${row.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: UI.bg, border: `1px solid ${UI.border}`, borderLeft: `4px solid ${row.stage === 'Complete' ? UI.success : UI.accent}`, padding: '20px 24px', transition: 'background 0.2s ease' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 950, color: UI.textStrong, textTransform: 'uppercase', marginBottom: '4px' }}>{row.name}</div>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '9px', fontWeight: 800, color: UI.textMuted, textTransform: 'uppercase' }}>
                    <span>{row.typeName}</span>
                    {row.application && <><span>·</span><span>{row.application}</span></>}
                    <span>·</span><span>{row.updatedAt}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 950, color: row.stage === 'Complete' ? UI.success : UI.textMid, textTransform: 'uppercase', letterSpacing: '0.1em', fontStyle: 'italic' }}>
                    {row.stage}
                  </span>
                  <span style={{ fontSize: '18px', fontWeight: 950, fontStyle: 'italic', color: UI.textStrong }}>{row.progress}%</span>
                </div>
              </div>

              <div style={{ width: '100%', height: '2px', background: UI.surfaceMuted, borderRadius: '1px', overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ width: `${row.progress}%`, height: '100%', background: row.stage === 'Complete' ? UI.success : UI.accent }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginBottom: row.missing.length > 0 ? '16px' : 0 }}>
                <div style={{ position: 'absolute', top: '5px', left: 0, right: 0, height: '1px', background: UI.surfaceMuted }} />
                {STAGES.map((_, i) => {
                  const isActive = i === row.index
                  const isPast = i < row.index
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: isPast ? UI.success : isActive ? UI.textStrong : UI.line,
                        border: isActive ? `2px solid ${UI.bg}` : 'none',
                        outline: isActive ? `1px solid ${UI.textStrong}` : 'none'
                      }} />
                    </div>
                  )
                })}
              </div>

              {row.missing.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '12px', background: UI.surface, border: `1px solid ${UI.border}`, borderRadius: '2px' }}>
                  <span style={{ fontSize: '8px', fontWeight: 900, color: UI.accent, textTransform: 'uppercase', letterSpacing: '0.1em', width: '100%', marginBottom: '4px' }}>Requirement_Alerts</span>
                  {row.missing.map((m: string, i: number) => (
                    <span key={i} style={{ fontSize: '9px', fontWeight: 800, color: UI.textMid, background: UI.bg, border: `1px solid ${UI.line}`, padding: '4px 10px', textTransform: 'uppercase' }}>{m}</span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))
      )}
    </div>
  )
}

export default async function KitsWorkflow(props: WidgetServerProps) {
  return renderKitsWorkflow(props.req.payload)
}