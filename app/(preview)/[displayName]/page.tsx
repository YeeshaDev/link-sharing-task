import UserPageContainer from '@/components/preview/user-page-container'
import React from 'react'

interface ViewUserPageProps {
  params: {
    displayName: string
  }
}

const ViewUserPage: React.FC<ViewUserPageProps> = ({ params }) => {
  return <UserPageContainer displayName={params.displayName} />
}

export default ViewUserPage
