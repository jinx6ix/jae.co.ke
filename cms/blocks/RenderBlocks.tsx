import React, { Fragment } from 'react'
import type { Page } from '@cms/payload-types'

export async function RenderBlocks({ blocks }: { blocks: Page['layout'][0][] }) {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  const renderedBlocks = await Promise.all(
    blocks.map(async (block, index) => {
      if (!block) return null
      const { blockType } = block
      let BlockComponent: any = null

      try {
        switch (blockType) {
          case 'archive':
            BlockComponent = (await import('@cms/blocks/ArchiveBlock/Component')).ArchiveBlock
            break
          case 'blogArchive':
            BlockComponent = (await import('@cms/blocks/BlogArchive/Component')).BlogArchiveBlock
            break
          case 'cta':
            BlockComponent = (await import('@cms/blocks/CallToAction/Component')).CallToActionBlock
            break
          case 'content':
            BlockComponent = (await import('@cms/blocks/Content/Component')).ContentBlock
            break
          case 'destinationGrid':
            BlockComponent = (await import('@cms/blocks/DestinationGrid/Component')).DestinationGridBlock
            break
          case 'faq':
            BlockComponent = (await import('@cms/blocks/Faq/Component')).FaqBlock
            break
          case 'formBlock':
            BlockComponent = (await import('@cms/blocks/Form/Component')).FormBlock
            break
          case 'mediaBlock':
            BlockComponent = (await import('@cms/blocks/MediaBlock/Component')).MediaBlock
            break
          case 'statistics':
            BlockComponent = (await import('@cms/blocks/Statistics/Component')).StatisticsBlock
            break
          case 'testimonials':
            BlockComponent = (await import('@cms/blocks/Testimonials/Component')).TestimonialsBlock
            break
          case 'tourGrid':
            BlockComponent = (await import('@cms/blocks/TourGrid/Component')).TourGridBlock
            break
          case 'videoBlock':
            BlockComponent = (await import('@cms/blocks/VideoBlock/Component')).VideoBlockComponent
            break
          default:
            return null
        }
      } catch (e) {
        console.error(`Failed to load block ${blockType}:`, e)
        return null
      }

      if (!BlockComponent) return null

      return (
        <div className="my-16" key={index}>
          {/* @ts-expect-error */}
          <BlockComponent {...block} disableInnerContainer />
        </div>
      )
    }),
  )

  return <Fragment>{renderedBlocks}</Fragment>
}
