"use client"
import { Activity, AlertTriangle, List, Monitor, Pause, Play, VideoOff, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import BlueprintsBackground from '../Backgrounds/BlueprintsBackground'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'

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
  title,
  subtitle,
  videos = [],
  labels,
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
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
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
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  const handleVideoSelect = (video: VideoItem) => {
    setActiveVideo(video)
    setIsPlaying(true)
    setIsPlaylistOpen(false)
  }

  return (
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      {background}

      <div className="w-full relative bg-black-pure">
        <div className="relative flex flex-col bg-black-pure min-h-[calc(100vh-200px)]">
          <div className="absolute top-4 left-6 z-20 flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full animate-pulse ${hasVideoSource ? 'bg-primary-500' : 'bg-red-500'}`} />
            <span className="text-[10px] font-mono font-black text-white-pure uppercase tracking-[0.2em]">
              {activeVideo?.id}
            </span>
          </div>

          {showPlaylist && (
            <button
              onClick={() => setIsPlaylistOpen(true)}
              className="absolute top-4 right-6 z-20 w-10 h-10 border border-white-pure/20 bg-black-pure/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 focus:bg-primary-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 active:scale-95 transition-all duration-300 group"
            >
              <List className="w-4 h-4 text-white-pure group-hover:text-black-pure group-focus:text-black-pure group-active:text-black-pure" />
            </button>
          )}

          <div className="relative w-full overflow-hidden flex items-center justify-center bg-zinc-900" style={{ height: 'calc(100vh - 200px)' }}>
            {hasVideoSource ? (
              <>
                <video
                  ref={videoRef}
                  src={activeVideo.url}
                  poster={activeVideo.poster}
                  className="w-full h-full object-contain"
                  onEnded={handleVideoEnd}
                  autoPlay={autoplay}
                  controls={false}
                  playsInline
                  loop={false}
                />
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center group z-10 focus:outline-none focus:ring-4 focus:ring-primary-500 active:scale-95"
                  >
                    <div className="w-20 h-20 border border-white-pure/20 flex items-center justify-center bg-black-pure/40 backdrop-blur-sm group-hover:bg-primary-500 group-focus:bg-primary-500 group-active:bg-primary-500 transition-all duration-300">
                      <Play className="w-8 h-8 text-white-pure fill-current group-hover:text-black-pure group-focus:text-black-pure group-active:text-black-pure" />
                    </div>
                  </button>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black-pure">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <VideoOff className="w-16 h-16 text-white-pure/10" />
                    <AlertTriangle className="absolute -bottom-2 -right-2 w-8 h-8 text-primary-500 animate-pulse" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-[10px] font-mono font-black text-primary-500 uppercase tracking-[0.4em] leading-none">
                      {labels.statusLost || labels.liveFeed}
                    </p>
                    <p className="text-[8px] font-mono font-black text-white-pure/20 uppercase tracking-widest">
                      {activeVideo?.id}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 md:p-12 border-t border-white-pure/10 flex flex-col md:flex-row items-stretch md:items-center gap-8">
            <button
              onClick={togglePlay}
              disabled={!hasVideoSource}
              className={`w-16 h-16 border border-white-pure/20 flex items-center justify-center transition-all focus:outline-none focus:ring-4 focus:ring-primary-500 active:scale-95 ${hasVideoSource ? 'hover:bg-primary-500 focus:bg-primary-500 group cursor-pointer' : 'opacity-20 cursor-not-allowed'}`}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white-pure group-hover:text-black-pure group-focus:text-black-pure" />
              ) : (
                <Play className="w-6 h-6 text-white-pure group-hover:text-black-pure group-focus:text-black-pure ml-1" />
              )}
            </button>

            <div className="flex-grow">
              <div className="flex items-center gap-4 mb-2">
                <Monitor className={`w-4 h-4 ${hasVideoSource ? 'text-primary-500' : 'text-red-500'}`} />
                <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${hasVideoSource ? 'text-primary-500' : 'text-red-500'}`}>
                  {labels.broadcastStatus}
                </span>
              </div>
              <h4 className="text-xl md:text-3xl font-mono font-black text-white-pure uppercase italic tracking-tighter leading-none">
                {activeVideo?.title}
              </h4>
              {activeVideo?.description && (
                <p className="text-[11px] font-mono font-black text-white-pure/40 uppercase mt-2 tracking-wide truncate max-w-2xl">
                  {activeVideo.description}
                </p>
              )}
            </div>

            <div className="hidden md:flex flex-col items-end shrink-0 opacity-40">
              <Activity className="w-8 h-8 text-white-pure mb-2" />
              <span className="text-[9px] font-mono font-black text-white-pure uppercase tracking-[0.3em]">
                {activeVideo?.duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {ctaLabel && ctaPath && (
        <div className="p-16 flex justify-center bg-white-pure border-b border-black-pure">
          <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
        </div>
      )}

      <SectionFooter variant={footerVariant} />

      <div
        className={`fixed inset-0 z-[110] bg-black-pure backdrop-blur-sm transition-opacity duration-300 ${isPlaylistOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsPlaylistOpen(false)}
      />

      <aside
        className={`fixed top-0 right-0 z-[120] h-full w-full sm:w-[400px] md:w-[480px] bg-white-pure shadow-2xl border-l-2 border-black-pure transition-transform duration-500 ease-out transform ${isPlaylistOpen ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col`}
      >
        <div className="p-6 border-b-2 border-black-pure bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-primary-500" />
            <span className="text-[10px] font-mono font-black text-black-pure uppercase tracking-widest">
              {labels.channelPrefix} ({String(videos.length).padStart(2, '0')})
            </span>
          </div>
          <button
            onClick={() => setIsPlaylistOpen(false)}
            className="w-10 h-10 border-2 border-black-pure bg-white-pure flex items-center justify-center hover:bg-primary-500 focus:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 active:scale-95 transition-all duration-300 group"
          >
            <X className="w-4 h-4 text-black-pure group-hover:text-black-pure group-focus:text-black-pure group-active:text-black-pure group-hover:rotate-90 group-focus:rotate-90 group-active:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {videos.map((video, idx) => {
            const isActive = activeVideo?.id === video.id
            return (
              <button
                key={video.id}
                onClick={() => handleVideoSelect(video)}
                className={`w-full flex items-stretch border-b border-black-pure last:border-b-0 transition-all duration-150 group focus:outline-none focus:ring-2 focus:ring-primary-500 ${isActive ? 'bg-primary-500' : 'bg-white-pure hover:bg-slate-50 focus:bg-slate-50 active:bg-slate-100'
                  }`}
              >
                <div
                  className={`w-20 flex items-center justify-center border-r border-black-pure shrink-0 transition-colors ${isActive ? 'bg-black-pure text-primary-500' : 'text-black-pure'
                    }`}
                >
                  <span className="text-base font-mono font-black italic">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="p-6 flex-grow flex flex-col text-left">
                  <h4
                    className={`text-sm font-mono font-black uppercase tracking-tight leading-tight mb-2 ${isActive ? 'text-black-pure' : 'text-black-pure'
                      }`}
                  >
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-[9px] font-mono font-black uppercase tracking-widest ${isActive ? 'text-black-pure' : 'text-black-pure'
                        }`}
                    >
                      {video.duration}
                    </span>
                    {isActive && <div className="h-px flex-grow bg-black-pure" />}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="p-6 bg-white-pure border-t-2 border-black-pure shrink-0">
          <SectionButton
            label="CLOSE"
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setIsPlaylistOpen(false)}
          />
        </div>

        <div className="h-1 w-full flex shrink-0">
          <div className="flex-1 bg-primary-500" />
          <div className="flex-1 bg-secondary-500" />
          <div className="flex-1 bg-black-pure" />
        </div>
      </aside>
    </section>
  )
}

export default VideoSection