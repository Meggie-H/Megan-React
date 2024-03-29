import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getContributors } from "../services/apiService";
import { IContributor } from "../models";
import { PolarArea } from "react-chartjs-2";


const CommitGraph = () => {
    const { username } = useParams({ strict: false });
    const { repo } = useParams({ strict: false });
  
    const ContributorQuery = useQuery({
      queryKey: [`getContributors`, username, repo],
      queryFn: () => getContributors(username, repo),
    });

    const contributorNames: string[] =ContributorQuery.data?.map((contributor: IContributor) => contributor.name) ?? [];
    const contributions: number[] = ContributorQuery.data?.map((contributor: IContributor) => contributor.contributions) ?? [];

    const chartData = {
        labels: contributorNames,
        datasets: [
          {
            label: 'Contributions',
            data: contributions,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
          },
        ],
      };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
        <PolarArea data={chartData} />
    </div>
  );
};

export default CommitGraph;