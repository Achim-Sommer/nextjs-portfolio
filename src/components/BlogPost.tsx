import React from 'react';
import { MDXRemote } from 'next-mdx-remote';

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
    <div className="max-w-3xl mx-auto py-8 [&>*]:max-w-full [&>*]:overflow-hidden">
      <article className="w-full max-w-full">
        <h1 className="text-3xl font-bold mb-4 text-white">{frontMatter.title}</h1>
        <p className="text-gray-400 mb-8">
          {new Date(frontMatter.date).toLocaleDateString('de-DE')}
        </p>
        <div className="prose prose-lg prose-invert max-w-none markdown-content [&>*]:max-w-full [&>*]:overflow-hidden">
          <MDXRemote {...source} />
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
