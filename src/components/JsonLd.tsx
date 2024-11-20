import { WithContext } from 'schema-dts';

// Definiere erweiterte Typen
interface ExtendedPerson {
  "@type": "Person";
  name: string;
  url: string;
  jobTitle: string;
  description: string;
  image: string;
  sameAs: string[];
  alumniOf: {
    "@type": "CollegeOrUniversity";
    name: string;
    alternateName: string;
    department: {
      "@type": "Organization";
      name: string;
    };
    location: {
      "@type": "Place";
      address: {
        "@type": "PostalAddress";
        streetAddress: string;
        addressLocality: string;
        postalCode: string;
        addressCountry: string;
      };
    };
  };
  knowsAbout: string[];
  workLocation: {
    "@type": "Place";
    address: {
      "@type": "PostalAddress";
      addressLocality: string;
      addressCountry: string;
    };
  };
  hasCredential?: {
    "@type": "EducationalOccupationalCredential";
    name: string;
    educationalLevel: string;
  }[];
}

interface ExtendedWebsite {
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
  };
  inLanguage: string;
  copyrightYear: number;
  creator: {
    "@type": "Person";
    name: string;
  };
  about: {
    "@type": "Thing";
    name: string;
    description: string;
  };
}

const JsonLd = () => {
  const personSchema: WithContext<ExtendedPerson> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Achim Sommer",
    url: "https://achimsommer.com",
    jobTitle: "Full Stack Developer",
    description: "Dualer Student, Full Stack Developer und YouTuber",
    image: "https://achimsommer.com/api/og",
    sameAs: [
      "https://github.com/Achim-Sommer",
      "https://www.facebook.com/achim.sommer1",
      "https://www.youtube.com/@achimsommer",
      "https://twitch.tv/achim1337",
      "https://www.instagram.com/achim.sommer/",
      "https://www.linkedin.com/in/achim-sommer-b898a2185/"
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
      "Web Development",
      "FiveM Development",
      "Lua Programming",
      "Database Design",
      "System Architecture"
    ],
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Aachen",
        addressCountry: "DE"
      }
    },
    hasCredential: [{
      "@type": "EducationalOccupationalCredential",
      name: "Wirtschaftsinformatik (B.Sc.)",
      educationalLevel: "Bachelor of Science"
    }]
  };

  const websiteSchema: WithContext<ExtendedWebsite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Achim Sommer Portfolio",
    url: "https://achimsommer.com",
    description: "Portfolio und persönliche Website von Achim Sommer - Full Stack Developer und FiveM Entwickler",
    author: {
      "@type": "Person",
      name: "Achim Sommer"
    },
    inLanguage: "de-DE",
    copyrightYear: new Date().getFullYear(),
    creator: {
      "@type": "Person",
      name: "Achim Sommer"
    },
    about: {
      "@type": "Thing",
      name: "Portfolio Website",
      description: "Eine moderne Portfolio-Website, die meine Fähigkeiten und Projekte als Full Stack Developer präsentiert"
    }
  };

  const organizationSchema: WithContext<{
    "@type": "Organization";
    name: string;
    url: string;
    logo: string;
    description: string;
    founder: {
      "@type": "Person";
      name: string;
    };
    address: {
      "@type": "PostalAddress";
      addressLocality: string;
      addressCountry: string;
    };
    sameAs: string[];
  }> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Achim Sommer Development",
    url: "https://achimsommer.com",
    logo: "https://achimsommer.com/api/og",
    description: "Full Stack Development und FiveM Entwicklung",
    founder: {
      "@type": "Person",
      name: "Achim Sommer"
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Aachen",
      addressCountry: "DE"
    },
    sameAs: [
      "https://github.com/Achim-Sommer",
      "https://www.linkedin.com/in/achim-sommer-b898a2185/"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
};

export default JsonLd;
