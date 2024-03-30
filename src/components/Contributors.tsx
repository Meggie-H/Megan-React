import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { getContributors } from '../services/StatsAPI';
import { IContributor, RouteParams } from '../models';

const Contributors = () => {
  const {username, repo} : RouteParams = useParams({ strict: false });

  const ContributorQuery = useQuery({
    queryKey: [`getContributors`, username, repo],
    queryFn: () => getContributors(username, repo),
  });

  if (ContributorQuery.isLoading) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-gray-950 p-4 w-screen h-48">
        <div className="skeleton w-full h-full bg-gray-800"></div>
      </div>
    )
  }

  if (ContributorQuery.isError) {
    return <div>Error fetching commit data</div>;
  }

  return (
    <div className="bg-gray-950">
      <div className="flex flex-wrap justify-left">
        {ContributorQuery.data?.map((contributor: IContributor) => (
          <div
            key={contributor.name}
            className="m-2 md:m-4 flex gap-2 md:flex-col items-center rounded-2xl bg-gray-900 p-4"
          >
            <img
              src={contributor.avatar}
              alt={`${contributor.name} profile picture`}
              className="h-4 w-4 rounded-full md:h-24 md:w-24"
            />
            <p className="text-white text-sm ">{contributor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contributors;
