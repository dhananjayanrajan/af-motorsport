"use client"
import { Activity, AlertTriangle, ChevronLeft, ChevronRight, List, Monitor, Pause, Play, VideoOff, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import BlueprintsBackground from '../Backgrounds/BlueprintsBackground'
import SectionButton from '../Components/SectionButton'

export interface VideoItem {
  id: string
  title: string
  description?: string
  url: string
  poster?: string
  duration?: string
}

interface VideoLabels {
  channelPrefix: string
  broadcastStatus: string
  liveFeed: string
  metaTransmission: string
  statusLost?: string
  errorCode?: string
}

interface VideoSectionProps {
  id: string
  title: string
  subtitle: string
  videos: VideoItem[]
  labels: VideoLabels
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
  videos = [],
  labels,
  autoplay = false,
  showPlaylist = true,
  ctaLabel,
  ctaPath,
  background = <BlueprintsBackground opacity={0.3} />
}) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(videos[0])
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    if (isPlaylistOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isPlaylistOpen])

  const hasVideoSource = activeVideo?.url && activeVideo.url.trim() !== ''

  const togglePlay = () => {
    if (videoRef.current && hasVideoSource) {
      if (isPlaying) videoRef.current.pause()
      else videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoEnd = () => {
    handleNext()
  }

  const handleVideoSelect = (video: VideoItem) => {
    setActiveVideo(video)
    setIsPlaying(true)
    setIsPlaylistOpen(false)
  }

  const handleNext = () => {
    const currentIndex = videos.findIndex(v => v.id === activeVideo.id)
    const nextIndex = (currentIndex + 1) % videos.length
    handleVideoSelect(videos[nextIndex])
  }

  const handlePrevious = () => {
    const currentIndex = videos.findIndex(v => v.id === activeVideo.id)
    const prevIndex = (currentIndex - 1 + videos.length) % videos.length
    handleVideoSelect(videos[prevIndex])
  }

  return (
    <section id={id} className={`relative w-full bg-white-pure border-t border-black-pure overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {background}

      <div className="w-full relative bg-black-pure">
        <div className="relative flex flex-col bg-black-pure min-h-[calc(100vh-200px)]">

          <div className="absolute top-0 left-0 z-20 p-6 flex items-center gap-4 bg-black-pure/40 backdrop-blur-md border-b border-r border-white-pure/10">
            <div className={`w-3 h-3 ${hasVideoSource ? 'bg-primary-500' : 'bg-red-500'} animate-pulse`} />
            <span className="text-xs font-bold text-white-pure uppercase tracking-[0.3em]">
              {activeVideo?.id}
            </span>
          </div>

          {showPlaylist && (
            <button
              onClick={() => setIsPlaylistOpen(true)}
              className="absolute top-0 right-0 z-40 w-16 h-16 border-l border-b border-white-pure/20 bg-black-pure flex items-center justify-center hover:bg-primary-500 transition-all duration-300 group"
            >
              <List className="w-6 h-6 text-white-pure group-hover:text-black-pure transition-transform duration-300 group-hover:scale-110" />
            </button>
          )}

          <div className="relative w-full overflow-hidden flex items-center justify-center bg-black-pure group/player" style={{ height: 'calc(100vh - 200px)' }}>
            <button
              onClick={handlePrevious}
              className="absolute left-0 z-30 w-16 h-full flex items-center justify-center text-white-pure/0 hover:text-white-pure hover:bg-white-pure/5 transition-all duration-500"
            >
              <ChevronLeft className="w-10 h-10 translate-x-4 group-hover/player:translate-x-0 transition-transform duration-500" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 z-30 w-16 h-full flex items-center justify-center text-white-pure/0 hover:text-white-pure hover:bg-white-pure/5 transition-all duration-500"
            >
              <ChevronRight className="w-10 h-10 -translate-x-4 group-hover/player:translate-x-0 transition-transform duration-500" />
            </button>

            {hasVideoSource ? (
              <>
                <video
                  ref={videoRef}
                  src={activeVideo.url}
                  poster={activeVideo.poster}
                  className="w-full h-full object-cover opacity-90 transition-opacity duration-700"
                  onEnded={handleVideoEnd}
                  autoPlay={autoplay}
                  controls={false}
                  playsInline
                  loop={false}
                />
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center group z-10 transition-all duration-500"
                  >
                    <div className="w-24 h-24 border border-white-pure bg-black-pure/20 backdrop-blur-sm group-hover:bg-primary-500 group-hover:scale-110 transition-all duration-500 flex items-center justify-center">
                      <Play className="w-10 h-10 text-white-pure fill-current group-hover:text-black-pure transition-colors" />
                    </div>
                  </button>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black-pure">
                <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-700">
                  <div className="relative">
                    <VideoOff className="w-20 h-20 text-white-pure/5" />
                    <AlertTriangle className="absolute -top-2 -right-2 w-10 h-10 text-primary-500" />
                  </div>
                  <div className="text-center space-y-4">
                    <p className="text-sm font-bold text-primary-500 uppercase tracking-[0.5em]">
                      {labels.statusLost || labels.liveFeed}
                    </p>
                    <p className="text-[10px] font-bold text-white-pure/30 uppercase tracking-[0.2em]">
                      {activeVideo?.id}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-0 border-t border-white-pure/10 flex flex-col md:flex-row items-stretch">
            <button
              onClick={togglePlay}
              disabled={!hasVideoSource}
              className={`w-24 h-24 border-r border-white-pure/10 flex items-center justify-center transition-all ${hasVideoSource ? 'hover:bg-primary-500 group' : 'opacity-10 cursor-not-allowed'}`}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white-pure group-hover:text-black-pure transition-colors" />
              ) : (
                <Play className="w-8 h-8 text-white-pure group-hover:text-black-pure transition-colors" />
              )}
            </button>

            <div className="flex-grow p-8 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-3">
                <Monitor className={`w-4 h-4 ${hasVideoSource ? 'text-primary-500' : 'text-red-500'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${hasVideoSource ? 'text-primary-500' : 'text-red-500'}`}>
                  {labels.broadcastStatus}
                </span>
              </div>
              <h4 className="text-2xl md:text-4xl font-bold text-white-pure uppercase tracking-tight">
                {activeVideo?.title}
              </h4>
              {activeVideo?.description && (
                <p className="text-xs font-medium text-white-pure/40 uppercase mt-4 tracking-widest max-w-3xl">
                  {activeVideo.description}
                </p>
              )}
            </div>

            <div className="hidden md:flex flex-col items-center justify-center px-12 border-l border-white-pure/10 bg-white-pure/5">
              <Activity className="w-6 h-6 text-primary-500 mb-3 animate-pulse" />
              <span className="text-[10px] font-bold text-white-pure uppercase tracking-[0.4em]">
                {activeVideo?.duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {ctaLabel && ctaPath && (
        <div className="p-20 flex justify-center bg-white-pure border-b border-black-pure">
          <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
        </div>
      )}

      <div
        className={`fixed inset-0 z-[110] bg-black-pure/60 backdrop-blur-xl transition-opacity duration-700 ${isPlaylistOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsPlaylistOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 z-[120] h-full w-full sm:w-[450px] bg-white-pure border-l border-black-pure transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isPlaylistOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.5)]`}
      >
        <div className="p-8 border-b border-black-pure bg-white-pure flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-black-pure/40 uppercase tracking-[0.3em]">
              Media Gallery
            </span>
            <span className="text-lg font-bold text-black-pure uppercase tracking-tighter">
              {labels.channelPrefix} / {String(videos.length).padStart(2, '0')}
            </span>
          </div>
          <button
            onClick={() => setIsPlaylistOpen(false)}
            className="w-12 h-12 border border-black-pure flex items-center justify-center hover:bg-black-pure hover:text-white-pure transition-all duration-300 group"
          >
            <X className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {videos.map((video, idx) => {
            const isActive = activeVideo?.id === video.id
            return (
              <button
                key={video.id}
                onClick={() => handleVideoSelect(video)}
                className={`w-full flex items-stretch border-b border-black-pure last:border-b-0 transition-all duration-300 group relative overflow-hidden ${isActive ? 'bg-primary-500' : 'bg-white-pure hover:bg-black-pure hover:text-white-pure'}`}
              >
                <div
                  className={`w-16 flex items-center justify-center border-r border-black-pure shrink-0 transition-colors ${isActive ? 'bg-black-pure text-primary-500' : 'text-black-pure group-hover:text-white-pure'}`}
                >
                  <span className="text-sm font-bold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="p-8 flex-grow flex flex-col text-left">
                  <h4 className={`text-sm font-bold uppercase tracking-tight mb-2 ${isActive ? 'text-black-pure' : ''}`}>
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-6">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-black-pure/60' : 'text-black-pure/40 group-hover:text-white-pure/60'}`}>
                      {video.duration}
                    </span>
                    {isActive && <div className="h-[2px] flex-grow bg-black-pure animate-in slide-in-from-left duration-500" />}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="p-8 bg-white-pure border-t border-black-pure flex flex-col gap-6">
          <SectionButton
            label={labels.metaTransmission}
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setIsPlaylistOpen(false)}
          />
          <div className="flex h-1 gap-1">
            <div className="flex-1 bg-primary-500 transition-all duration-500 hover:flex-[2]" />
            <div className="flex-1 bg-black-pure transition-all duration-500 hover:flex-[2]" />
            <div className="flex-1 bg-zinc-200 transition-all duration-500 hover:flex-[2]" />
          </div>
        </div>
      </aside>
    </section>
  )
}

export default VideoSection