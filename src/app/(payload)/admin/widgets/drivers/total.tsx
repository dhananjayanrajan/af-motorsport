import type { WidgetServerProps } from 'payload'

export default async function TotalDriversWidget({ req }: WidgetServerProps) {
  const { payload } = req
  const driverCount = await payload.count({ collection: 'drivers' })
  return (
    <div className="card">
      <h3>Total Drivers</h3>
      <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '12px 0' }}>
        {driverCount.totalDocs.toLocaleString()}
      </p>
    </div>
  )
}