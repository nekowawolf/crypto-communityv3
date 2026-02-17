import { CommunityItem } from '@/types/community';

const MOCK_DATA: CommunityItem[] = [
    {
        "_id": "675c07d48350607d1c13534f",
        "name": "Airdrop Finder",
        "platforms": "Telegram",
        "category": "Airdrop",
        "img_url": "https://nekowawolf.github.io/cdn-images/images/2025/1766365966_1000171132.jpg",
        "link_url": "https://t.me/airdropfind"
    },
    {
        "_id": "675c16312f76c36be1cdd2a8",
        "name": "Airdrop Sultan",
        "platforms": "Telegram",
        "category": "Airdrop",
        "img_url": "https://pbs.twimg.com/profile_images/1778637424190758912/z3x3cB3p_400x400.jpg",
        "link_url": "https://t.me/airdropsultanindonesia"
    },
    {
        "_id": "675cf8d163042dee02f87eef",
        "name": "Stress Capital",
        "platforms": "Discord",
        "category": "Airdrop",
        "img_url": "https://pbs.twimg.com/profile_images/1696873767581126656/df4GPpGG_400x400.jpg",
        "link_url": "https://discord.gg/stresscapitals"
    },
    {
        "_id": "675cfd9a63042dee02f87ef0",
        "name": "KKPC",
        "platforms": "Facebook",
        "category": "Social",
        "img_url": "https://s3.coinmarketcap.com/static-gravity/image/607814caeaad41f0b919741f301fe16d.jpg",
        "link_url": "https://m.facebook.com/keluhkesahpemaincrypto"
    }
];

export const fetchCommunityData = async (): Promise<CommunityItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_DATA);
        }, 500);
    });
};
