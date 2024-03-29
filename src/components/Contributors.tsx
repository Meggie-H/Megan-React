import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getContributors } from "../services/StatsAPI";
import { IContributor } from "../models";


const Contributors = () => {
    const { username } = useParams({ strict: false });
    const { repo } = useParams({ strict: false });
  
    const ContributorQuery = useQuery({
      queryKey: [`getContributors`, username, repo],
      queryFn: () => getContributors(username, repo),
    });

  return (
    <div className="bg-gray-950">
        <h2 className="text-white">Contributors</h2>
        <div className="flex flex-wrap justify-center">
            {ContributorQuery.data?.map((contributor: IContributor) => (
                <div key={contributor.name} className="flex flex-col items-center p-4 bg-gray-900 rounded-2xl m-4">
                    <img src={contributor.avatar} alt={contributor.name} className="rounded-full w-24 h-24" />
                    <p className="text-white">{contributor.name}</p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Contributors;
