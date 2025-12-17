const MostSaveLessonCard = ({ lesson }) => {
    const {
        title,
        description,
        totalSaves,
        category,
        emotional_ton,
        privacy,
        access_level
    } = lesson;

    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>

            {/* Description */}
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                {description}
            </p>

            {/* Stats */}
            <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                <span className="bg-indigo-50 px-2 py-1 rounded-full text-indigo-600 font-semibold">
                    Saves: {totalSaves}
                </span>
                <span className="px-2 py-1 rounded-full bg-gray-100">{category}</span>
            </div>

            {/* Tags */}
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                <span>{emotional_ton}</span>
                <span>{privacy}</span>
                <span>{access_level}</span>
            </div>

            {/* CTA */}
            <div className="mt-4">
                <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition">
                    View Lesson
                </button>
            </div>
        </div>
    );
};

export default MostSaveLessonCard;
