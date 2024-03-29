import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getLanguageStats } from "../services/StatsAPI";
import { Doughnut } from "react-chartjs-2";

const LanguageGraph = () => {
    const { username } = useParams({ strict: false });
    const { repo } = useParams({ strict: false });
    
    const LanguagesStatsQuery = useQuery({
      queryKey: [`getLanguageStats`, username, repo],
      queryFn: () => getLanguageStats(username, repo),
    });


    const data = {
        labels: LanguagesStatsQuery.data?.languages,
        datasets: [{
            data: LanguagesStatsQuery.data?.percentages,
            backgroundColor: LanguagesStatsQuery.data?.colors,
            borderColor: 'transparent',
            borderWidth: 1
        }]
    };

    if (LanguagesStatsQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (LanguagesStatsQuery.isError) {
        return <div>Error fetching language data</div>;
    }

    return (
        <div className="flex flex-col items-center p-4 bg-gray-900 rounded-2xl">
            <h2 className="width-full">Languages</h2>
            <Doughnut data={data} />
        </div>
    );
};

export default LanguageGraph;