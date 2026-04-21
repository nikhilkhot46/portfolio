import Contact from '@/components/Contact'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import { buildMetadata, breadcrumbSchema } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Contact',
  path: '/contact',
  description:
    'Get in touch with Nikhil Khot. Email, LinkedIn, GitHub, WhatsApp. Open to principal and staff engineering roles — remote, Pune, or hybrid.',
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        id="contact-breadcrumb"
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact' },
        ])}
      />
      <div className="relative mx-auto max-w-7xl px-6 pt-32 sm:px-8 lg:px-10">
        <Breadcrumbs items={[{ name: 'Contact', href: '/contact' }]} />
      </div>
      <Contact />
    </>
  )
}
