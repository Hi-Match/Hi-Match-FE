interface ScrapButtonProps {
    isBookmarked: boolean;
    onClick: () => void;
}
const ScrapButton = ({ isBookmarked, onClick }: ScrapButtonProps) => (
    <button onClick={onClick} className="text-lg">
        {isBookmarked ? "★" : "☆"}
    </button>
);
export default ScrapButton;
