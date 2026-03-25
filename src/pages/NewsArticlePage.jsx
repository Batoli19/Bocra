import PlaceholderHeroPage from '../components/shared/PlaceholderHeroPage'

export default function NewsArticlePage() {
  return (
    <PlaceholderHeroPage
      eyebrow="Newsroom"
      title="News Story"
      description="Individual article pages will expand BOCRA announcements, public notices, and sector updates with full story detail."
      route="/news/:slug"
    />
  )
}
