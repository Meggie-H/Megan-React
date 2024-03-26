import { useQuery } from '@tanstack/react-query';
import { getRepos } from '../services/apiService';
import languageColors from '../json/languageColors.json';
import { ILanguageColors } from '../models';
import { Link, useParams } from '@tanstack/react-router';

const PickRepoList = () => {
    const languageColorsData: ILanguageColors = languageColors;
    const { username } = useParams({ strict: false });
    const RepoQuery = useQuery({
        queryKey: [`getRepos`],
        queryFn: () => getRepos(username),
    });

    if (RepoQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (RepoQuery.isError) {
        return <div>Error fetching commit data</div>;
    }

    return (
        <div className='w-screen h-screen bg-gray-950 flex flex-col justify-center items-center p-4'>
            <div className="w-full border border-gray-600 bg-gray-900 rounded-lg overflow-hidden md:w-4/6">
                <h1 className="text-2xl text-gray-200 font-bold text-center py-4">Pick a Repository</h1>
                {RepoQuery.data?.map((repo) => (
                    <Link to={`/${username}/${repo.name}/Dashboard`} key={repo.id} className='border-t border-b bg-gray-950 border-gray-800 p-4 flex w-full flex-col items-center hover:bg-gray-800 hover:cursor-pointer transform hover:scale-[1.01] transition-transform duration-300'>
                        <h2 className='text-gray-200 text-left w-full text-lg'>{repo.name}</h2>
                        <p className='italic text-md w-full text-left pb-4'>{repo.description}</p>
                        <div className='flex w-full justify-between'>
                            <div className='flex items-center'>
                                <div className="w-3 h-3 rounded-full" style={{backgroundColor: languageColorsData[repo.language] || 'gray'}}></div>
                                <p className="text-sm text-left pl-1">{repo.language}</p>
                            </div>
                            <p className='text-sm w-full text-right pr-1'>last updated: {repo.updatedTime}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PickRepoList;
