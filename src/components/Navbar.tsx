import { Link, useParams } from '@tanstack/react-router';
import CommitIcon from '@mui/icons-material/Commit';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const Navbar = () => {
const { repo } = useParams({ strict: false });
const { username } = useParams({ strict: false });
  return (
    <div className="bg-black w-screen border-b border-gray-600 text-gray-400 px-4 pb-0">
        <div className="text-lg breadcrumbs">
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
                    <Link to={`/${username}/repos`}>
                        {username}
                    </Link>
                </li> 
                <li>
                    {repo}
                </li>
            </ul>
        </div>
        <div className='flex gap-8 text-lg mt-2'>
            <Link to="commits" className="[&.active]:border-b-2 [&.active]:border-orange-400  h-full text-gray-500 flex items-center gap-1 pb-2">
                <CommitIcon />
                <h2 className='text-gray-200'>Commits</h2>
            </Link>
            <Link to="git-tree" className="[&.active]:border-b-2 [&.active]:border-orange-400 text-gray-400 flex items-center gap-1 pb-2">
                <AccountTreeIcon />
                <h2 className='text-gray-200'>Git Tree</h2>
            </Link>
            <Link to="stats" className="[&.active]:border-b-2 [&.active]:border-orange-400 text-gray-400 flex items-center gap-1 pb-2">
                <QueryStatsIcon />
                <h2 className='text-gray-200'>Stats</h2>
            </Link>
        </div>
    </div>
  );
};

export default Navbar;
