import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getLanguageStats } from "../services/apiService";
import { Doughnut } from "react-chartjs-2";

const LanguageGraph = () => {
    const { username } = useParams({ strict: false });
    const { repo } = useParams({ strict: false });
    
    const LanguagesStatsQuery = useQuery({
      queryKey: [`getLanguageStats`, username, repo],
      queryFn: () => getLanguageStats(username, repo),
    });

    console.log(LanguagesStatsQuery.data?.percentages);

    const data = {
        labels: LanguagesStatsQuery.data?.languages,
        datasets: [{
            label: 'Builds',
            data: LanguagesStatsQuery.data?.percentages,
            backgroundColor: LanguagesStatsQuery.data?.colors,
            borderColor: 'transparent',
            borderWidth: 1
        }]
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-900 rounded-2xl">
            <h2 className="width-full">Builds</h2>
            <Doughnut data={data} />
        </div>
    );
};

export default LanguageGraph;