import Signup from "@/components/auth/sign-up";
import Breadcrumb from "@/components/shared/Breadcrumb";

const SignupPage = () => {
  return (
    <>
      <Breadcrumb pageName="Sign Up Page" />
      <Signup />
    </>
  );
};

export default SignupPage;