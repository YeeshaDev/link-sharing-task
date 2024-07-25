export default function UserProfileDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="px-6">
        <div className="h-[343.2px] lg:h-[273px] w-full bg-neutral-light-grey animate-pulse rounded-xl flex flex-col lg:flex-row lg:justify-between lg:items-center p-6">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-24 bg-neutral-light-purple animate-pulse rounded-full" />
            <div className="h-4 w-28 bg-neutral-light-purple animate-pulse rounded-full" />
          </div>
          <div className="flex my-4">
            <div className="w-[193px] h-[193px] flex items-center justify-center cursor-pointer bg-neutral-light-purple rounded-lg border border-neutral-light-purple animate-pulse"></div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-neutral-light-purple animate-pulse rounded-full" />
            <div className="h-4 w-52 bg-neutral-light-purple animate-pulse rounded-full" />
          </div>
        </div>
      </div>
      <div className="px-6 lg:h-[250px]">
        <div className="h-[343.2px] lg:h-[184px] w-full bg-neutral-light-grey animate-pulse rounded-xl flex flex-col gap-4 p-6">
          <div className="flex flex-col gap-2">
            <div className="h-5 w-16 bg-neutral-light-purple animate-pulse rounded-full" />
            <div className="h-8 w-full bg-neutral-light-purple animate-pulse rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-neutral-light-purple animate-pulse rounded-full" />
            <div className="h-4 w-52 bg-neutral-light-purple animate-pulse rounded-full" />
          </div>
          <div className="flex flex-col items-center gap-2 lg:hidden">
            <div className="h-4 w-40 bg-neutral-light-purple animate-pulse rounded-full" />
            <div className="h-4 w-56 bg-neutral-light-purple animate-pulse rounded-full" />
          </div>
          <div className="flex flex-col items-end gap-2 lg:hidden">
            <div className="h-4 w-40 bg-neutral-light-purple animate-pulse rounded-full" />
            <div className="h-4 w-56 bg-neutral-light-purple animate-pulse rounded-full" />
          </div>
          <div className="flex flex-col items-end gap-2 lg:hidden">
            <div className="h-5 w-16 bg-neutral-light-purple animate-pulse rounded-full" />
            <div className="h-8 w-full bg-neutral-light-purple animate-pulse rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
