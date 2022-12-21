import { type NextPage } from "next";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data } = trpc.example.echo.useQuery({
    text: "Hello",
  });

  return <>{data}</>;
};

export default Home;
