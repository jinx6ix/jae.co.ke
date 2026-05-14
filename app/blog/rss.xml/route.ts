import { blogPosts } from "@/lib/blog-data";

export const dynamic = "force-dynamic";

const BASE = "https://www.jaetravel.co.ke";

export async function GET() {
  const posts = Array.isArray(blogPosts) ? blogPosts : [];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/searches/fm/">
  <channel>
    <title>JaeTravel Expeditions Blog</title>
    <link>${BASE}/blog</link>
    <description>Expert safari travel tips, wildlife guides, and accessible travel advice from East Africa's leading safari operator.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE}/logo.png</url>
      <title>JaeTravel Expeditions</title>
      <link>${BASE}</link>
    </image>
    <category>Travel</category>
    <category>Safari</category>
    <category>Kenya</category>
    <category>Tanzania</category>
    <category>Africa</category>
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${post.author}</author>
      <category><![CDATA[${post.category}]]></category>
      <enclosure url="${BASE}${post.image}" type="image/jpeg" length="0"/>
      <media:content url="${BASE}${post.image}" type="image/jpeg" medium="image"/>
    </item>`).join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}