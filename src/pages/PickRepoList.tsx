import { useQuery } from '@tanstack/react-query';
import { getRepos } from '../services/RepositoriesAPI';
import languageColors from '../json/languageColors.json';
import { ILanguageColors } from '../models';
import { Link, useParams } from '@tanstack/react-router';
import { RouteParams } from '../models';

const PickRepoList = () => {
  const languageColorsData: ILanguageColors = languageColors;
  const { username }: RouteParams = useParams({ strict: false });
  const RepoQuery = useQuery({
    queryKey: [`getRepos`, username],
    queryFn: () => getRepos(username),
  });

  if (RepoQuery.isLoading) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-950 p-4">
        <div className="skeleton h-full w-full bg-gray-800 md:w-4/6"></div>
      </div>
    );
  }

  if (RepoQuery.isError) {
    return <div>Error fetching commit data</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 p-4">
      <div className="w-full overflow-hidden rounded-lg border border-gray-600 bg-gray-900 md:w-4/6">
        <h1 className="py-4 text-center text-2xl font-bold text-gray-200">
          Pick a Repository
        </h1>
        {RepoQuery.data?.map((repo) => (
          <Link
            to={`/${username}/${repo.name}/dashboard/stats`}
            key={repo.id}
            className="flex w-full transform flex-col items-center border-b border-t border-gray-800 bg-gray-950 p-4 transition-transform duration-300 hover:scale-[1.01] hover:cursor-pointer hover:bg-gray-800"
          >
            <h2 className="w-full text-left text-lg text-gray-200">
              {repo.name}
            </h2>
            <p className="text-md w-full pb-4 text-left italic text-gray-400">
              {repo.description}
            </p>
            <div className="flex w-full justify-between text-gray-400">
              <div className="flex items-center">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor:
                      languageColorsData[repo.language] ?? 'gray',
                  }}
                ></div>
                <p className="pl-1 text-left text-sm">{repo.language}</p>
              </div>
              <p className="w-full pr-1 text-right text-sm">
                last updated: {repo.updatedTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PickRepoList;
