"use client"
import { Pause, Play } from 'lucide-react'
import React, { useRef, useState } from 'react'
import BlueprintsBackground from '../Backgrounds/BlueprintsBackground'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

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
  background = <BlueprintsBackground opacity={0.3} />
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

  const getVideoUrl = (video: VideoItem) => {
    if (video.url && video.url.trim() !== '') return video.url
    return 'https://www.w3schools.com/html/mov_bbb.mp4'
  }

  const getPosterUrl = (video: VideoItem) => {
    if (video.poster && video.poster.trim() !== '') return video.poster
    return `https://picsum.photos/id/${Math.abs(video.id.charCodeAt(0) % 100)}/640/360`
  }

  return (
    <section className="relative w-full bg-white-pure border-y-2 border-black-pure">
      {background}
      <div className="relative z-10 container mx-auto px-8 py-16 md:py-24">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(videos.length)} />
        <div className="mt-12 flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="relative border-2 border-black-pure bg-black-pure">
              <video
                ref={videoRef}
                src={getVideoUrl(activeVideo)}
                poster={getPosterUrl(activeVideo)}
                className="w-full aspect-video object-cover"
                onEnded={handleVideoEnd}
                autoPlay={autoplay}
                controls={false}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black-pure border-t-2 border-black-pure p-4 flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 bg-white-pure border-2 border-black-pure flex items-center justify-center hover:bg-primary-500 transition-colors duration-100"
                >
                  {isPlaying ? <Pause className="w-5 h-5 text-black-pure" /> : <Play className="w-5 h-5 text-black-pure ml-0.5" />}
                </button>
                <div className="flex-1">
                  <h4 className="text-white-pure font-mono font-black text-xs uppercase tracking-widest truncate">{activeVideo.title}</h4>
                  {activeVideo.description && (
                    <p className="text-white-pure/60 font-mono text-[10px] uppercase truncate">{activeVideo.description}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {showPlaylist && (
            <div className="w-full lg:w-80 flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2">
              {videos.map((video, idx) => {
                const isActive = activeVideo.id === video.id
                return (
                  <button
                    key={video.id}
                    onClick={() => { setActiveVideo(video); setIsPlaying(false); if (videoRef.current) videoRef.current.load(); }}
                    className={`w-full text-left p-4 border-2 border-black-pure flex gap-4 transition-all duration-100 group ${isActive ? 'bg-primary-500' : 'bg-white-pure hover:bg-black-pure'}`}
                  >
                    <div className="shrink-0">
                      <div className="w-16 h-12 bg-black-pure border border-black-pure flex items-center justify-center">
                        <span className="text-white-pure font-mono font-black text-xs">{idx + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-mono font-black text-xs uppercase tracking-widest truncate ${isActive ? 'text-black-pure' : 'text-black-pure group-hover:text-white-pure'}`}>
                        {video.title}
                      </h4>
                      {video.duration && (
                        <p className={`font-mono text-[10px] font-black uppercase mt-1 ${isActive ? 'text-black-pure/60' : 'text-black-pure/40 group-hover:text-white-pure/60'}`}>
                          {video.duration}
                        </p>
                      )}
                    </div>
                    {isActive && <div className="w-1.5 h-1.5 bg-black-pure rotate-45 mt-2" />}
                  </button>
                )
              })}
            </div>
          )}
        </div>
        {ctaLabel && ctaPath && (
          <div className="flex justify-center mt-12">
            <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
          </div>
        )}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default VideoSection