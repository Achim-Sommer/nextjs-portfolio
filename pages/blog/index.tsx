import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Box, Container, Heading, Text, useColorModeValue, SimpleGrid, VStack, HStack, Icon, Flex, Tag } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiTag, FiFileText, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import BlogSearch from '@/components/BlogSearch';
import BlogFilter from '@/components/BlogFilter';
import { BackgroundGrid } from "@/components/ui/background-grid";
import { BlogGrid } from "@/components/ui/blog-grid";
import { BlogCard as NewBlogCard } from "@/components/ui/blog-card";
import "@/styles/grid-pattern.css";
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { BlogPost } from '@/types/blog';
import { Meteors } from "@/components/ui/meteors";

const MotionBox = motion(Box);

interface Props {
  posts: BlogPost[];
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} passHref>
      <MotionBox
        as="article"
        whileHover={{ 
          y: -4,
          boxShadow: '0 4px 20px rgba(66, 153, 225, 0.15)'
        }}
        transition={{ duration: 0.2 }}
        bg="gray.800"
        borderRadius="xl"
        overflow="hidden"
        position="relative"
        role="group"
        h="full"
      >
        {/* Card Content */}
        <Box p={6} h="full">
          <VStack align="stretch" spacing={4} h="full">
            {/* Tags */}
            <Flex gap={2} flexWrap="wrap">
              {post.frontmatter.tags?.map((tag) => (
                <Tag
                  key={tag}
                  size="sm"
                  bg="blue.900"
                  color="blue.200"
                  fontFamily="mono"
                  fontSize="xs"
                  borderRadius="md"
                >
                  {tag}
                </Tag>
              ))}
            </Flex>

            {/* Title */}
            <Heading 
              as="h2" 
              size="md" 
              color="white"
              fontWeight="bold"
              noOfLines={2}
              _groupHover={{ color: 'blue.400' }}
            >
              {post.frontmatter.title}
            </Heading>

            {/* Description */}
            <Text 
              color="gray.400" 
              fontSize="sm" 
              noOfLines={3}
              flex="1"
            >
              {post.frontmatter.description}
            </Text>

            {/* Meta Info */}
            <HStack 
              spacing={4} 
              fontSize="sm" 
              color="gray.500"
              pt={4}
              borderTop="1px solid"
              borderColor="whiteAlpha.100"
            >
              <HStack>
                <Icon as={FiCalendar} color="blue.400" />
                <Text>
                  {new Date(post.frontmatter.date).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </Text>
              </HStack>
              <HStack>
                <Icon as={FiClock} color="blue.400" />
                <Text>{post.frontmatter.readingTime} min</Text>
              </HStack>
            </HStack>
          </VStack>
        </Box>

        {/* Hover Gradient */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          h="6px"
          bg="blue.500"
          transform="scaleX(0)"
          transformOrigin="left"
          transition="transform 0.3s ease-out"
          _groupHover={{
            transform: "scaleX(1)"
          }}
        />
      </MotionBox>
    </Link>
  );
}

export default function Blog({ posts }: Props) {
  const router = useRouter();
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const bgColor = useColorModeValue('gray.900', 'gray.900');

  // Filtere und sortiere Posts
  const filteredAndSortedPosts = useMemo(() => {
    return posts
      .filter(post => {
        const matchesSearch = 
          post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSearch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'date-desc':
            return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
          case 'date-asc':
            return new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime();
          case 'title':
            return a.frontmatter.title.localeCompare(b.frontmatter.title);
          case 'reading-time':
            return b.frontmatter.readingTime - a.frontmatter.readingTime;
          default:
            return 0;
        }
      });
  }, [posts, searchQuery, sortBy]);

  const featuredPost = useMemo(() => {
    return posts.find(post => post.frontmatter.featured);
  }, [posts]);

  return (
    <>
      <NextSeo
        title="Blog - Tutorials & Guides zu Web Development und Server-Hosting"
        description="Technische Tutorials, Guides und Best Practices zu Web Development, Server-Hosting, und Software Engineering von Full Stack Developer Achim Sommer."
        canonical={currentUrl}
        openGraph={{
          type: 'website',
          url: currentUrl,
          title: 'Blog - Tutorials & Guides zu Web Development und Server-Hosting',
          description: 'Technische Tutorials, Guides und Best Practices zu Web Development, Server-Hosting, und Software Engineering von Full Stack Developer Achim Sommer.',
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${encodeURIComponent('Blog - Tutorials & Guides')}`,
              width: 1200,
              height: 630,
              alt: 'Achim Sommer Blog',
              type: 'image/png',
            },
          ],
          siteName: 'Achim Sommer Blog'
        }}
        twitter={{
          handle: '@achimsommer',
          site: '@achimsommer',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'author',
            content: 'Achim Sommer'
          },
          {
            name: 'keywords',
            content: 'Web Development, Server-Hosting, Tutorials, Programming, Software Engineering, Full Stack Development'
          },
          {
            name: 'robots',
            content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          }
        ]}
      />
      <Box 
        minH="100vh"
        bg="gray.900"
        position="relative"
        overflow="hidden"
      >
        <BackgroundGrid />
        
        <Box position="relative" zIndex={1}>
          {/* Hero Section */}
          <Box
            position="relative"
            mb={16}
            px={8}
            pt={20}
          >
            <Box
              maxW="7xl"
              mx="auto"
              pb={10}
              borderBottom="2px solid"
              borderColor="whiteAlpha.100"
            >
              <VStack spacing={8} align="flex-start">
                {/* Header */}
                <VStack spacing={6} align="flex-start">
                  <Heading
                    as="h1"
                    fontSize={{ base: "4xl", md: "5xl" }}
                    fontWeight="bold"
                    color="blue.400"
                    fontFamily="mono"
                    letterSpacing="tight"
                  >
                    Blog & Tutorials
                  </Heading>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    color="gray.400"
                    maxW="3xl"
                    lineHeight="tall"
                  >
                    Entdecke Artikel über Web Development, DevOps und Software Engineering
                  </Text>
                </VStack>

                {/* Blog Stats */}
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} w="full" maxW="3xl">
                  <VStack align="flex-start">
                    <Text color="blue.400" fontSize="2xl" fontWeight="bold" fontFamily="mono">
                      {posts.length}
                    </Text>
                    <Text color="gray.500" fontSize="sm">Artikel</Text>
                  </VStack>
                  <VStack align="flex-start">
                    <Text color="blue.400" fontSize="2xl" fontWeight="bold" fontFamily="mono">
                      {Array.from(new Set(posts.flatMap(post => post.frontmatter.tags || []))).length}
                    </Text>
                    <Text color="gray.500" fontSize="sm">Kategorien</Text>
                  </VStack>
                  <VStack align="flex-start">
                    <Text color="blue.400" fontSize="2xl" fontWeight="bold" fontFamily="mono">
                      {posts.reduce((acc, post) => acc + (post.frontmatter.readingTime || 0), 0)}
                    </Text>
                    <Text color="gray.500" fontSize="sm">Minuten Lesedauer</Text>
                  </VStack>
                  <VStack align="flex-start">
                    <Text color="blue.400" fontSize="2xl" fontWeight="bold" fontFamily="mono">
                      {new Date().getFullYear()}
                    </Text>
                    <Text color="gray.500" fontSize="sm">Aktiv seit</Text>
                  </VStack>
                </SimpleGrid>

                {/* Search & Filter */}
                <Box w="full" maxW="3xl">
                  <VStack spacing={6} align="stretch" w="full">
                    <BlogSearch 
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                    />
                    <BlogFilter
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                    />
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </Box>

          {/* Main Content */}
          <Box px={8}>
            <Box maxW="7xl" mx="auto">
              {/* Featured Post */}
              {featuredPost && (
                <Box mb={16}>
                  <Link href={`/blog/${featuredPost.slug}`} passHref>
                    <MotionBox
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      bg="gray.800"
                      borderRadius="xl"
                      overflow="hidden"
                      position="relative"
                      role="group"
                    >
                      <Box p={8}>
                        <VStack spacing={6} align="flex-start">
                          <HStack>
                            <Tag size="md" colorScheme="blue" fontFamily="mono">Featured Post</Tag>
                            {featuredPost.frontmatter.tags?.slice(0, 2).map((tag) => (
                              <Tag
                                key={tag}
                                size="md"
                                bg="blue.900"
                                color="blue.200"
                                fontFamily="mono"
                              >
                                {tag}
                              </Tag>
                            ))}
                          </HStack>

                          <Heading 
                            size="2xl" 
                            color="white"
                            _groupHover={{ color: 'blue.400' }}
                          >
                            {featuredPost.frontmatter.title}
                          </Heading>

                          <Text 
                            color="gray.400" 
                            fontSize="lg"
                            maxW="3xl"
                          >
                            {featuredPost.frontmatter.description}
                          </Text>

                          <HStack spacing={6} color="gray.500">
                            <HStack>
                              <Icon as={FiCalendar} color="blue.400" />
                              <Text>
                                {new Date(featuredPost.frontmatter.date).toLocaleDateString('de-DE', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </Text>
                            </HStack>
                            <HStack>
                              <Icon as={FiClock} color="blue.400" />
                              <Text>{featuredPost.frontmatter.readingTime} min</Text>
                            </HStack>
                          </HStack>
                        </VStack>
                      </Box>

                      {/* Hover Gradient */}
                      <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        h="6px"
                        bg="blue.500"
                        transform="scaleX(0)"
                        transformOrigin="left"
                        transition="transform 0.3s ease-out"
                        _groupHover={{
                          transform: "scaleX(1)"
                        }}
                      />

                      {/* Meteors Effect */}
                      <Meteors number={20} className="opacity-0 group-hover:opacity-100" />
                    </MotionBox>
                  </Link>
                </Box>
              )}

              {/* Active Filters */}
              {/* Blog Grid */}
              {filteredAndSortedPosts.length > 0 ? (
                <BlogGrid posts={filteredAndSortedPosts} />
              ) : (
                <Box 
                  p={12} 
                  textAlign="center"
                  border="1px dashed"
                  borderColor="blue.800"
                  borderRadius="xl"
                  bg="gray.800"
                >
                  <VStack spacing={4}>
                    <Icon 
                      as={FiFileText} 
                      color="blue.400" 
                      boxSize={10} 
                    />
                    <Text 
                      fontFamily="mono" 
                      color="gray.400"
                      fontSize="lg"
                    >
                      Keine Artikel gefunden
                    </Text>
                    <Text color="gray.500">
                      Versuche es mit anderen Suchbegriffen oder Filtern
                    </Text>
                  </VStack>
                </Box>
              )}
            </Box>
          </Box>

          {/* Background Elements */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            h="100%"
            pointerEvents="none"
            backgroundImage="linear-gradient(to bottom right, rgba(66, 153, 225, 0.05) 0%, transparent 50%, rgba(66, 153, 225, 0.05) 100%)"
            opacity={0.5}
            zIndex={0}
          />
        </Box>
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/blog'));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join(process.cwd(), 'content/blog', filename),
      'utf-8'
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);
    
    // Berechne die Lesezeit
    const readingTime = Math.ceil(content.split(/\s+/).length / 200); // 200 Wörter pro Minute

    return {
      slug: filename.replace('.md', ''),
      frontmatter: {
        ...frontmatter,
        readingTime,
      },
    } as BlogPost;
  });

  return {
    props: {
      posts: posts.sort((a, b) => {
        return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
      }),
    },
  };
};
