import { FcGoogle } from "react-icons/fc";
import { googleAuth } from "@/auth/service";

export default function GoogleOauth() {
  const handleGoogleAuth = () => {
    googleAuth();
  };

  return (
    <>
      <div onClick={handleGoogleAuth} className="rounded-lg bg-white px-6 py-3 cursor-pointer shadow-md outline outline-black/5 ">
        <FcGoogle className="text-3xl " />
      </div>
    </>
  );
}
