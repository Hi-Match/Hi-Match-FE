const TagList = ({ tags }: { tags: string[] }) => {
    if (!tags || tags.length === 0) return null;
    return (
        <div className="flex flex-wrap gap-2">
            <h3 className="text-lg font-bold">태그</h3>
            {tags.map(tag => (
                <div key={tag}>{tag}</div>
            ))}
        </div>
    );
};

export default TagList;
