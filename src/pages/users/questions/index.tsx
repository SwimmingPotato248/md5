import { trpc } from "@/src/utils/trpc";
import { PlusIcon } from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import Link from "next/link";

const MyQuestionPage: NextPage = () => {
  const { data, isLoading, isError, refetch } =
    trpc.question.getQuestions.useQuery();
  const { mutate } = trpc.question.delete.useMutation({
    onSuccess() {
      refetch();
    },
  });
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  return (
    <div className="mx-auto mt-14 w-[500px] bg-gray-200 shadow">
      <div className="py-2 text-center text-sm font-bold">My Questions</div>
      <Link
        href={"/users/questions/create"}
        className="mx-auto flex w-full items-center justify-center gap-1 bg-blue-100 py-4 text-center font-medium text-blue-900 hover:bg-blue-300"
      >
        <PlusIcon className="h-6 w-6" />
        <span>Create more question</span>
      </Link>
      <Link
        href={"/users/exams/create"}
        className="mx-auto flex w-full items-center justify-center gap-1 bg-blue-700 py-4 text-center font-medium text-blue-200 hover:bg-blue-800"
      >
        <PlusIcon className="h-6 w-6" />
        <span>Create exam</span>
      </Link>
      <div className="flex flex-col">
        {data.map((question) => {
          return (
            <div
              key={question.id}
              className={
                "flex justify-between px-6 py-2 odd:bg-gray-300 even:bg-gray-200"
              }
            >
              <div>
                <Link
                  href={`/users/questions/${question.id}`}
                  className={"text-bold text-xl text-gray-800"}
                >
                  {question.content}
                </Link>
                <div className="text-xs leading-none text-gray-500">
                  {question.category.name}
                </div>
              </div>
              <button
                className="rounded-lg bg-red-200 p-2 text-xs text-red-600 hover:bg-red-300"
                onClick={() => {
                  if (
                    confirm("Are you sure you want to delete this question")
                  ) {
                    mutate({ id: question.id });
                  }
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyQuestionPage;
