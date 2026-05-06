import Signin from "@/components/auth/sign-in";
import Breadcrumb from "@/components/shared/Breadcrumb";

const SigninPage = () => {
  return (
    <>
      <Breadcrumb pageName="Sign In Page" />
      <Signin />
    </>
  );
};

export default SigninPage;