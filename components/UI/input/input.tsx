import Image from 'next/image'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password'
  id: string
  name: string
  title: string
  placeholder?: string
  error?: any
  errorMessage?: string
  hasIcon?: boolean
  profile?: boolean
}

function Input({
  type = 'text',
  id,
  name,
  title,
  placeholder,
  error,
  errorMessage,
  hasIcon = true,
  profile = false,
  ...rest
}: InputProps) {
  if (!id) {
    throw new Error('Input component must have an id prop')
  } else if (!title) {
    throw new Error('Input component must have a title prop')
  } else if (!name) {
    throw new Error('Input component must have a name prop')
  }

  const uniqueId = `${id}-${name}`

  return (
    <div
      className={`py-1 ${profile ? 'md:flex md:items-center md:justify-between' : ''}`}
    >
      <label
        htmlFor={uniqueId}
        className={`text-xs text-neutral-dark-grey ${profile ? 'md:w-5/12 md:text-base md:text-neutral-grey' : ''}`}
      >
        {title}
      </label>
      <div className={`relative ${profile ? 'md:w-7/12' : ''}`}>
        <input
          className={`w-full text-neutral-dark-grey ring-neutral-borders ring-1 cursor-pointer bg-white outline-none transition-all duration-300 ease-in-out rounded-lg py-3 ${hasIcon ? 'pl-10' : 'px-4'} ${
            error
              ? '!ring-error !text-error hover:shadow-none hover:!ring-error/50 focus:ring-error focus:shadow-none '
              : 'text-neutral-dark-grey ring-neutral-borders focus:ring-primary-index hover:ring-primary-index/50 focus:shadow-lg hover:shadow-lg'
          }`}
          type={type}
          name={title === 'Link' ? `${name}-link` : name}
          id={uniqueId}
          placeholder={placeholder}
          {...rest}
        />
        {hasIcon && (
          <span className="absolute top-1/2 left-3 transform -translate-y-1/2">
            {title === 'Link' ? (
              <Image
                src={`/images/icon-link.svg`}
                alt={title}
                width={16}
                height={16}
              />
            ) : (
              <Image
                src={`/images/icon-${id === 'confirm-password' ? 'password' : id}.svg`}
                alt={title}
                width={16}
                height={16}
              />
            )}
          </span>
        )}
        {error && (
          <span className="absolute top-1/2 right-0 transform -translate-y-1/2 text-xs lg:text-base text-error p-2 lg:px-4 bg-white">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  )
}

export default Input
