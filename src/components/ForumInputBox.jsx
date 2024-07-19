import ForumInputThread from "./ForumInputThread";
import SelectInput from "./SelectInput";

const searchGroupType = [
  { title: "Search...", value: "search" },
  { title: "Search forums", value: "forums" },
  { title: "Search threads", value: "threads" },
  { title: "Search posts", value: "posts" },
  { title: "Search users", value: "users" },
  { title: "Search all", value: "all" },
];

function ForumInputBox({ forumInput }) {
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-2 text-md font-semibold text-white mb-10">
        <div className="bg-green-900 w-full rounded-md pl-5 pt-2 pb-2">
          <div>{forumInput?.name}</div>
        </div>
        <div className="bg-green-700 rounded-lg flex flex-col w-full justify-between p-2 gap-1">
          {forumInput?.thread?.map((item) => (
            <ForumInputThread thread={item} forumName={forumInput?.name} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ForumInputBox;
