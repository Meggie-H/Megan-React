import { getCommits } from "../services/apiService";
import { useQuery } from "@tanstack/react-query";
import ReadMore from "./ReadMore";
import { useParams } from "@tanstack/react-router";

function GitTable() {
  const { username } = useParams({ strict: false });
  const { repo } = useParams({ strict: false });

  const { data: commitData, isLoading, isError } = useQuery({
    queryKey: [`getCommits`],
    queryFn: () => getCommits(username, repo),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching commit data</div>;
  }

  return (
    <>
      <div className="block overflow-hidden rounded-lg border border-gray-600 bg-gray-900 md:w-4/6 lg:hidden m-4">
        <h2 className="py-4 w-full text-center">Commit data</h2>
        {commitData?.map((commit) => (
          <div key={commit.id} className='bg-gray-950 border-b border-t border-gray-800 items-center p-4'>
              <div className="flex justify-between align-center gap-4 w-full text-gray-100 pb-3 text-md">
                <div className="flex align-center">
                  <img src={commit.author?.avatar_url} alt="Avatar" className="h-6 w-6 rounded-full mr-2"/>
                  <p>{commit.author?.login ? commit.author.login : "Unknown"}</p>
                </div>
                <div className="flex gap-2">                
                  <div className="badge badge-primary badge-outline">{commit.date}</div>
                  <div className="badge badge-secondary badge-outline">{commit.id}</div>
                </div>
              </div> 
              <p className='italic text-gray-400'>{commit.message}</p>
          </div>
        ))}
      </div>
      <div className="hidden lg:block text-gray-300 border border-gray-600 rounded-lg md:w-5/6 overflow-hidden">
        <table className="gap-4 w-full">
          <thead className="w-full bg-gray-900 ">
            <tr className="border border-gray-600 column ">
              <th className="border w-1/2 border-gray-600 p-4">Description</th>
              <th className="border w-1/6 border-gray-600 ">Date</th>
              <th className="border w-1/6 border-gray-600 ">Author</th>
              <th className="border w-1/6 border-gray-600 ">Commit</th>
            </tr>
          </thead>
          <tbody>
            {commitData?.map((commit) => (
              <tr key={commit.id} className="border border-b border-t border-gray-800">
                <td className="pl-4 py-3">
                {commit.message.length > 50 ? (
                  <ReadMore>{commit.message}</ReadMore>
                ) : (
                  commit.message
                )}
                </td>
                <td className="text-center">{commit.date}</td>
                <td className="text-center">
                    {/* <img src={commit.author?.avatar_url} alt="Avatar" className="h-full w-6 rounded-full mr-2"></img> */}
                    <p>{commit.author?.login ? commit.author.login : "Unknown"}</p>
                </td>
                <td className="text-center">{commit.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GitTable;