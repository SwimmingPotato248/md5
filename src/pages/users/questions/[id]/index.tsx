import { trpc } from "@/src/utils/trpc";
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const QuestionDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [editMode, setEditMode] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { mutateAsync } = trpc.question.editQuestion.useMutation();

  if (typeof id !== "string") {
    return <div>Error!!!</div>;
  }

  const { data, isLoading, isError, refetch } = trpc.question.getOne.useQuery({
    id,
  });
  console.log(data);
  if (isError || isLoading) return <div>Loading</div>;

  return (
    <div className="mx-auto w-[500px] bg-cyan-300 py-4 px-10">
      <Link
        href={"/users/questions"}
        className="flex w-24 items-center gap-2 text-sm font-semibold text-red-500"
      >
        <ArrowLeftIcon className="h-3 w-3 " />
        Go back
      </Link>
      {editMode ? (
        <>
          <textarea
            className="resize-none text-lg font-semibold"
            cols={34}
            rows={1}
            onChange={(e) => {
              e.target.rows =
                Math.floor(e.target.value.length / e.target.cols) + 1;
            }}
            ref={contentRef}
          >
            {data?.content}
          </textarea>

          <div className="flex justify-between px-8">
            <button
              onClick={async () => {
                if (contentRef.current?.value) {
                  await mutateAsync({ id, content: contentRef.current.value });
                  refetch();
                  setEditMode(false);
                }
              }}
            >
              Save changes
            </button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <div className="flex justify-between">
          <div className="text-lg font-semibold">{data?.content}</div>
          <button onClick={() => setEditMode(true)}>
            <PencilSquareIcon className="h-6 w-6" />
          </button>
        </div>
      )}
      <div className="text-xs text-gray-500">
        Included in {data?._count.exams} exams
      </div>
      <ol className="list-inside list-decimal">
        {data?.answers.map((answer) => {
          return (
            <li
              key={answer.id}
              className={`${
                answer.status
                  ? "bg-green-600 font-bold text-green-200"
                  : "bg-gray-200 text-gray-800"
              } py-1 px-4`}
            >
              {answer.content}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default QuestionDetailPage;
