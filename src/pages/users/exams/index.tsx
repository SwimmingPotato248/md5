import { trpc } from "@/src/utils/trpc";
import { type NextPage } from "next";

const ExamsPage: NextPage = () => {
  const { data } = trpc.exam.getAll.useQuery();
  console.log(data);

  return (
    <div>
      <h1>Exam Page</h1>
      <div>
        {data?.map((exam) => {
          return <div key={exam.id}>{exam.title}</div>;
        })}
      </div>
    </div>
  );
};

export default ExamsPage;
