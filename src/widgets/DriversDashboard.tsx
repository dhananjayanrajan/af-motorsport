import type { WidgetServerProps } from 'payload'
import Link from 'next/link'

export default async function DriversDashboard({ req }: WidgetServerProps) {
  const { payload } = req

  const allDocs = await payload.find({
    collection: 'drivers',
    depth: 1,
    limit: 1000,
  })

  const docs = allDocs.docs

  // Stats
  const total = docs.length
  const published = docs.filter((d: any) => d.visibility?.check_publish).length
  const unpublished = total - published
  const featured = docs.filter((d: any) => d.visibility?.check_featured).length
  const pinned = docs.filter((d: any) => d.visibility?.check_pinned).length

  // Recent activity
  const recent = [...docs]
    .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 8)
    .map((d: any) => ({
      id: d.id,
      name: d.names?.first ? `${d.names.first} ${d.names.last ?? ''}`.trim() : d.alias ?? d.name ?? 'Untitled',
      type: typeof d.type === 'object' && d.type !== null ? (d.type as any).name : '—',
      updatedAt: new Date(d.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    }))

  // Type breakdown
  const typeCounts: Record<string, number> = {}
  docs.forEach((d: any) => {
    const t = typeof d.type === 'object' && d.type !== null ? (d.type as any).name : 'Uncategorized'
    typeCounts[t] = (typeCounts[t] || 0) + 1
  })
  const typeData = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])
  const maxTypeCount = typeData[0]?.[1] ?? 1

  // Completion scores
  const sections = ['basics', 'details', 'traits', 'metrics', 'assets', 'contexts']
  const completionScores = docs.map((d: any) => {
    const name = d.names?.first ? `${d.names.first} ${d.names.last ?? ''}`.trim() : d.alias ?? 'Untitled'
    const score = Math.round((sections.filter(s => (d as any)[s]?.enable).length / sections.length) * 100)
    return { id: d.id, name, score }
  }).sort((a, b) => a.score - b.score).slice(0, 10)

  // Toggle distribution
  const simpleCount = docs.filter((d: any) => d.toggle === 'simple').length
  const advancedCount = docs.filter((d: any) => d.toggle === 'advanced').length
  const toggleTotal = simpleCount + advancedCount || 1

  // Publishing pipeline
  const pipeline: Record<string, { id: any; name: string }[]> = { Draft: [], Published: [], Featured: [], Pinned: [] }
  docs.forEach((d: any) => {
    const name = d.names?.first ? `${d.names.first} ${d.names.last ?? ''}`.trim() : d.alias ?? 'Untitled'
    const item = { id: d.id, name }
    const v = d.visibility ?? {}
    if (v.check_pinned) pipeline.Pinned.push(item)
    else if (v.check_featured) pipeline.Featured.push(item)
    else if (v.check_publish) pipeline.Published.push(item)
    else pipeline.Draft.push(item)
  })

  // Slug health
  const slugMap: Record<string, number> = {}
  docs.forEach((d: any) => { if (d.slug) slugMap[d.slug] = (slugMap[d.slug] || 0) + 1 })
  const missing = docs.filter((d: any) => !d.slug || d.slug === '').length
  const autoGen = docs.filter((d: any) => d.generateSlug).length
  const duplicates = Object.values(slugMap).filter(v => v > 1).length

  // Timeline
  const timelineMap: Record<string, number> = {}
  docs.forEach((d: any) => {
    const dt = new Date(d.createdAt)
    const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`
    timelineMap[key] = (timelineMap[key] || 0) + 1
  })
  const timeline = Object.entries(timelineMap).sort(([a], [b]) => a.localeCompare(b))
  const maxTimeline = Math.max(...timeline.map(([, v]) => v), 1)

  // Relationship density
  const densityRows = docs.map((d: any) => {
    let filled = 0, total_rel = 0
    const scan = (group: any) => {
      if (!group || typeof group !== 'object') return
      Object.entries(group).forEach(([k, v]) => {
        if (k === 'enable' || k === 'show' || k === 'visibility') return
        if (typeof v === 'number') { total_rel++; filled++ }
        else if (typeof v === 'object' && v !== null && (v as any).id) { total_rel++; filled++ }
        else if (typeof v === 'object' && v !== null && !Array.isArray(v)) return
        else if (v === null) total_rel++
      })
    }
      ;['details', 'traits', 'assets', 'contexts'].forEach(s => scan((d as any)[s]))
    const score = total_rel === 0 ? 0 : Math.round((filled / total_rel) * 100)
    const name = d.names?.first ? `${d.names.first} ${d.names.last ?? ''}`.trim() : d.alias ?? 'Untitled'
    return { id: d.id, name, score }
  }).sort((a, b) => b.score - a.score).slice(0, 10)

  const row = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid var(--theme-elevation-100)',
  } as const

  const label = {
    fontSize: '12px',
    color: 'var(--theme-elevation-500)',
  } as const

  const value = {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--theme-elevation-800)',
  } as const

  const card = {
    background: 'var(--theme-elevation-0)',
    border: '1px solid var(--theme-elevation-150)',
    borderRadius: '4px',
    padding: '20px',
  } as const

  const sectionTitle = {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color: 'var(--theme-elevation-400)',
    marginBottom: '16px',
  }

  const bar = (pct: number, color = 'var(--theme-elevation-800)') => (
    <div style={{ width: '100%', height: '3px', background: 'var(--theme-elevation-100)', borderRadius: '2px', overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '2px' }} />
    </div>
  )

  const scoreColor = (s: number) =>
    s >= 75 ? 'var(--theme-success-500)' : s >= 50 ? 'var(--theme-elevation-600)' : s >= 25 ? 'var(--theme-warning-500)' : 'var(--theme-error-500)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0 20px 0' }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--theme-elevation-900)' }}>Drivers</div>
          <div style={{ fontSize: '12px', color: 'var(--theme-elevation-400)', marginTop: '2px' }}>{total} record{total !== 1 ? 's' : ''} total</div>
        </div>
        <Link
          href="/admin/collections/drivers/create"
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--theme-elevation-0)',
            background: 'var(--theme-elevation-900)',
            padding: '7px 14px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Add Driver
        </Link>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px', marginBottom: '2px' }}>
        {[
          { label: 'Total', val: total },
          { label: 'Published', val: published },
          { label: 'Unpublished', val: unpublished },
          { label: 'Featured', val: featured },
          { label: 'Pinned', val: pinned },
        ].map(({ label: l, val: v }) => (
          <div key={l} style={{ ...card, padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--theme-elevation-900)', lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: '11px', color: 'var(--theme-elevation-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Row 2: Recent Activity + Type Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '2px' }}>

        {/* Recent Activity */}
        <div style={card}>
          <div style={sectionTitle}>Recent Activity</div>
          {recent.length === 0
            ? <div style={{ fontSize: '12px', color: 'var(--theme-elevation-400)' }}>No records yet.</div>
            : recent.map((item, i) => (
              <Link key={item.id} href={`/admin/collections/drivers/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ ...row, borderBottom: i === recent.length - 1 ? 'none' : '1px solid var(--theme-elevation-100)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--theme-elevation-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: 'var(--theme-elevation-500)', flexShrink: 0 }}>
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--theme-elevation-800)' }}>{item.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--theme-elevation-400)' }}>{item.type}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--theme-elevation-400)', whiteSpace: 'nowrap' }}>{item.updatedAt}</div>
                </div>
              </Link>
            ))
          }
        </div>

        {/* Type Breakdown */}
        <div style={card}>
          <div style={sectionTitle}>Type Breakdown</div>
          {typeData.length === 0
            ? <div style={{ fontSize: '12px', color: 'var(--theme-elevation-400)' }}>No data.</div>
            : typeData.map(([name, count], i) => (
              <div key={name} style={{ marginBottom: i === typeData.length - 1 ? 0 : '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={label}>{name}</span>
                  <span style={value}>{count}</span>
                </div>
                {bar(Math.round((count / maxTypeCount) * 100))}
              </div>
            ))
          }
        </div>
      </div>

      {/* Row 3: Completion + Relationship Density */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '2px' }}>

        {/* Completion Score */}
        <div style={card}>
          <div style={sectionTitle}>Profile Completion</div>
          {completionScores.map((item, i) => (
            <Link key={item.id} href={`/admin/collections/drivers/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ marginBottom: i === completionScores.length - 1 ? 0 : '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={label}>{item.name}</span>
                  <span style={{ ...value, color: scoreColor(item.score) }}>{item.score}%</span>
                </div>
                {bar(item.score, scoreColor(item.score))}
              </div>
            </Link>
          ))}
        </div>

        {/* Relationship Density */}
        <div style={card}>
          <div style={sectionTitle}>Relationship Density</div>
          {densityRows.map((item, i) => (
            <Link key={item.id} href={`/admin/collections/drivers/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ marginBottom: i === densityRows.length - 1 ? 0 : '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={label}>{item.name}</span>
                  <span style={{ ...value, color: scoreColor(item.score) }}>{item.score}%</span>
                </div>
                {bar(item.score, scoreColor(item.score))}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Row 4: Toggle Distribution + Slug Health */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', marginBottom: '2px' }}>

        {/* Toggle Distribution */}
        <div style={card}>
          <div style={sectionTitle}>Mode Distribution</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Simple', count: simpleCount },
              { label: 'Advanced', count: advancedCount },
            ].map(({ label: l, count: c }) => (
              <div key={l}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={label}>{l}</span>
                  <span style={value}>{c} <span style={{ fontWeight: 400, color: 'var(--theme-elevation-400)' }}>({Math.round((c / toggleTotal) * 100)}%)</span></span>
                </div>
                {bar(Math.round((c / toggleTotal) * 100))}
              </div>
            ))}
          </div>
        </div>

        {/* Slug Health */}
        <div style={card}>
          <div style={sectionTitle}>Slug Health</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { label: 'Missing', count: missing, bad: missing > 0 },
              { label: 'Auto-generated', count: autoGen, bad: false },
              { label: 'Duplicate', count: duplicates, bad: duplicates > 0 },
            ].map(({ label: l, count: c, bad }, i, arr) => (
              <div key={l} style={{ ...row, borderBottom: i === arr.length - 1 ? 'none' : '1px solid var(--theme-elevation-100)' }}>
                <span style={label}>{l}</span>
                <span style={{ ...value, color: bad ? 'var(--theme-error-500)' : c === 0 ? 'var(--theme-success-500)' : 'var(--theme-elevation-800)' }}>
                  {c === 0 && !bad ? '✓ None' : c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 5: Publishing Pipeline */}
      <div style={{ ...card, marginBottom: '2px' }}>
        <div style={sectionTitle}>Publishing Pipeline</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {Object.entries(pipeline).map(([stage, items]) => (
            <div key={stage}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--theme-elevation-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stage}</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--theme-elevation-900)', background: 'var(--theme-elevation-100)', padding: '1px 7px', borderRadius: '10px' }}>{items.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {items.slice(0, 5).map(item => (
                  <Link key={item.id} href={`/admin/collections/drivers/${item.id}`} style={{ fontSize: '12px', color: 'var(--theme-elevation-700)', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </Link>
                ))}
                {items.length > 5 && <span style={{ fontSize: '11px', color: 'var(--theme-elevation-400)' }}>+{items.length - 5} more</span>}
                {items.length === 0 && <span style={{ fontSize: '11px', color: 'var(--theme-elevation-300)' }}>Empty</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 6: Timeline */}
      <div style={card}>
        <div style={sectionTitle}>Creation Timeline</div>
        {timeline.length === 0
          ? <div style={{ fontSize: '12px', color: 'var(--theme-elevation-400)' }}>No data yet.</div>
          : (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '64px' }}>
              {timeline.map(([month, count]) => (
                <div key={month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '4px' }}>
                  <div
                    style={{
                      width: '100%',
                      background: 'var(--theme-elevation-800)',
                      borderRadius: '2px 2px 0 0',
                      height: `${Math.round((count / maxTimeline) * 48)}px`,
                      minHeight: '3px',
                    }}
                  />
                  <span style={{ fontSize: '9px', color: 'var(--theme-elevation-400)', whiteSpace: 'nowrap' }}>
                    {month.split('-')[1]}/{month.split('-')[0].slice(2)}
                  </span>
                </div>
              ))}
            </div>
          )
        }
      </div>

    </div>
  )
}