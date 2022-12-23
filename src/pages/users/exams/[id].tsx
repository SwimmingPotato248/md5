import { trpc } from "@/src/utils/trpc";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const ExamDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") return <div>Error</div>;

  const { data } = trpc.exam.getOne.useQuery({ id });

  return (
    <div className="mx-auto w-96">
      <Link
        href={"/users/exams"}
        className="my-4 flex w-24 items-center gap-2 text-sm font-semibold text-red-500"
      >
        <ArrowLeftIcon className="h-3 w-3 " />
        Go back
      </Link>
      <h1 className="hidden">Exam Detail</h1>
      <h2 className="text-center text-2xl font-bold">{data?.title}</h2>
      <div className="flex flex-col gap-2 bg-gray-50">
        {data?.questions.map((question) => {
          return (
            <div key={question.id}>
              <p className="bg-gray-200 px-4 py-2 text-lg font-semibold">
                {question.content}
              </p>
              <div>
                {question.answers.map((answer) => {
                  return (
                    <div
                      key={answer.id}
                      className={`${
                        answer.status
                          ? "bg-green-500 text-green-100"
                          : "bg-gray-200 text-gray-600"
                      } px-4 py-2`}
                    >
                      <div>{answer.content}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExamDetailPage;
