import { Link } from "react-router";

const MostSaveLessonCard = ({ lesson }) => {
    const {
        lessonId,
        title,
        description,
        totalSaves,
        category,
        emotional_ton,
        privacy,
        access_level
    } = lesson;
    // console.log(lessonId)

    return (
        <div className="group bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-80 w-full">

            {/* Header */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-1">
                    {title}
                </h3>

                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                    {description}
                </p>
            </div>

            {/* Meta Info */}
            <div className="mt-4 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
                    ⭐ {totalSaves} Saves
                </span>

                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                    {category}
                </span>
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-2">
                <span className="bg-gray-50 border text-gray-600 px-2 py-1 rounded-md text-xs">
                    {emotional_ton}
                </span>
                <span className="bg-gray-50 border text-gray-600 px-2 py-1 rounded-md text-xs">
                    {privacy}
                </span>
                <span className="bg-gray-50 border text-gray-600 px-2 py-1 rounded-md text-xs">
                    {access_level}
                </span>
            </div>

            {/* CTA */}
            <Link
                to={`/lesson-details/${lessonId}`}
                className="mt-5 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition w-full"
            >
                View Lesson →
            </Link>
        </div>

    );
};

export default MostSaveLessonCard;
