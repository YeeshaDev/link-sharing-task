import HeadingGroup from '@/components/UI/heading/heading-group'
import UserProfileForm from '@/components/profile-details/user-profile-form'

export default function ProfileDetailsPage() {
  return (
    <>
      <div className="px-6">
        <HeadingGroup
          title="Profile Details"
          subtitle="Add your details to create a personal touch to your profile."
        />
      </div>
      <UserProfileForm />
    </>
  )
}
