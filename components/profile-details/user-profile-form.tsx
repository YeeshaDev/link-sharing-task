'use client'

import Button from '../UI/button/button'
import UploadImage from './upload-image'
import ProfileInputGroup from './profile-input-group'
import { useUserProfileContext } from '@/context/user-profile-context'
import UserProfileDetailSkeleton from '../UI/loading/user-profile-detail-skeleton'

function UserProfileForm() {
  const { handleSubmit, buttonDisabled, loading } = useUserProfileContext()

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          {loading ? (
            <UserProfileDetailSkeleton />
          ) : (
            <>
              <div className="px-6 md:h-[273px]">
                <UploadImage />
              </div>
              <div className="px-6 md:h-[255px]">
                <ProfileInputGroup />
              </div>
            </>
          )}
          <div>
            <hr className="mb-5 border-neutral-borders" />
            <div className="px-6 md:text-end">
              <div className="md:inline-flex">
                <Button style="primary" disabled={buttonDisabled}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default UserProfileForm
