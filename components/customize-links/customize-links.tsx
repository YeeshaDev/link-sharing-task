'use client'

import { useDevlinksContext } from '@/context/devlink-context'
import EmptyLinkContent from './empty-link-content'
import Button from '../UI/button/button'
import LinksList from './customize-links-list'
import LinkContainerSkeleton from '../UI/loading/links-container-skeleton'

const CustomizeLinks: React.FC = () => {
  const { devlinksList, addNewLink, isButtonDisabled, loading, handleSubmit } =
    useDevlinksContext()

  return (
    <>
      <div className="px-6">
        <Button style="secondary" onClick={addNewLink} disabled={loading}>
          + Add new link
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="px-6">
          {loading ? (
            <LinkContainerSkeleton />
          ) : devlinksList?.length > 0 ? (
            <LinksList links={devlinksList} />
          ) : (
            <EmptyLinkContent />
          )}
        </div>
        <div>
          <hr className="mb-5 border-neutral-borders" />
          <div className="px-6 md:text-end">
            <div className="md:inline-flex">
              <Button style="primary" disabled={isButtonDisabled}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default CustomizeLinks
