"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { GalleryItem } from "@/lib/gallery-data"

interface MediaModalProps {
  item: GalleryItem | null
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  hasNext: boolean
  hasPrevious: boolean
}

export function MediaModal({
  item,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: MediaModalProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const toggleVideoPlayback = async () => {
    if (!videoRef.current) return

    try {
      if (isVideoPlaying) {
        videoRef.current.pause()
        setIsVideoPlaying(false)
      } else {
        await videoRef.current.play()
        setIsVideoPlaying(true)
      }
    } catch (err) {
      console.error("Video play failed:", err)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    const newMute = !isMuted
    videoRef.current.muted = newMute
    setIsMuted(newMute)
  }

  if (!isOpen || !item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Close */}
      <button
        title="Close"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Prev / Next */}
      {hasPrevious && (
        <button
          title="Previous"
          onClick={onPrevious}
          className="absolute left-4 rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      {hasNext && (
        <button
          title="Next"
          onClick={onNext}
          className="absolute right-4 rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Main Media */}
      <div className="relative max-h-[90vh] max-w-[90vw]">
        {item.type === "image" ? (
          <Image
            src={item.url}
            alt={item.alt}
            width={1200}
            height={800}
            className="max-h-[90vh] w-auto max-w-[90vw] object-contain rounded-lg"
            priority
          />
        ) : (
          <div className="relative group">
            <video
              ref={videoRef}
              src={item.url}
              poster={item.thumbnailUrl}
              className="max-h-[90vh] max-w-[90vw] rounded-lg bg-black"
              playsInline
              preload="auto"
              muted={isMuted}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              controls={false} // custom controls
              autoPlay
            />

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 rounded-full bg-black/70 p-3 backdrop-blur-sm">
              <button
                onClick={toggleVideoPlayback}
                className="rounded-full p-2 text-white hover:bg-white/20"
              >
                {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>

              <button
                onClick={toggleMute}
                className="rounded-full p-2 text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Caption / Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
        <h3 className="text-lg font-bold">{item.title}</h3>
        {item.description && <p className="text-sm opacity-90">{item.description}</p>}
      </div>
    </div>
  )
}