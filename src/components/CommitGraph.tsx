import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { getContributors } from '../services/StatsAPI';
import { IContributor, RouteParams } from '../models';
import { PolarArea } from 'react-chartjs-2';

export const CommitGraph = () => {
  const { username, repo }: RouteParams = useParams({ strict: false });

  const ContributorQuery = useQuery({
    queryKey: [`getContributors`, username, repo],
    queryFn: () => getContributors(username, repo),
  });

  const contributorNames: string[] =
    ContributorQuery.data?.map(
      (contributor: IContributor) => contributor.name,
    ) ?? [];
  const contributions: number[] =
    ContributorQuery.data?.map(
      (contributor: IContributor) => contributor.contributions,
    ) ?? [];

  const chartData = {
    labels: contributorNames,
    datasets: [
      {
        label: 'Contributions',
        data: contributions,
        backgroundColor: [
          '#B8860B',
          '#1A466B',
          '#FF8C00',
          '#4B0082',
          '#800020',
          '#228B22',
          '#33A0BF',
        ],
        borderColor: 'transparent',
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#edf2f7',
        },
      },
    },
  };

  if (ContributorQuery.isLoading) {
    return (
      <div className="flex h-full w-full flex-col items-center rounded-2xl bg-gray-900 p-4">
        <div className="skeleton h-full w-full bg-gray-800"></div>
      </div>
    );
  }

  if (ContributorQuery.isError) {
    return <div>Error fetching commit data</div>;
  }

  return (
    <div className="flex h-full flex-col items-center rounded-2xl bg-gray-900 p-4">
      <h2 className="width-full text-gray-200">Commits</h2>
      <div className="flex h-full w-full justify-center">
        <PolarArea data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
