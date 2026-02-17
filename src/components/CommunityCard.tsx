import Image from 'next/image';
import { CommunityItem } from '@/types/community';

export default function CommunityCard({ item }: { item: CommunityItem }) {
    return (
        <div className="card-color rounded-2xl p-4 flex items-center gap-4 w-full max-w-4xl mx-auto mb-4 border border-color hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
            <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-800">
                <Image
                    alt={item.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    src={item.img_url}
                    width={100}
                    height={100}
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold truncate text-fill-color group-hover:text-blue-400 transition-colors">
                        {item.name}
                    </h3>
                    <span className="inline-flex w-fit items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {item.category}
                    </span>
                </div>

                <p className="text-sm text-fill-color/60 mb-2">
                    {item.platforms}
                </p>
            </div>

            <a
                href={item.link_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl text-sm transition-colors duration-200 shadow-lg shadow-blue-600/20"
            >
                JOIN
            </a>
        </div>
    );
}
