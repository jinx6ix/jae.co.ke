export const CitationWidget = ({ title, source, url, date }: { title: string, source: string, url?: string, date?: string }) => {
    return (
        <div className="border-l-4 border-gray-300 pl-4 py-2 mt-4 text-sm text-gray-600 bg-gray-50">
            <p className="font-semibold">{title}</p>
            <p>Source: {source}{date && ` (${date})`}</p>
            {url && (
                <a href={url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    View Source
                </a>
            )}
        </div>
    );
};
