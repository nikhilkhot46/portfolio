import Projects from '@/components/Projects'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, breadcrumbSchema, absoluteUrl } from '@/lib/seo'
import { projects } from '@/data/resume'

export const metadata = buildMetadata({
  title: 'Projects',
  path: '/projects',
  description:
    'Selected projects by Nikhil Khot — telehealth, healthtech diagnostics, ed-tech, vehicle rentals, and hospital management systems. Built with Angular, PHP, Node.js, MySQL, and AWS.',
})

export default function ProjectsPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: p.name,
        description: p.description,
        url: absoluteUrl(`/projects#${p.slug}`),
      },
    })),
  }

  return (
    <>
      <JsonLd
        id="projects-breadcrumb"
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Projects', href: '/projects' },
        ])}
      />
      <JsonLd id="projects-list" data={itemListSchema} />
      <div className="relative mx-auto max-w-7xl px-6 pt-32 sm:px-8 lg:px-10">
        <Breadcrumbs items={[{ name: 'Projects', href: '/projects' }]} />
      </div>
      <Projects />
    </>
  )
}
