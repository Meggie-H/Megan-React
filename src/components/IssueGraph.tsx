import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { getClosedIssueCount, getOpenIssueCount } from "../services/apiService";

const IssueGraph = () => {

    ChartJS.register(ArcElement, Tooltip, Legend);

    const { username } = useParams({ strict: false });
    const { repo } = useParams({ strict: false });
    
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
        datasets: [{
            label: 'Issues',
            data: [ OpenIssueQuery.data, ClosedIssueQuery.data],
            backgroundColor: [
                'red',
                'green',
            ],
            borderColor: 'transparent',
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }

    return (
        <div className="flex flex-col items-center p-4 bg-gray-900 rounded-2xl">
            <h2 className="width-full">Issues</h2>
            <Bar data={data} options={options}/>
        </div>
    );
}

export default IssueGraph;