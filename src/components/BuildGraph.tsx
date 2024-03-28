import { useParams } from '@tanstack/react-router';
import { getBuildStats } from '../services/apiService';
import { useQuery } from '@tanstack/react-query';
import { Doughnut } from 'react-chartjs-2';

const BuildGraph = () => {
    const { username } = useParams({ strict: false });
    const { repo } = useParams({ strict: false });
    
    const getBuildStatsQuery = useQuery({
      queryKey: [`getBuildStats`],
      queryFn: () => getBuildStats(username, repo),
    });

    const data = {
        labels: ['Failed', 'Succeful'],
        datasets: [{
            label: 'Builds',
            data: [ getBuildStatsQuery.data?.failures ?? 0, getBuildStatsQuery.data?.successes ?? 0 ],
            backgroundColor: [
                'red',
                'green',
            ],
            borderColor: 'transparent',
            borderWidth: 1
        }]
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="width-full">Builds</h2>
            <Doughnut data={data} />
        </div>
    );
};

export default BuildGraph;