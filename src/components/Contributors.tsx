import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { getContributors } from '../services/StatsAPI';
import { IContributor, IRouteParams } from '../models';

export const Contributors = () => {
  const { username, repo }: IRouteParams = useParams({ strict: false });

  const ContributorQuery = useQuery({
    queryKey: [`getContributors`, username, repo],
    queryFn: () => getContributors(username, repo),
  });

  if (ContributorQuery.isLoading) {
    return (
      <div className="flex h-48 w-screen flex-col items-center rounded-2xl bg-gray-950 p-4">
        <div className="skeleton h-full w-full bg-gray-800"></div>
      </div>
    );
  }

  if (ContributorQuery.isError) {
    return <div>Error fetching commit data</div>;
  }

  return (
    <div className="bg-gray-950">
      <div className="justify-left flex flex-wrap">
        {ContributorQuery.data?.map((contributor: IContributor) => (
          <div
            key={contributor.name}
            className="m-2 flex items-center gap-2 rounded-2xl bg-gray-900 p-4 md:m-4 md:flex-col"
          >
            <img
              src={contributor.avatar}
              alt={`${contributor.name} profile picture`}
              className="h-6 w-6 rounded-full md:h-24 md:w-24"
            />
            <p className="text-sm text-white ">{contributor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
