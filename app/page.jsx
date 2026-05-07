import Hero from '@/components/Hero'
import Achievements from '@/components/Achievements'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, breadcrumbSchema } from '@/lib/seo'

export const metadata = buildMetadata({
  path: '/',
  description:
    'Principal Software Engineer in Pune, India. 10+ years shipping scalable web apps with PHP, Node.js, Angular, MySQL, and AWS. Currently leading a team of 5 on a HIPAA-compliant telehealth product.',
})

export default function HomePage() {
  return (
    <>
      <JsonLd
        id="home-breadcrumb"
        data={breadcrumbSchema([{ name: 'Home', href: '/' }])}
      />
      <Hero />
      <Achievements />
    </>
  )
}
