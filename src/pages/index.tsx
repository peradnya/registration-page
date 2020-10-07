import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Main: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/registration");
  }, []);

  return <div></div>;
};

export default Main;
