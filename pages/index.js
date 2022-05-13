import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';

export default function Home({ projects }) {
  return (
    <div>
      <Head>
        <title>Nick Thorpe</title>
      </Head>

      <div className='projects'>
        {projects.map((project, index) =>
          <h3>{project.frontmatter.title}</h3>
        )}
      </div>

    </div>
  )
}

export async function getStaticProps() {
  // get files from projects folder
  const files = fs.readdirSync(path.join('projects'));

  // get slug and frontmatter
  const projects = files.map(filename => {
    // create slug
    const slug = filename.replace('.md', '');

    // get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('projects', filename),
      'utf8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    }
  });

  return {
    props: {
      projects
    }
  }
}
