import PlaceholderHeroPage from '../../components/shared/PlaceholderHeroPage'

export default function ComplaintDetailPage() {
  return (
    <PlaceholderHeroPage
      eyebrow="Case Tracking"
      title="Complaint Details"
      description="Each complaint will surface its status timeline, evidence, BOCRA updates, and next required actions in one place."
      route="/portal/complaint/:id"
    />
  )
}
