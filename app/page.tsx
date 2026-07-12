import ClinicHome from './components/ClinicHome';

/* ------------------------------------------------------------------ */
/* SEO metadata — edit the placeholder URL, phone & address below      */
/* ------------------------------------------------------------------ */
export const metadata = {
  metadataBase: new URL('https://www.samarthclinicdehri.com'),
  title: 'Best Speech & Occupational Therapy Clinic in Dehri-on-Sone, Bihar | Samarth Clinic',
  description:
    'Samarth Clinic, Dehri-on-Sone offers expert speech therapy and occupational therapy for speech delay, stammering, autism, sensory issues, handwriting and more. Book a free consultation today.',
  keywords: [
    'speech therapy Dehri-on-Sone', 'occupational therapy Dehri', 'speech therapist Dehri Bihar',
    'stammering treatment Dehri', 'child speech delay Rohtas', 'autism therapy Dehri-on-Sone',
    'best speech therapy clinic Bihar', 'occupational therapist Sasaram', 'Samarth Clinic Dehri',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Samarth Clinic — Speech & Occupational Therapy, Dehri-on-Sone',
    description: 'Expert speech and occupational therapy for children and adults in Dehri-on-Sone, Rohtas, Bihar.',
    url: '/',
    siteName: 'Samarth Clinic',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Samarth Clinic — Speech & Occupational Therapy, Dehri-on-Sone' }],
    locale: 'en_IN',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export const viewport = { width: 'device-width', initialScale: 1 };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: 'Samarth Clinic - Speech & Occupational Therapy Center',
  url: 'https://www.samarthclinicdehri.com/',
  telephone: '+91-90000-00000',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Near Civil Lines',
    addressLocality: 'Dehri-on-Sone',
    addressRegion: 'Bihar',
    postalCode: '821307',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 24.9086, longitude: 84.1917 },
  medicalSpecialty: ['Speech-Language Pathology', 'Occupational Therapy', 'Physiotherapy'],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '19:00',
  },
  physician: [
    { '@type': 'Physician', name: 'Akansha Singh', jobTitle: 'Speech-Language & Occupational Therapist' },
    { '@type': 'Physician', name: 'Dr. Prem Prakash', jobTitle: 'Physiotherapist (BPT), Clinic Head' },
  ],
  areaServed: ['Dehri-on-Sone', 'Rohtas', 'Sasaram', 'Bihar'],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ClinicHome />
    </>
  );
}