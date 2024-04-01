import { IssueGraph } from '../components';
import { BuildGraph } from '../components';
import { Contributors } from '../components';
import { CommitGraph } from '../components';
import { LanguageGraph } from '../components';

const StatsPage = () => {
  return (
    <div className="">
      <div className="w-screen border-b border-t border-gray-900">
        <Contributors />
      </div>
      <div className="flex w-full h-full flex-col gap-4 p-4 md:grid md:grid-cols-2 lg:grid-cols-4">
        <IssueGraph />
        <BuildGraph />
        <CommitGraph />
        <LanguageGraph />
      </div>
    </div>
  );
};

export default StatsPage;
