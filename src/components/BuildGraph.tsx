import React from 'react';
import { useParams } from '@tanstack/react-router';
import { getBuildStats } from '../services/StatsAPI';
import { useQuery } from '@tanstack/react-query';
import { Doughnut } from 'react-chartjs-2';
import { RouteParams } from '../models';
import { StatsSkeleton } from './StatsSkeleton';

const BuildGraph = () => {
  const { username, repo }: RouteParams = useParams({ strict: false });

  const BuildStatsQuery = useQuery({
    queryKey: [`getBuildStats`, username, repo],
    queryFn: () => getBuildStats(username, repo),
  });

  const data = {
    labels: ['Failed', 'Successful'],
    datasets: [
      {
        label: 'Builds',
        data: [
          BuildStatsQuery.data?.failures ?? 0,
          BuildStatsQuery.data?.successes ?? 0,
        ],
        backgroundColor: ['red', 'green'],
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

  if (BuildStatsQuery.isLoading) {
    return (
      <StatsSkeleton />
    );
  }

  if (BuildStatsQuery.isError) {
    return <div>Error fetching build data</div>;
  }

  return (
    <div className="flex flex-col items-center rounded-2xl bg-gray-900 p-4">
      <h2 className="text-gray-200">Builds</h2>
      <Doughnut data={data} options={chartOptions} />
    </div>
  );
};

export default BuildGraph;
