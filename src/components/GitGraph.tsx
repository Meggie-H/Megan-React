import { Gitgraph } from '@gitgraph/react';
import { getCommits } from '../services/CommitsAPI';
import { ICommit } from '../models';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

// create an animation for the git graph
function GitGraph() {
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

  let branches: Record<string, any> = {};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching commit data</div>;
  }

  return (
    <></>

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
