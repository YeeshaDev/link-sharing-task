import HeadingGroup from '@/components/UI/heading/heading-group'
import CustomizeLinks from '@/components/customize-links/customize-links'

export default function CustomizeLinksPage() {
  return (
    <>
      <div className="px-6">
        <HeadingGroup
          title="Customize your links"
          subtitle="Add/edit/remove links below and then share all your profiles with the world!"
        />
      </div>
      <CustomizeLinks />
    </>
  )
}
