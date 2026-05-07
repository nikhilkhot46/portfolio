import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, breadcrumbSchema } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'About',
  path: '/about',
  description:
    'About Nikhil Khot — Principal Software Engineer based in Pune. 10+ years across PHP, Node.js, Angular, MySQL, and AWS, currently leading a team of 5 at Spring Computing Technologies.',
})

export default function AboutPage() {
  return (
    <>
      <JsonLd
        id="about-breadcrumb"
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'About', href: '/about' },
        ])}
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-32 sm:px-8 lg:px-10">
        <Breadcrumbs items={[{ name: 'About', href: '/about' }]} />
      </div>
      <About />
      <Skills />
      <Experience />
    </>
  )
}
