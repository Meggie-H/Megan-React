import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { getClosedIssueCount, getOpenIssueCount } from '../services/StatsAPI';
import { IRouteParams } from '../models';

export const IssueGraph = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const { username, repo }: IRouteParams = useParams({ strict: false });

  const OpenIssueQuery = useQuery({
    queryKey: [`getOpenIssueCount`, username, repo],
    queryFn: () => getOpenIssueCount(username, repo),
  });

  const ClosedIssueQuery = useQuery({
    queryKey: [`getCompletedIssueCount`, username, repo],
    queryFn: () => getClosedIssueCount(username, repo),
  });

  const data = {
    labels: ['Open', 'Completed'],
    datasets: [
      {
        label: 'Issues',
        data: [OpenIssueQuery.data, ClosedIssueQuery.data],
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

  if (OpenIssueQuery.isLoading || ClosedIssueQuery.isLoading) {
    <div className="flex h-full w-full flex-col items-center rounded-2xl bg-gray-900 p-4">
      <div className="skeleton h-full w-full bg-gray-800 md:w-4/6"></div>
    </div>;
  }

  if (OpenIssueQuery.isError || ClosedIssueQuery.isError) {
    return <div>Error fetching issue data</div>;
  }

  return (
    <div className="flex flex-col items-center border border-gray-800 p-4">
      <h2 className="text-gray-200">Issues</h2>
      <Pie data={data} options={chartOptions} />
    </div>
  );
};
