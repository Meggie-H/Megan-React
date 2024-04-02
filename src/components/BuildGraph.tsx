import { useParams } from '@tanstack/react-router';
import { getBuildStats } from '../services/StatsAPI';
import { useQuery } from '@tanstack/react-query';
import { Doughnut } from 'react-chartjs-2';
import { IRouteParams } from '../models';
import { StatsSkeleton } from './StatsSkeleton';

export const BuildGraph = () => {
  const { username, repo }: IRouteParams = useParams({ strict: false });

  const {
    data: buildData,
    isLoading: buildLoading,
    isError: buildError,
  } = useQuery({
    queryKey: [`getBuildStats`, username, repo],
    queryFn: () => getBuildStats(username, repo),
  });

  const data = {
    labels: ['Failed', 'Successful'],
    datasets: [
      {
        label: 'Builds',
        data: [buildData?.failures ?? 0, buildData?.successes ?? 0],
        backgroundColor: ['#800020', '#228B22'],
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

  if (buildLoading) {
    return <StatsSkeleton />;
  }

  if (buildError) {
    return <div>Error fetching build data</div>;
  }

  return (
    <div className="flex flex-col items-center border border-gray-800 p-4">
      <h2 className="text-gray-200">Builds</h2>
      <Doughnut data={data} options={chartOptions} />
    </div>
  );
};
