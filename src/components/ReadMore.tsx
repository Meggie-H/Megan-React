import { useState } from "react";

interface ReadMoreProps {
    children: string;
}
 
const ReadMore = ({ children } : ReadMoreProps) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 50) : text}
            <span
                onClick={toggleReadMore}
                className="read-or-hide"
                style={{ color: "cyan-600" }}
            >
                {isReadMore ? "...Read More" : " Show Less"}
            </span>
        </p>
    );
};

export default ReadMore;