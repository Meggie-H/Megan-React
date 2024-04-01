import { IssueGraph } from '../components';
import { BuildGraph } from '../components';
import { Contributors } from '../components';
import { CommitGraph } from '../components';
import { LanguageGraph } from '../components';

const StatsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="m-2 my-0 w-11/12 border-b border-t border-gray-900 md:m-12">
        <Contributors />
      </div>
      <div className="m-2 flex w-11/12 items-center justify-center md:m-12">
        <div className="flex w-full flex-col justify-center overflow-hidden rounded-lg border border-gray-600 bg-gray-900">
          <h2 className="w-full py-4 text-center">Commit data</h2>
          <div className="grid w-full grid-cols-1 bg-gray-950 md:grid-cols-2 lg:grid-cols-4">
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
