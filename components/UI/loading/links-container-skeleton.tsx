import Image from "next/image";
import smallLogo from "@/public/images/logo-devlinks-small.svg";

function LinkContainerSkeleton() {
  return (
    <div className="w-full h-[377px] lg:h-[470px] mb-5 bg-neutral-light-purple rounded-xl animate-pulse flex items-center justify-center">
      <Image src={smallLogo} alt="loading indicator" height={42} width={42} />
    </div>
  );
}

export default LinkContainerSkeleton;
