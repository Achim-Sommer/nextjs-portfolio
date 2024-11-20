import { Person, WithContext } from 'schema-dts';

const JsonLd = () => {
  const schema: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Achim Sommer",
    url: "https://achimsommer.com",
    jobTitle: "Full Stack Developer",
    description: "Dualer Student, Full Stack Developer und YouTuber",
    image: "https://achimsommer.com/api/og",
    sameAs: [
      "https://github.com/AchimSommer",
      "https://www.linkedin.com/in/achim-sommer",
      "https://www.youtube.com/@achimsommer"
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "FOM Hochschule für Oekonomie und Management",
      alternateName: "FOM",
      department: {
        "@type": "Organization",
        name: "Fachbereich Wirtschaftsinformatik"
      },
      location: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Agrippinawerft 4",
          addressLocality: "Köln",
          postalCode: "50678",
          addressCountry: "DE"
        }
      }
    },
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Full Stack Development",
      "Web Development"
    ]
  };

  // Füge zusätzliche Bildungsinformationen hinzu, die nicht durch die TypeScript-Definitionen eingeschränkt sind
  const fullSchema = {
    ...schema,
    education: {
      "@type": "EducationalOccupationalProgram",
      name: "Wirtschaftsinformatik (B.Sc.)",
      programType: "Bachelor's Degree",
      educationalLevel: "Bachelor of Science",
      inLanguage: "de",
      provider: {
        "@type": "CollegeOrUniversity",
        name: "FOM Hochschule für Oekonomie und Management"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(fullSchema) }}
    />
  );
};

export default JsonLd;
