import { useParams } from '@tanstack/react-router';
import { getBuildStats } from '../services/StatsAPI';
import { useQuery } from '@tanstack/react-query';
import { Doughnut } from 'react-chartjs-2';

const BuildGraph = () => {
    const { username } = useParams({ strict: false });
    const { repo } = useParams({ strict: false });
    
    const BuildStatsQuery = useQuery({
      queryKey: [`getBuildStats`],
      queryFn: () => getBuildStats(username, repo),
    });

    const data = {
        labels: ['Failed', 'Succeful'],
        datasets: [{
            label: 'Builds',
            data: [ BuildStatsQuery.data?.failures ?? 0, BuildStatsQuery.data?.successes ?? 0 ],
            backgroundColor: [
                'red',
                'green',
            ],
            borderColor: 'transparent',
            borderWidth: 1
        }]
    };

    if (BuildStatsQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (BuildStatsQuery.isError) {
        return <div>Error fetching build data</div>;
    }

    return (
        <div className="flex flex-col items-center p-4 bg-gray-900 rounded-2xl">
            <h2 className="width-full">Builds</h2>
            <Doughnut data={data} />
        </div>
    );
};

export default BuildGraph;