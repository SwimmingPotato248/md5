import { trpc } from "@/src/utils/trpc";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";

const QuestionDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [editMode, setEditMode] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { mutateAsync } = trpc.question.editQuestion.useMutation();
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  if (typeof id !== "string") {
    return <div>Error!!!</div>;
  }

  const { data, isLoading, isError, refetch } = trpc.question.getOne.useQuery({
    id,
  });
  const { mutate } = trpc.question.delete.useMutation({
    onSuccess() {
      router.push("/users/questions");
    },
  });

  if (isError || isLoading) return <div>Loading</div>;

  return (
    <>
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
                    await mutateAsync({
                      id,
                      content: contentRef.current.value,
                    });
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
            <div className="pl-4 text-lg font-semibold">{data?.content}</div>
            <div className="flex gap-2">
              <button onClick={openModal}>
                <TrashIcon className="h-6 w-6 border border-red-500 text-red-500 hover:bg-red-500 hover:text-red-100" />
              </button>
              <button onClick={() => setEditMode(true)}>
                <PencilSquareIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}
        <div className="flex items-baseline divide-x divide-gray-700">
          <div className="px-4 text-sm text-gray-500">
            {data?.category.name}
          </div>
          <div className="px-4 text-xs text-gray-500">
            Included in {data?._count.exams} exams
          </div>
        </div>
        <ol>
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
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-red-700"
                  >
                    Confirmation
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this question
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-red-200 hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        mutate({ id });
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-md border-gray-500 bg-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default QuestionDetailPage;
