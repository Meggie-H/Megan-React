import React from "react";
import IssueGraph from "./IssueGraph";
import BuildGraph from "./BuildGraph";
import Contributors from "./Contributors";
import CommitGraph from "./CommitGraph";
import LanguageGraph from "./LanguageGraph";

const StatsPage = () => {
    return (
        <div className="">
            <div className="w-screen border-t border-gray-900 border-b"> 
                <Contributors />
            </div>
            <div className="w-full first-line:flex flex-col gap-4 p-4 md:grid md:grid-cols-2 lg:grid-cols-4">
                <IssueGraph />
                <BuildGraph />
                <CommitGraph />
                <LanguageGraph />
            </div>

      </div>
    );
}

export default StatsPage;