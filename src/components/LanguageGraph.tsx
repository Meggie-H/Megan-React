import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { getLanguageStats } from '../services/StatsAPI';
import { Doughnut } from 'react-chartjs-2';
import { RouteParams } from '../models';

const LanguageGraph = () => {
  const {username, repo} : RouteParams = useParams({ strict: false });

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
    <div className="flex flex-col items-center rounded-2xl bg-gray-900 p-4 w-full h-full">
      <div className="skeleton w-full h-full md:w-4/6 bg-gray-800"></div>
    </div>
  }

  if (LanguagesStatsQuery.isError) {
    return <div>Error fetching language data</div>;
  }

  return (
    <div className="flex flex-col items-center rounded-2xl bg-gray-900 p-4">
      <h2 className="width-full text-gray-200">Languages</h2>
      <Doughnut data={data} options={chartOptions}/>
    </div>
  );
};

export default LanguageGraph;
