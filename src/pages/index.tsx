import React, { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Main page of application.
 * When loaded, web will automatically redirect to /registration page.
 */
const Main: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/registration");
  }, []);

  return <div></div>;
};

export default Main;
