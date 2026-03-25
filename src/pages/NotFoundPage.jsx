import PlaceholderHeroPage from '../components/shared/PlaceholderHeroPage'

export default function NotFoundPage() {
  return (
    <PlaceholderHeroPage
      eyebrow="Navigation"
      title="Page Not Found"
      description="The address you requested is not available. Use the site search or return home to keep browsing BOCRA services."
      route="/404"
    />
  )
}
