import React from 'react';
import { Link, useParams } from '@tanstack/react-router';
import CommitIcon from '@mui/icons-material/Commit';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { RouteParams } from '../models';

const Navbar = () => {
  const {username, repo} : RouteParams = useParams({ strict: false });
  
  return (
    <div className="w-screen border-b border-gray-600 bg-black px-4 pb-0 text-gray-400">
      <div className="breadcrumbs text-lg">
        <ul>
          <li>
            <Link to="/" className="text-gray-400">
              <img
                className="h-8 w-8"
                src="https://assets-global.website-files.com/61d1b6e84887f53fef1dcdf2/631b45e07d98cfb364e5951f_github-white.png"
              />
            </Link>
          </li>
          <li>
            <Link to={`/${username}/repos`}>{username}</Link>
          </li>
          <li>{repo}</li>
        </ul>
      </div>
      <div className="mt-2 flex gap-8 text-lg">
        <Link
          to="commits"
          className="flex h-full  items-center gap-1 pb-2 text-gray-500 [&.active]:border-b-2 [&.active]:border-orange-400"
        >
          <CommitIcon />
          <h2 className="text-gray-200">Commits</h2>
        </Link>
        <Link
          to="git-tree"
          className="flex items-center gap-1 pb-2 text-gray-400 [&.active]:border-b-2 [&.active]:border-orange-400"
        >
          <AccountTreeIcon />
          <h2 className="text-gray-200">Git Tree</h2>
        </Link>
        <Link
          to="stats"
          className="flex items-center gap-1 pb-2 text-gray-400 [&.active]:border-b-2 [&.active]:border-orange-400"
        >
          <QueryStatsIcon />
          <h2 className="text-gray-200">Stats</h2>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
