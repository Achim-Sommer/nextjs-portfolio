import { GetStaticPaths, GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ParsedUrlQuery } from 'querystring';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getCompiledMDX } from '../../lib/mdx-cache';
import { Box, Container, Heading, Text, useColorModeValue, HStack, Icon, VStack, Divider } from '@chakra-ui/react';
import CodeBlock from '@/components/CodeBlock';
import BlogZapHosting from '@/components/BlogZapHosting';
import FloatingZapAd from '@/components/FloatingZapAd';
import { FiFileText, FiClock, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArticleShare } from '@/components/ui/article-share';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import Tip from '../../src/components/Tip';

interface FrontMatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime?: number;
  featured?: boolean;
}

interface BlogPostProps {
  frontMatter: FrontMatter;
  mdxSource: MDXRemoteSerializeResult;
  slug: string;
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const components = {
  pre: (props: any) => {
    const codeString = props.children?.props?.children;
    if (typeof codeString === 'string') {
      return <CodeBlock>{codeString}</CodeBlock>;
    }
    return <pre {...props} />;
  },
  Tip: Tip
};

export default function BlogPost({ frontMatter, mdxSource, slug }: BlogPostProps) {
  const textColor = useColorModeValue('gray.100', 'gray.100');
  const headingColor = useColorModeValue('blue.300', 'blue.300');
  const iconColor = useColorModeValue('blue.400', 'blue.400');
  const bgColor = useColorModeValue('gray.900', 'gray.900');
  const tabBg = useColorModeValue('gray.800', 'gray.800');
  const borderColor = useColorModeValue('gray.700', 'gray.700');
  const router = useRouter();
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}${router.asPath}`;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NextSeo
        title={frontMatter.title}
        description={frontMatter.description}
        canonical={currentUrl}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: frontMatter.date,
            modifiedTime: frontMatter.date,
            authors: ['Achim Sommer'],
            tags: frontMatter.tags,
            section: 'Technology'
          },
          url: currentUrl,
          title: frontMatter.title,
          description: frontMatter.description,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${encodeURIComponent(frontMatter.title)}`,
              width: 1200,
              height: 630,
              alt: frontMatter.title,
              type: 'image/png',
            },
          ],
          siteName: 'Achim Sommer Blog'
        }}
        additionalMetaTags={[
          {
            name: 'author',
            content: 'Achim Sommer'
          },
          {
            name: 'keywords',
            content: frontMatter.tags.join(', ')
          },
          {
            property: 'article:author',
            content: 'https://achimsommer.com'
          },
          {
            name: 'robots',
            content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          }
        ]}
      />
      <ArticleJsonLd
        type="BlogPosting"
        url={currentUrl}
        title={frontMatter.title}
        images={[
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${encodeURIComponent(frontMatter.title)}`
        ]}
        datePublished={frontMatter.date}
        dateModified={frontMatter.date}
        authorName={{
          "@type": "Person",
          name: "Achim Sommer",
          url: "https://achimsommer.com",
        }}
        description={frontMatter.description}
        isAccessibleForFree={true}
        publisherName="Achim Sommer"
        publisherLogo="https://achimsommer.com/logo.png"
        keywords={frontMatter.tags.join(", ")}
      />
      <Box 
        minH="100vh"
        bg={bgColor}
        backgroundImage="radial-gradient(circle at 1px 1px, rgba(66, 153, 225, 0.3) 1px, transparent 0)"
        backgroundSize="40px 40px"
        position="relative"
        pt="5rem"
      >
        <Container maxW="6xl">
          <Box 
            bg={tabBg} 
            borderRadius="md" 
            borderWidth="1px" 
            borderColor={borderColor}
            overflow="hidden"
            position="relative"
            zIndex={1}
          >
            {/* File tab */}
            <HStack 
              borderBottom="1px" 
              borderColor={borderColor} 
              bg="gray.900" 
              px={4} 
              py={2}
              spacing={2}
            >
              <Text color={textColor} fontSize="sm" fontFamily="mono">
                {slug}.md
              </Text>
            </HStack>

            {/* Content */}
            <Box p={8}>
              <VStack align="stretch" spacing={6}>
                {/* Header section */}
                <Box borderBottom="1px" borderColor={borderColor} pb={6}>
                  <Heading 
                    as="h1" 
                    size="2xl" 
                    color={headingColor}
                    fontFamily="mono"
                    mb={4}
                  >
                    {frontMatter.title}
                  </Heading>
                  
                  <Text 
                    color={textColor} 
                    fontSize="lg" 
                    mb={4}
                    pl={4}
                    borderLeft="2px"
                    borderColor="blue.500"
                  >
                    {frontMatter.description}
                  </Text>

                  <HStack spacing={6} color={textColor} fontSize="sm" fontFamily="mono">
                    <HStack>
                      <Icon as={FiCalendar} color={iconColor} />
                      <Text>
                        {new Date(frontMatter.date).toLocaleDateString('de-DE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Text>
                    </HStack>
                    <HStack>
                      <Icon as={FiClock} color={iconColor} />
                      <Text>{frontMatter.readingTime} min read</Text>
                    </HStack>
                  </HStack>

                  {/* Top Share Button */}
                  <Box py={6}>
                    <ArticleShare url={currentUrl} title={frontMatter.title} variant="top" />
                  </Box>
                </Box>

                {/* Main content */}
                <Box 
                  className="prose prose-dark max-w-none"
                  sx={{
                    'h1, h2, h3, h4, h5, h6': {
                      color: 'blue.200',
                      fontFamily: 'mono',
                      mt: 6,
                      mb: 4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      '&::before': {
                        content: '""',
                        display: 'block',
                        width: '3px',
                        height: '1em',
                        backgroundColor: 'blue.500',
                        borderRadius: 'sm',
                      }
                    },
                    p: {
                      color: 'gray.50',
                      mb: 4,
                      lineHeight: 1.8,
                      fontSize: '1.1rem'
                    },
                    strong: {
                      color: 'blue.100',
                      fontWeight: 'bold'
                    },
                    a: {
                      color: 'blue.200',
                      textDecoration: 'none',
                      borderBottom: '1px dashed',
                      borderColor: 'blue.500',
                      transition: 'all 0.2s',
                      _hover: {
                        color: 'blue.100',
                        borderStyle: 'solid'
                      }
                    },
                    'ul, ol': {
                      color: 'gray.50',
                      pl: 4,
                      mb: 4,
                      fontSize: '1.1rem'
                    },
                    li: {
                      mb: 2,
                      pl: 2,
                      '&::marker': {
                        color: 'blue.300'
                      }
                    },
                    pre: {
                      position: 'relative',
                      bg: 'gray.800',
                      color: 'gray.50',
                      p: 4,
                      borderRadius: 'md',
                      overflowX: 'auto',
                      mb: 4,
                      border: '1px solid',
                      borderColor: 'gray.700',
                      boxShadow: 'lg'
                    },
                    code: {
                      bg: 'gray.800',
                      color: 'blue.200',
                      p: 1,
                      borderRadius: 'sm',
                      fontSize: '0.9em',
                      fontFamily: 'mono'
                    },
                    blockquote: {
                      borderLeftWidth: '4px',
                      borderLeftColor: 'blue.400',
                      pl: 4,
                      ml: 0,
                      color: 'blue.100',
                      fontStyle: 'italic',
                      bg: 'whiteAlpha.50',
                      py: 2,
                      pr: 2,
                      borderRadius: '0 md md 0'
                    },
                    hr: {
                      borderColor: 'gray.600',
                      my: 6
                    },
                    table: {
                      color: 'gray.50',
                      width: 'full',
                      mb: 4,
                      borderCollapse: 'separate',
                      borderSpacing: 0,
                      border: '1px solid',
                      borderColor: 'gray.700',
                      borderRadius: 'md',
                      overflow: 'hidden',
                      fontSize: '1.1rem'
                    },
                    'th, td': {
                      borderColor: 'gray.700',
                      p: 2,
                      borderBottom: '1px solid',
                      borderRight: '1px solid'
                    },
                    th: {
                      bg: 'gray.800',
                      fontWeight: 'bold',
                      color: 'blue.200',
                      textAlign: 'left'
                    },
                    img: {
                      maxW: 'full',
                      h: 'auto',
                      mb: 4,
                      borderRadius: 'md',
                      border: '1px solid',
                      borderColor: 'gray.700',
                      boxShadow: 'lg'
                    }
                  }}
                >
                  <MDXRemote {...mdxSource} components={components} />
                </Box>

                {/* Bottom Share Section */}
                <Box py={8}>
                  <ArticleShare url={currentUrl} title={frontMatter.title} variant="bottom" />
                </Box>

                {/* Zap-Hosting Werbung */}
                <BlogZapHosting />
              </VStack>
            </Box>

            {/* Status bar */}
            <HStack 
              borderTop="1px" 
              borderColor={borderColor} 
              bg="gray.900" 
              px={4} 
              py={1}
              spacing={4}
              fontSize="xs"
              color={textColor}
              fontFamily="mono"
            >
              <Text>markdown</Text>
              <Text>UTF-8</Text>
              <Text>Ln {mdxSource.compiledSource.split('\n').length}</Text>
            </HStack>
          </Box>
        </Container>
      </Box>
      <FloatingZapAd />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/blog'));
  const paths = files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      params: {
        slug: filename.replace('.md', '')
      }
    }));

  return {
    paths,
    fallback: true // Enable ISR
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps, IParams> = async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true
    };
  }

  try {
    const { slug } = params;
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontMatter, content } = matter(fileContents);
    
    const mdxSource = await getCompiledMDX(content);

    return {
      props: {
        frontMatter: {
          ...frontMatter,
          readingTime: Math.ceil(content.split(' ').length / 200)
        } as FrontMatter,
        mdxSource,
        slug
      },
      revalidate: 3600 // Revalidiere jede Stunde
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
};
