import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { getContributors } from '../services/StatsAPI';
import { IContributor, IRouteParams } from '../models';
import { PolarArea } from 'react-chartjs-2';
import { StatsSkeleton } from './StatsSkeleton';

export const CommitGraph = () => {
  const { username, repo }: IRouteParams = useParams({ strict: false });

  const {
    data: contributorsData,
    isLoading: contributorsLoading,
    isError: contributorsError,
  } = useQuery({
    queryKey: [`getContributors`, username, repo],
    queryFn: () => getContributors(username, repo),
  });

  const contributorNames: string[] =
    contributorsData?.map((contributor: IContributor) => contributor.name) ??
    [];
  const contributions: number[] =
    contributorsData?.map(
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

  if (contributorsLoading) {
    return <StatsSkeleton />;
  }

  if (contributorsError) {
    return <div>Error fetching commit data</div>;
  }

  return (
    <div className="flex h-full flex-col items-center border border-gray-800 p-4">
      <h2 className="text-gray-200">Commits</h2>
      <div className="flex h-full justify-center">
        <PolarArea data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
