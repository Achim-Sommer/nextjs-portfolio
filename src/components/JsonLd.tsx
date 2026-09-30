import { jsonLd, personSchema, websiteSchema } from '@/lib/schema';

/** Person und Website für alle Seiten des Pages-Routers (Blog, Palworld, ...) */
const JsonLd = () => (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(personSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }} />
  </>
);

export default JsonLd;
