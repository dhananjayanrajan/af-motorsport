'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'

// prevent SSR
const Hyperspeed = dynamic(() => import('@/components/ui/hyperspeed'), { ssr: false })

// utility: hex string → number
const hexToNumber = (hex: string) => parseInt(hex.replace('#', ''), 16)

const DESIGN_SYSTEM = {
  COLORS: {
    PRIMARY: '#00FF41',
    PRIMARY_GLOW: 'rgba(0, 255, 65, 0.9)',
    PRIMARY_MUTED: 'rgba(0, 255, 65, 0.15)',
    BLACK: '#000000',
    ZINC_950: '#09090b',
    ZINC_800: '#27272a',
    ZINC_900: '#1e1e1e',
    NEUTRAL_600: '#525252',
    WHITE: '#FFFFFF',
    WHITE_GLOW: 'rgba(255, 255, 255, 0.7)',
  }
}

type Props = {
  className?: string
}

export default function HyperspeedSection({ className }: Props) {
  const options = useMemo(() => {
    return {
      distortion: 'turbulentDistortion',
      length: 400,
      roadWidth: 10,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSticks: 40,
      lightPairsPerRoadWay: 50,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5],
      lightStickHeight: [1.3, 1.7],
      movingAwaySpeed: [60, 80],
      movingCloserSpeed: [-120, -160],
      carLightsLength: [20, 80],
      carLightsRadius: [0.05, 0.14],
      carWidthPercentage: [0.3, 0.5],
      carShiftX: [-0.5, 0.5],
      carFloorSeparation: [0, 5],

      // mapped to your system
      colors: {
        roadColor: hexToNumber(DESIGN_SYSTEM.COLORS.ZINC_950),
        islandColor: hexToNumber(DESIGN_SYSTEM.COLORS.ZINC_900),
        background: hexToNumber(DESIGN_SYSTEM.COLORS.BLACK),
        shoulderLines: hexToNumber(DESIGN_SYSTEM.COLORS.ZINC_800),
        brokenLines: hexToNumber(DESIGN_SYSTEM.COLORS.ZINC_800),

        // primary green system
        leftCars: [
          hexToNumber(DESIGN_SYSTEM.COLORS.PRIMARY),
          0x00cc33,
          0x009922
        ],

        // contrast whites
        rightCars: [
          hexToNumber(DESIGN_SYSTEM.COLORS.WHITE),
          0xcccccc,
          hexToNumber(DESIGN_SYSTEM.COLORS.NEUTRAL_600)
        ],

        // accent sticks
        sticks: hexToNumber(DESIGN_SYSTEM.COLORS.PRIMARY)
      }
    }
  }, [])

  return (
    <section
      className={className}
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: DESIGN_SYSTEM.COLORS.BLACK
      }}
    >
      <Hyperspeed effectOptions={options} />
    </section>
  )
}