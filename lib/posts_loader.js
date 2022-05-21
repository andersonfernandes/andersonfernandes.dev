import fs from 'fs'
import matter from 'gray-matter'
import { publishedAt } from './dates_helper'

const filesBasePath = `${process.cwd()}/_posts`

export function getAllPostSlugs() {
  const files = fs.readdirSync(filesBasePath, "utf-8")
  const mdFiles = files.filter((fn) => fn.endsWith(".md"))

  return mdFiles.map((filename) => filename.replace(/\.md$/, ''))
}

export function getAllPosts() {
  const slugs = getAllPostSlugs()
  const posts = slugs.map((slug) => {
    const path = `${filesBasePath}/${slug}.md`
    const rawPostContent = fs.readFileSync(path, 'utf8')

    const postData = matter(rawPostContent).data

    return {
      ...postData,
      slug
    }
  })

  return posts.sort((a, b) => publishedAt(b.date) - publishedAt(a.date))
}

export function getPostBySlug(slug) {
  const postData = fs.readFileSync(`${filesBasePath}/${slug}.md`)

  return matter(postData)
}
