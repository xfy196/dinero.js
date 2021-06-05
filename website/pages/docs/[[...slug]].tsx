import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { getFiles, getFileBySlug } from '../../utils/mdx';
import { Base } from '../../layouts';
import { getHeadings } from '../../utils';

type PageProps = {
  source: string;
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: {
    slug: string[];
    title: string;
    description: string;
  };
};

export default function Docs({ source, mdxSource, frontMatter }: PageProps) {
  const headings = getHeadings(source);

  return (
    <Base headings={headings}>
      <Head>
        <title>{frontMatter.title} | Dinero.js</title>
        <meta name="description" content={frontMatter.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <h1>{frontMatter.title}</h1>
        <MDXRemote {...mdxSource} />
      </>
    </Base>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug || ['index'];
  const page = await getFileBySlug('docs', [slug].flat());

  return { props: page };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getFiles('docs');
  const slugs = pages.map((page) =>
    page.replace('.mdx', '').split('/').filter(Boolean)
  );

  return {
    paths: slugs
      .map((slug) => {
        const [root] = slug;

        return { params: { slug: root === 'index' ? [] : slug } }
      }),
    fallback: true,
  };
};
