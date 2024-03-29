import { getCommits } from '../services/apiService';
import { useQuery } from '@tanstack/react-query';
import ReadMore from './ReadMore';
import { useParams } from '@tanstack/react-router';

function GitTable() {
  const { username } = useParams({ strict: false });
  const { repo } = useParams({ strict: false });

  const {
    data: commitData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`getCommits`, username, repo],
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
      <div className="m-4 block overflow-hidden rounded-lg border border-gray-600 bg-gray-900 md:w-4/6 lg:hidden">
        <h2 className="w-full py-4 text-center">Commit data</h2>
        {commitData?.map((commit) => (
          <div
            key={commit.id}
            className="items-center border-b border-t border-gray-800 bg-gray-950 p-4"
          >
            <div className="align-center text-md flex w-full justify-between gap-4 pb-3 text-gray-100">
              <div className="align-center flex">
                <img
                  src={commit.author?.avatar_url}
                  alt="Avatar"
                  className="mr-2 h-6 w-6 rounded-full"
                />
                <p>{commit.author?.login ? commit.author.login : 'Unknown'}</p>
              </div>
              <div className="flex gap-2">
                <div className="badge badge-primary badge-outline">
                  {commit.date}
                </div>
                <div className="badge badge-secondary badge-outline">
                  {commit.id}
                </div>
              </div>
            </div>
            <p className="italic text-gray-400">{commit.message}</p>
          </div>
        ))}
      </div>
      <div className="hidden overflow-hidden rounded-lg border border-gray-600 text-gray-300 md:w-5/6 lg:block">
        <table className="w-full gap-4">
          <thead className="w-full bg-gray-900 ">
            <tr className="column border border-gray-600 ">
              <th className="w-1/2 border border-gray-600 p-4">Description</th>
              <th className="w-1/6 border border-gray-600 ">Date</th>
              <th className="w-1/6 border border-gray-600 ">Author</th>
              <th className="w-1/6 border border-gray-600 ">Commit</th>
            </tr>
          </thead>
          <tbody>
            {commitData?.map((commit) => (
              <tr
                key={commit.id}
                className="border border-b border-t border-gray-800"
              >
                <td className="py-3 pl-4">
                  {commit.message.length > 50 ? (
                    <ReadMore>{commit.message}</ReadMore>
                  ) : (
                    commit.message
                  )}
                </td>
                <td className="text-center">{commit.date}</td>
                <td className="text-center">
                  <p>
                    {commit.author?.login ? commit.author.login : 'Unknown'}
                  </p>
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
