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

  return (
    <div className="bg-gray-950">
      <h2 className="text-white">Contributors</h2>
      <div className="flex flex-wrap justify-center">
        {ContributorQuery.data?.map((contributor: IContributor) => (
          <div
            key={contributor.name}
            className="m-4 flex flex-col items-center rounded-2xl bg-gray-900 p-4"
          >
            <img
              src={contributor.avatar}
              alt={contributor.name}
              className="h-24 w-24 rounded-full"
            />
            <p className="text-white">{contributor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contributors;
