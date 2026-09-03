import React, { Fragment } from 'react'

import type { Page } from '@cms/payload-types'

import { ArchiveBlock } from '@cms/blocks/ArchiveBlock/Component'
import { BlogArchiveBlock } from '@cms/blocks/BlogArchive/Component'
import { CallToActionBlock } from '@cms/blocks/CallToAction/Component'
import { ContentBlock } from '@cms/blocks/Content/Component'
import { DestinationGridBlock } from '@cms/blocks/DestinationGrid/Component'
import { FaqBlock } from '@cms/blocks/Faq/Component'
import { FormBlock } from '@cms/blocks/Form/Component'
import { MediaBlock } from '@cms/blocks/MediaBlock/Component'
import { StatisticsBlock } from '@cms/blocks/Statistics/Component'
import { TestimonialsBlock } from '@cms/blocks/Testimonials/Component'
import { TourGridBlock } from '@cms/blocks/TourGrid/Component'
import { VideoBlockComponent } from '@cms/blocks/VideoBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  blogArchive: BlogArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  destinationGrid: DestinationGridBlock,
  faq: FaqBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  statistics: StatisticsBlock,
  testimonials: TestimonialsBlock,
  tourGrid: TourGridBlock,
  videoBlock: VideoBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
