import { trpc } from "@/src/utils/trpc";
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import Link from "next/link";

const ExamsPage: NextPage = () => {
  const { data } = trpc.exam.getExams.useQuery({});

  return (
    <div className="mx-auto w-[450px]">
      <Link
        href={"/users"}
        className="my-2 flex w-24 items-center gap-2 text-sm font-semibold text-red-500"
      >
        <ArrowLeftIcon className="h-3 w-3 " />
        Go back
      </Link>
      <h1 className="hidden">Exam Page</h1>
      <Link
        href={"/users/exams/create"}
        className="flex items-center justify-center bg-blue-600 py-3 text-blue-100 hover:bg-blue-700"
      >
        <PlusIcon className="h-5 w-5" />
        Create new exam
      </Link>
      <div>
        {data?.map((exam) => {
          return (
            <div
              key={exam.id}
              className="py-2 px-6 text-lg odd:bg-indigo-200 even:bg-indigo-300"
            >
              <Link href={`/users/exams/${exam.id}`}>
                <p className="font-semibold text-indigo-900">{exam.title}</p>
                <p className="text-xs text-indigo-600">
                  {exam._count.questions} questions
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExamsPage;
