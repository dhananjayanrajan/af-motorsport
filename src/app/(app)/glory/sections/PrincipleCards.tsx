// src/components/PrincipleCards.tsx
'use client'

import { useEffect, useState } from 'react'

interface Principle {
    id: number
    name: string
    basics?: {
        description?: string | null
        statement?: string | null
    }
    slug?: string
}

export function PrincipleCards() {
    const [principles, setPrinciples] = useState<Principle[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchPrinciples() {
            try {
                // Fetch from Payload's REST API
                const response = await fetch('/api/principles?depth=1&limit=100')

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status}`)
                }

                const data = await response.json()
                setPrinciples(data.docs || [])
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                console.error('Error fetching principles:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchPrinciples()
    }, [])

    if (loading) {
        return <div className="text-center py-8">Loading principles...</div>
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>
    }

    if (principles.length === 0) {
        return <div className="text-center py-8">No principles found.</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {principles.map((principle) => (
                <div key={principle.id} className="border rounded-lg p-6 shadow-lg bg-white">
                    <h2 className="text-2xl font-bold mb-2">{principle.name}</h2>
                    {principle.basics?.statement && (
                        <p className="text-gray-700 mb-2">
                            <strong>Statement:</strong> {principle.basics.statement}
                        </p>
                    )}
                    {principle.basics?.description && (
                        <p className="text-gray-600">
                            <strong>Description:</strong> {principle.basics.description}
                        </p>
                    )}
                    {principle.slug && (
                        <p className="text-sm text-gray-400 mt-2">Slug: {principle.slug}</p>
                    )}
                </div>
            ))}
        </div>
    )
}