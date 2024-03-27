import { Gitgraph } from "@gitgraph/react";
import { getCommits } from "../services/apiService";
import { ICommit } from "../models";
import { useQuery } from "@tanstack/react-query";
import ReadMore from "./ReadMore";
import { useParams } from "@tanstack/react-router";

// create an animation for the git graph
function GitGraph() {
  const { username } = useParams({ strict: false });
  const { repo } = useParams({ strict: false });

  const { data: commitData, isLoading, isError } = useQuery({
    queryKey: [`getCommits`],
    queryFn: () => getCommits(username, repo),
  });

  let branches: Record<string, any> = {};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching commit data</div>;
  }

  return (
    <>
      <div className="block overflow-hidden rounded-lg border border-gray-600 bg-gray-900 md:w-4/6 lg:hidden">
        {commitData?.map((commit) => (
          <div key={commit.id} className='border-t border-b border-gray-300 p-2 flex items-center mx-2'>
          <img src={commit.author?.avatar_url} alt="Avatar" className="h-8 w-8 rounded-full mr-2"></img>
          <div className='w-full'>
            <div className="flex justify-between gap-4 text-gray-400 w-full">
              <p>{commit.author?.login ? commit.author.login : "Unknown"}</p>
              <p>{commit.date}</p>
              <p>{commit.id}</p>
            </div>
            <h2 className='italic'>{commit.message}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block z">
        <table className="gap-4 md:w-2/3 border border-gray-300">
          <thead className="w-full">
            <tr className="border border-gray-300 column">
              <th className="border border-gray-300 ">Description</th>
              <th className="border border-gray-300 ">Date</th>
              <th className="border border-gray-300 ">Author</th>
              <th className="border border-gray-300 ">Commit</th>
            </tr>
          </thead>
          <tbody>
            {commitData?.map((commit) => (
              <tr key={commit.id}>
                <td className="pl-4">
                  <ReadMore>{commit.message}</ReadMore>
                </td>
                <td className="text-center">{commit.date}</td>
                <td className="text-center">{commit.author?.login ? commit.author.login : "Unknown"}</td>
                <td className="text-center">{commit.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>

    // I'm still implementing this. The logic is extremely hard, I will add this at the end when i have time.
  //   <Gitgraph>
  //   {(gitgraph: { branch: (arg0: string) => any; }) => {
  //     const master = gitgraph.branch("945cabfb67a3ea4056524e59e011ce642e6a3c7d");

  //     branches["945cabfb67a3ea4056524e59e011ce642e6a3c7d"] = master;

  //     //
  //     commitData?.forEach(commit => {
  //       console.log(commit.branches[0]);
  //       console.log(commit.id);
  //       if (commit.type === 'commit') {
  //         const branchName = commit.branches[0];
  //         if (branchName in branches) {
  //           branches[branchName].commit(commit.message);
  //         } else {
  //           const newBranch = master.branch(branchName);
  //           branches[branchName] = newBranch;
  //           newBranch.commit(commit.message);
  //         }
  //       }
  //       if (commit.type === 'merge'){
  //         const sourceBranchName = commit.branches[0];
  //         const targetBranchName = commit.branches[1];
      
  //         if (sourceBranchName in branches && targetBranchName in branches) {
  //           const sourceBranch = branches[sourceBranchName];
  //           const targetBranch = branches[targetBranchName];
      
  //           targetBranch.merge(sourceBranch, "marged +sourceBranchName} into ${targetBranchName}");
  //         } 
  //         else {
  //           console.error('Error: One or more branches not found for merge operation');
  //         }
  //       }

  //     });
  //   }}
  // </Gitgraph>
  );
}

export default GitGraph;