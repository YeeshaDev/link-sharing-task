'use client'

import { useDevlinksContext } from '@/context/devlink-context'
import { useEffect, useState, ChangeEvent, FocusEvent } from 'react'
import Dropdown from '../UI/input/dropdown'
import Input from '../UI/input/input'
import Image from 'next/image'

interface LinkFormProps {
  fieldId: string
  index: number
  platform: string
  link: string
}

interface ErrorState {
  id: string
  status?: boolean
  field?: {
    link?: {
      error: boolean
      message: string
    }
    platform?: {
      error: boolean
      message: string
    }
  }
}

const LinkForm: React.FC<LinkFormProps> = ({
  fieldId,
  index,
  platform,
  link,
}) => {
  const {
    removeLink,
    addItemIntoList,
    errorState,
    throwError,
    removeError,
    changeIsEditedValue,
    isListEdited,
  } = useDevlinksContext()
  const [userLink, setUserLink] = useState<string>(link)
  const [userPlatform, setUserPlatform] = useState<string>(platform)
  const [error, setError] = useState<ErrorState | undefined>(undefined)
  const [isFieldDirty, setIsFieldDirty] = useState<boolean>(isListEdited)

  useEffect(() => {
    changeIsEditedValue(isFieldDirty)
  }, [isFieldDirty, userLink, userPlatform])

  useEffect(() => {
    setIsFieldDirty(isListEdited)
  }, [isListEdited])

  useEffect(() => {
    const errorObj = errorState.find((error) => error.id === fieldId)
    setError(errorObj)
  }, [errorState, fieldId])

  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsFieldDirty(true)
    removeError(fieldId)
    setUserLink(event.target.value)
  }

  const handlePlatformChange = (value: string) => {
    removeError(fieldId)
    setUserPlatform(value)
    addItemIntoList(fieldId, value, userLink)
  }

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    const linkValue = event.target.value
    const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/
    if (linkValue?.trim() === '') {
      throwError(fieldId, true, {
        link: {
          error: true,
          message: "Can't be empty",
        },
      })

      return
    } else if (linkValue && !linkRegex.test(linkValue)) {
      throwError(fieldId, true, {
        link: {
          error: true,
          message: 'Invalid URL',
        },
      })
      return
    } else if (linkValue.length > 0 && userPlatform.trim() === '') {
      throwError(fieldId, true, {
        platform: {
          error: true,
          message: 'Select a platform',
        },
      })
      return
    }

    setIsFieldDirty(true)
    addItemIntoList(fieldId, userPlatform, userLink)
  }

  return (
    <div>
      <div
        className={`flex flex-col gap-2 mb-6 p-4 rounded-xl bg-neutral-light-grey ${
          error?.status ? 'border border-error' : ''
        }`}
      >
        <div className="flex items-center justify-between pt-1">
          <span className="flex items-center gap-2">
            <span>
              <Image
                src="/images/icon-drag-and-drop.svg"
                alt="Drag and drop icon"
                width="12"
                height="16"
              />
            </span>
            <span className="text-neutral-grey font-bold">
              Link #{index + 1}
            </span>
          </span>
          <span
            className="text-neutral-grey hover:underline cursor-pointer"
            onClick={() => removeLink(fieldId)}
          >
            Remove
          </span>
        </div>
        <div className="flex flex-col gap-5">
          <Dropdown
            name={fieldId}
            onChange={handlePlatformChange}
            onClick={() => setIsFieldDirty(true)}
            value={userPlatform}
            error={error?.field?.platform?.error}
            errorMessage={error?.field?.platform?.message}
          />
          <Input
            id={fieldId}
            name={fieldId}
            title="Link"
            type="text"
            placeholder="e.g. https://www.github.com/johnappleseed"
            onChange={handleLinkChange}
            value={userLink}
            onBlur={handleInputBlur}
            error={error?.field?.link?.error}
            errorMessage={error?.field?.link?.message}
          />
        </div>
      </div>
    </div>
  )
}

export default LinkForm
