"use client"
import React, { useState, useRef } from 'react'
import { Play, Pause, Maximize } from 'lucide-react'
import SectionHeader from '../Components/SectionHeader'
import SectionFooter from '../Components/SectionFooter'
import SectionButton from '../Components/SectionButton'
import MechanicalBackground from '../Backgrounds/MechanicalBackground'

export interface VideoItem {
  id: string
  title: string
  description?: string
  url: string
  poster?: string
  duration?: string
}

interface VideoSectionProps {
  id: string
  title: string
  subtitle: string
  videos: VideoItem[]
  autoplay?: boolean
  showPlaylist?: boolean
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const VideoSection: React.FC<VideoSectionProps> = ({
  id,
  title,
  subtitle,
  videos,
  autoplay = false,
  showPlaylist = true,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background = <MechanicalBackground opacity={0.3} />
}) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(videos[0])
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause()
      else videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoEnd = () => {
    setIsPlaying(false)
    if (videoRef.current) videoRef.current.currentTime = 0
  }

  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      {background}
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(videos.length)} />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative rounded-xl overflow-hidden bg-black shadow-2xl">
              <video
                ref={videoRef}
                src={activeVideo.url}
                poster={activeVideo.poster}
                className="w-full aspect-video object-cover"
                onEnded={handleVideoEnd}
                autoPlay={autoplay}
                controls={false}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center gap-4">
                <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
                <div className="flex-1">
                  <h4 className="text-white font-bold truncate">{activeVideo.title}</h4>
                  {activeVideo.description && <p className="text-white/70 text-sm truncate">{activeVideo.description}</p>}
                </div>
                <button className="w-8 h-8 text-white/70 hover:text-white transition-colors">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          {showPlaylist && (
            <div className="lg:col-span-1 space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => { setActiveVideo(video); setIsPlaying(false); if(videoRef.current) videoRef.current.load(); }}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-300 flex gap-4 ${activeVideo.id === video.id ? 'border-primary bg-primary/5' : 'border-border bg-card hover:shadow-md'}`}
                >
                  {video.poster && <img src={video.poster} alt={video.title} className="w-20 h-16 object-cover rounded" />}
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground">{video.title}</h4>
                    {video.duration && <p className="text-xs text-muted-foreground font-mono mt-1">{video.duration}</p>}
                  </div>
                  {activeVideo.id === video.id && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse mt-2" />}
                </button>
              ))}
            </div>
          )}
        </div>
        {ctaLabel && ctaPath && <div className="flex justify-center mt-12"><SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" /></div>}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default VideoSection
