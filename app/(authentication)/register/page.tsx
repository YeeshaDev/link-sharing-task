import HeadingGroup from "@/components/UI/heading/heading-group";
import RegisterForm from "./register-form";

function RegisterPage() {
  return (
    <div className="flex flex-col gap-5 px-8 pt-14 md:py-10 md:w-[476px] md:px-10">
      <HeadingGroup
        title="Create account"
        subtitle="Let's get you started sharing your links!"
      />
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
