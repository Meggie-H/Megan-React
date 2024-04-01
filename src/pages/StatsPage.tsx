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

      </div>
      <div className="m-4 overflow-hidden flex flex-col w-screen justify-center rounded-lg border border-gray-600 bg-gray-900">
        <h2 className="w-full py-4 text-center">Commit data</h2>
        <div className="w-full bg-gray-950 grid grid-cols-2 gap-12">
          <IssueGraph />
          <BuildGraph />
          <CommitGraph />
          <LanguageGraph />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
