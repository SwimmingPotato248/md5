import { trpc } from "@/src/utils/trpc";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import Link from "next/link";

const UserPage: NextPage = () => {
  const { data: questions } = trpc.question.getQuestions.useQuery({ take: 3 });
  const { data: exams } = trpc.exam.getExams.useQuery({ take: 3 });
  return (
    <div className="mx-auto flex w-fit gap-12">
      <div className="w-96">
        <h2 className="bg-gradient-to-r from-amber-400 to-amber-500 py-2 text-center text-lg font-semibold">
          Your questions
        </h2>
        {questions?.map((question) => {
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
            </div>
          );
        })}
        <Link
          href={"/users/questions"}
          className="flex items-center justify-center bg-blue-100 py-2 text-blue-500 underline"
        >
          View all
          <ArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>

      <div className="w-96">
        <h2 className="bg-gradient-to-r from-pink-400 to-pink-500 py-2 text-center text-lg font-semibold">
          Your exams
        </h2>
        {exams?.map((exam) => {
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
        <Link
          href={"/users/exams"}
          className="flex items-center justify-center bg-blue-100 py-2 text-blue-500 underline"
        >
          View all
          <ArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

export default UserPage;
