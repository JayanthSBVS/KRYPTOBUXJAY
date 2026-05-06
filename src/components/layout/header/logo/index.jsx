import { getImagePath } from "@/lib/utils/imagePath";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link href="/">
      <img
        src={getImagePath("/images/logo/logo.svg")}
        alt="logo"
        style={{ width: "auto", height: "50px" }} />
      
    </Link>);

};

export default Logo;