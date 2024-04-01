import { IssueGraph } from '../components';
import { BuildGraph } from '../components';
import { Contributors } from '../components';
import { CommitGraph } from '../components';
import { LanguageGraph } from '../components';

const StatsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="m-2 md:m-12 my-0 border-b border-t border-gray-900 w-11/12">
        <Contributors />
      </div>
      <div className="m-2 md:m-12 flex justify-center items-center w-11/12">
        <div className="overflow-hidden flex flex-col w-full justify-center rounded-lg border border-gray-600 bg-gray-900">
          <h2 className="w-full py-4 text-center">Commit data</h2>
          <div className="w-full bg-gray-950 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <IssueGraph />
            <BuildGraph />
            <CommitGraph />
            <LanguageGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
