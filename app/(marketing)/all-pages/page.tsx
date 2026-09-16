import { getAllPagesPath } from '@/lib/all-pages'
import Link from 'next/link'

export const metadata = {
  title: 'All Pages',
  description: 'A directory of all pages on the website.',
}

export default async function AllPages() {
  const pages = await getAllPagesPath()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Directory of All Pages</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => (
          <li key={page.path}>
            <Link href={page.path} className="text-blue-600 hover:text-blue-800 underline">
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
