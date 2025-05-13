const TagList = ({ tags }: { tags: string[] }) => {
    if (!tags || tags.length === 0) return null;
    return (
        <div className="flex flex-wrap items-center gap-4">
            <h3 className="text-xl font-bold">태그</h3>
            <ul className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <li
                        key={tag}
                        className="drag-none rounded-full border border-solid border-black/10 px-4 py-2"
                    >
                        {tag}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TagList;
