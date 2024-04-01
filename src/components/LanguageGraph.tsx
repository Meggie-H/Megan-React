import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { getLanguageStats } from '../services/StatsAPI';
import { Doughnut } from 'react-chartjs-2';
import { IRouteParams } from '../models';
import { StatsSkeleton } from './StatsSkeleton';

export const LanguageGraph = () => {
  const { username, repo }: IRouteParams = useParams({ strict: false });

  const LanguagesStatsQuery = useQuery({
    queryKey: [`getLanguageStats`, username, repo],
    queryFn: () => getLanguageStats(username, repo),
  });

  const data = {
    labels: LanguagesStatsQuery.data?.languages,
    datasets: [
      {
        data: LanguagesStatsQuery.data?.percentages,
        backgroundColor: LanguagesStatsQuery.data?.colors,
        borderColor: 'transparent',
        borderWidth: 1,
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

  if (LanguagesStatsQuery.isLoading) {
    <StatsSkeleton />;
  }

  if (LanguagesStatsQuery.isError) {
    return <div>Error fetching language data</div>;
  }

  return (
    <div className="flex flex-col items-center border border-gray-800 p-4">
      <h2 className="text-gray-200">Languages</h2>
      <Doughnut data={data} options={chartOptions} />
    </div>
  );
};
