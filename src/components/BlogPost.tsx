import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { Box, Heading, Text, Container } from '@chakra-ui/react';

interface BlogPostProps {
  source: any;
  frontMatter: {
    title: string;
    date: string;
    description: string;
  };
}

const BlogPost: React.FC<BlogPostProps> = ({ source, frontMatter }) => {
  return (
    <Container 
      maxW="container.md" 
      py={8}
      sx={{
        '& > *': {
          maxWidth: '100% !important',
          overflow: 'hidden',
        }
      }}
    >
      <Box 
        as="article"
        width="100%"
        maxWidth="100%"
      >
        <Heading as="h1" mb={4}>{frontMatter.title}</Heading>
        <Text color="gray.600" mb={8}>
          {new Date(frontMatter.date).toLocaleDateString()}
        </Text>
        <Box 
          className="prose prose-lg markdown-content"
          sx={{
            '& > *': {
              maxWidth: '100% !important',
              overflow: 'hidden',
            }
          }}
        >
          <MDXRemote {...source} />
        </Box>
      </Box>
    </Container>
  );
};

export default BlogPost;
