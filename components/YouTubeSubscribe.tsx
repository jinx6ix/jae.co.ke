// components/YouTubeSubscribe.tsx
//
// Drop-in YouTube subscribe button. Loads Google's official
// `apis.google.com/js/platform.js` once and renders a styled subscribe
// chip the user can click to follow the channel without leaving the
// site (after the initial OAuth-style handoff).
//
// The channelId is read from NEXT_PUBLIC_YOUTUBE_CHANNEL_ID at build
// time. Setting `?sub_confirmation=1` on the link version is a one-tap
// subscribe dialog.

import Script from 'next/script'
import React from 'react'

interface Props {
  channelId?: string
  layout?: 'default' | 'full'
  className?: string
}

export const YouTubeSubscribe: React.FC<Props> = ({
  channelId,
  layout = 'default',
  className,
}) => {
  const id = channelId || process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID
  if (!id) {
    // Channel id missing — render a quiet link to the channel handle as a
    // graceful fallback. The handle is the user-facing URL form
    // (e.g. youtube.com/@jaetravel) which is what we'd put in `sameAs`.
    const handle = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL
    if (!handle) return null
    return (
      <a
        href={`${handle}?sub_confirmation=1`}
        target="_blank"
        rel="noreferrer"
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 16px',
          borderRadius: 9999,
          background: '#FF0000',
          color: '#fff',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        <span aria-hidden>▶</span> Subscribe on YouTube
      </a>
    )
  }

  return (
    <div className={className}>
      <Script src="https://apis.google.com/js/platform.js" strategy="lazyOnload" />
      <div
        className="g-ytsubscribe"
        data-channelid={id}
        data-layout={layout}
        data-count="default"
      />
    </div>
  )
}
