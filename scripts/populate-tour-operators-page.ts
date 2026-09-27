import { getPayload } from 'payload'
import config from '@payload-config'
import 'dotenv/config'

async function populateTourOperatorsPage() {
  const payload = await getPayload({ config })
  const slug = 'tour-operators-in-kenya'

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const pageData = {
    title: 'Tour Operators in Kenya',
    slug: slug,
    hero: {
      type: 'lowImpact' as const,
    },
    layout: [
      {
        blockType: 'content',
        columns: [
          {
            size: 'full' as const,
            richText: {
              root: {
                type: 'root',
                format: '',
                indent: 0,
                version: 1,
                direction: 'ltr',
                children: [
                  {
                    type: 'heading',
                    tag: 'h1',
                    format: '',
                    indent: 0,
                    version: 1,
                    direction: 'ltr',
                    children: [{ type: 'text', text: 'Tour Operators in Kenya: Expert Advice', format: 0, version: 1, mode: 'normal' }],
                  },
                  {
                    type: 'paragraph',
                    format: '',
                    indent: 0,
                    version: 1,
                    direction: 'ltr',
                    children: [
                      {
                        type: 'text',
                        text: 'Planning your dream safari in East Africa? Choosing the right partner is the most important decision you will make. Here is why JaeTravel Expeditions is your trusted local expert.',
                        format: 0,
                        version: 1,
                        mode: 'normal',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
      {
        blockType: 'content',
        columns: [
          {
            size: 'full' as const,
            richText: {
              root: {
                type: 'root',
                format: '',
                indent: 0,
                version: 1,
                direction: 'ltr',
                children: [
                    {
                        type: 'heading',
                        tag: 'h2',
                        format: '',
                        indent: 0,
                        version: 1,
                        direction: 'ltr',
                        children: [{ type: 'text', text: 'What Makes a Top-Tier Tour Operator in Kenya?', format: 0, version: 1, mode: 'normal' }],
                    },
                    {
                        type: 'paragraph',
                        format: '',
                        indent: 0,
                        version: 1,
                        direction: 'ltr',
                        children: [
                          {
                            type: 'text',
                            text: 'With so many safari companies in Kenya, navigating the options can feel overwhelming. A professional, licensed operator ensures not just a remarkable experience, but your safety and comfort throughout your journey. When comparing safari companies, look for:',
                            format: 0,
                            version: 1,
                            mode: 'normal',
                          },
                        ],
                      },
                      {
                          type: 'list',
                          listType: 'bullet',
                          tag: 'ul',
                          start: 1,
                          format: '',
                          indent: 0,
                          version: 1,
                          children: [
                            { type: 'listitem', format: '', indent: 0, version: 1, children: [{ type: 'text', text: 'Authentic Licensing: Full accreditation with the Kenya Association of Tour Operators (KATO) and Kenya Wildlife Service (KWS).', format: 0, version: 1, mode: 'normal' }] },
                            { type: 'listitem', format: '', indent: 0, version: 1, children: [{ type: 'text', text: 'Safety Infrastructure: Robust safety protocols, reliable vehicles, and 24/7 support.', format: 0, version: 1, mode: 'normal' }] },
                            { type: 'listitem', format: '', indent: 0, version: 1, children: [{ type: 'text', text: 'Expertise: Experienced, certified driver-guides who know the land, the wildlife, and local cultures.', format: 0, version: 1, mode: 'normal' }] },
                            { type: 'listitem', format: '', indent: 0, version: 1, children: [{ type: 'text', text: 'Accessibility: Modern fleets capable of catering to special needs, including hydraulic lift conversions for wheelchair travelers.', format: 0, version: 1, mode: 'normal' }] },
                        ],
                      },
                ],
              },
            },
          },
        ],
      },
      {
        blockType: 'faq',
        heading: 'Frequently Asked Questions',
        items: [
          {
            question: 'How far in advance should I book my safari?',
            answer: 'For the Great Migration season, we recommend 6–12 months in advance to secure the best lodges and campsites.',
          },
          {
            question: 'Can you accommodate travelers with disabilities?',
            answer: 'Yes, we specialize in accessible safari travel with vehicles equipped with hydraulic lifts and personalized care.',
          },
        ],
      },
    ],
    meta: {
      title: 'Tour Operators in Kenya | Safari & Accessible Travel Experts',
      description: 'Looking for the best licensed tour operators in Kenya? JaeTravel Expeditions offers expert-led safari tours, accessible travel solutions, and unforgettable adventures across East Africa.',
    },
    _status: 'published' as const,
  }

  if (existing.docs.length > 0) {
    console.log('Updating existing page...')
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: pageData,
      context: { disableRevalidate: true },
    })
    console.log('Page updated successfully!')
  } else {
    await payload.create({
      collection: 'pages',
      data: pageData,
      context: { disableRevalidate: true },
    })
    console.log('Page created successfully!')
  }
}

populateTourOperatorsPage()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
