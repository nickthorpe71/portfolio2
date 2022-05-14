import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';

export default function ProjectPage({
    frontmatter: { title, date, cover_image },
    slug,
    content,
}) {
    return (
        <>
            <Link href='/'>
                <a className='btn btn-back'>Go Back</a>
            </Link>
            <div className='card card-page'>
                <h1 className='project-title'>{title}</h1>
                <div className='project-date'>Created on {date}</div>
                <img src={cover_image} alt='' />
                <div className='project-body'>
                    <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('projects'))

    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md', ''),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(
        path.join('projects', slug + '.md'),
        'utf-8'
    )

    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
        props: {
            frontmatter,
            slug,
            content,
        },
    }
}
