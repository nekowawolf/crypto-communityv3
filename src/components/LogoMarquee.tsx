'use client';

import Marquee from 'react-fast-marquee';

const logos = [
    "https://cdn.nekowawolf.xyz/image/2026/1787498168_1766365966_1000171132.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498201_1771756244_airdrop_sultan.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498227_1771756325_stress_capital.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498243_1771756371_kkpc.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498256_1771756496_tomket.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498266_1771756599_bubadibabo.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498278_1771756686_exa.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498287_1771756959_alchemy.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498316_bgpt1.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498333_cryptosiastdrops.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498353_1771757302_polkadot.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498368_1771757362_bc.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498387_pgs1.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498403_1771757941_hca.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498414_1771757978_blockdev.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498430_1771758005_nftid.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498442_1771758040_cc.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498457_bu21.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498466_evo.webp",
    "https://cdn.nekowawolf.xyz/image/2026/1787498483_1771758134_ETH_Global.webp"
];

export default function LogoMarquee() {
    return (
        <section className="py-12 card-color2 border-t border-b border-color">
            <div className="max-w-7xl mx-auto px-10">

                <Marquee
                    gradient={false}
                    speed={30}
                    pauseOnHover={true}
                    className="px-0"
                >
                    <div className="flex items-center gap-6 px-3">
                        {logos.map((logo, idx) => (
                            <a
                                key={idx}
                                className="block w-16 h-16 rounded-md overflow-hidden border border-color transform transition-transform relative cursor-pointer"
                            >
                                <img
                                    src={logo}
                                    alt={`Community ${idx}`}
                                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </a>
                        ))}
                    </div>
                </Marquee>
            </div>
        </section>
    );
}