import { useState } from 'react';

interface ReadMoreProps {
  children: string;
}

export const ReadMore = ({ children }: ReadMoreProps) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p>
      {isReadMore ? text.slice(0, 50) : text}
      <span onClick={toggleReadMore} className="cursor-pointer text-cyan-600">
        {isReadMore ? ' ...Read More' : ' Show Less'}
      </span>
    </p>
  );
};

export default ReadMore;
