import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { getClosedIssueCount, getOpenIssueCount } from '../services/StatsAPI';
import { IRouteParams } from '../models';
import { StatsSkeleton } from './StatsSkeleton';

export const IssueGraph = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const { username, repo }: IRouteParams = useParams({ strict: false });

  const {
    data: openIssueData,
    isLoading: openLoading,
    isError: openError,
  } = useQuery({
    queryKey: [`getOpenIssueCount`, username, repo],
    queryFn: () => getOpenIssueCount(username, repo),
  });

  const {
    data: closedIssueData,
    isLoading: closedLoading,
    isError: closedError,
  } = useQuery({
    queryKey: [`getCompletedIssueCount`, username, repo],
    queryFn: () => getClosedIssueCount(username, repo),
  });

  const data = {
    labels: ['Open', 'Completed'],
    datasets: [
      {
        label: 'Issues',
        data: [openIssueData, closedIssueData],
        backgroundColor: ['#33A0BF', '#4B0082'],
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

  if (openLoading || closedLoading) {
    <StatsSkeleton />;
  }

  if (openError || closedError) {
    return <div>Error fetching issue data</div>;
  }

  return (
    <div className="flex flex-col items-center border border-gray-800 p-4">
      <h2 className="text-gray-200">Issues</h2>
      <Pie data={data} options={chartOptions} />
    </div>
  );
};
