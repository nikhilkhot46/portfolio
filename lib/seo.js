export const SITE = {
  name: 'Nikhil Khot',
  title: 'Nikhil Khot — Full Stack Developer',
  description:
    'Full Stack Developer in India with 10+ years building scalable web applications using PHP, Node.js, Angular, React, MySQL, and AWS.',
  url: 'https://nikhilkhot.com',
  locale: 'en_US',
  twitter: '@nikhilkhot46',
  ogImage: '/og-image.png',
  author: {
    name: 'Nikhil Vijay Khot',
    email: 'nikhilkhot46@gmail.com',
    twitter: '@nikhilkhot46',
  },
}

export function absoluteUrl(path = '/') {
  return new URL(path, SITE.url).toString()
}

const PERSON_ID = `${SITE.url}/#person`
const WEBSITE_ID = `${SITE.url}/#website`

export function buildMetadata({
  title,
  description = SITE.description,
  path = '/',
  image = SITE.ogImage,
  type = 'website',
  publishedTime,
  modifiedTime,
  keywords,
} = {}) {
  const url = absoluteUrl(path)
  const fullTitle = title ? `${title} — ${SITE.name}` : SITE.title
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image)

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: SITE.locale,
      url,
      siteName: SITE.title,
      title: fullTitle,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: fullTitle }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: SITE.twitter,
      site: SITE.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  }
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Nikhil Vijay Khot',
    alternateName: 'Nikhil Khot',
    jobTitle: 'Full Stack Developer',
    description:
      'Full Stack Developer in India with 10+ years building scalable web applications using PHP, Node.js, Angular, React, MySQL, and AWS. Specializes in HIPAA-compliant telehealth, ed-tech, and healthtech platforms.',
    url: SITE.url,
    image: absoluteUrl('/og-image.png'),
    email: 'mailto:nikhilkhot46@gmail.com',
    telephone: '+91-9890422071',
    gender: 'Male',
    nationality: { '@type': 'Country', name: 'India' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411001',
      addressCountry: 'IN',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Spring Computing Technologies Pvt. Ltd.',
      url: 'https://springct.com',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Shivaji University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kolhapur',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Full Stack Developer',
      occupationLocation: { '@type': 'City', name: 'Pune, India' },
      skills:
        'PHP, Node.js, Angular, React, MySQL, AWS, WebRTC, HIPAA Compliance, System Design, API Performance',
      estimatedSalary: {
        '@type': 'MonetaryAmountDistribution',
        name: 'base',
        currency: 'INR',
        duration: 'P1Y',
        percentile10: 1800000,
        percentile50: 2800000,
        percentile90: 4500000,
      },
    },
    knowsAbout: [
      'PHP',
      'Node.js',
      'Angular',
      'React',
      'MySQL',
      'AWS',
      'System Design',
      'Team Leadership',
      'HIPAA Compliance',
      'WebRTC',
      'REST APIs',
      'API Performance',
      'CI/CD',
    ],
    knowsLanguage: [
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Hindi', alternateName: 'hi' },
      { '@type': 'Language', name: 'Marathi', alternateName: 'mr' },
    ],
    sameAs: [
      'https://linkedin.com/in/nikhilkhot46',
      'https://github.com/nikhilkhot46',
      'https://twitter.com/nikhilkhot46',
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.title,
    alternateName: 'Nikhil Khot Portfolio',
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'en-US',
    publisher: { '@id': PERSON_ID },
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: { '@id': PERSON_ID },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

function countWordsInContent(content) {
  if (!Array.isArray(content)) return 0
  const wc = (s) =>
    typeof s === 'string' ? s.trim().split(/\s+/).filter(Boolean).length : 0
  let total = 0
  for (const block of content) {
    if (!block || typeof block !== 'object') continue
    total += wc(block.text)
    if (Array.isArray(block.items)) {
      for (const item of block.items) {
        if (typeof item === 'string') total += wc(item)
        else if (item && typeof item === 'object') {
          total += wc(item.q) + wc(item.a)
        }
      }
    }
  }
  return total
}

export function blogPostingSchema(post) {
  const url = absoluteUrl(`/blog/${post.slug}`)
  const words = countWordsInContent(post.content)
  const minutes = Math.max(1, Math.round(words / 225))
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    alternativeHeadline: post.excerpt,
    description: post.excerpt,
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl(post.image || SITE.ogImage),
      width: 1200,
      height: 630,
    },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    inLanguage: 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    wordCount: words,
    timeRequired: `PT${minutes}M`,
    articleSection: post.category || 'Engineering',
    keywords: post.tags?.join(', '),
    about: (post.tags || []).slice(0, 5).map((t) => ({
      '@type': 'Thing',
      name: t,
    })),
  }
}

export function faqPageSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  }
}
