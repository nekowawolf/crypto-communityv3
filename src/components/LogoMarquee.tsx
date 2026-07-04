'use client';

import Marquee from 'react-fast-marquee';
import Image from 'next/image';

const logos = [
    "https://nekowawolf.github.io/cdn-images/images/2025/1766365966_1000171132.jpg",
    "https://nekowawolf.github.io/cdn-images/images/2026/1771756244_airdrop_sultan.jpg",
    "https://nekowawolf.github.io/cdn-images/images/2026/1771756325_stress_capital.jpg",
    "https://nekowawolf.github.io/cdn-images/images/2026/1771756371_kkpc.jpg",
    "https://nekowawolf.github.io/cdn-images/images/2026/1771756496_tomket.jpg",
    "https://nekowawolf.github.io/cdn-images/images/2026/1771756599_bubadibabo.jpg",
    "https://nekowawolf.github.io/cdn-images/images/2026/1771756686_exa.jpg",
    "https://nekowawolf.github.io/cdn-images/images/2026/1771756959_alchemy.webp",
    "https://nekowawolf.github.io/delete-later/assets/img/bgpt1.jpg",
    "https://nekowawolf.github.io/delete-later/assets/img/cryptosiastdrops.jpg",
    "https://nekowawolf.github.io/cdn-images/images/2026/1771757302_polkadot.jpg",
    "https://nekowawolf.github.io/cdn-images/images/2026/1771757362_bc.jpg",
    "https://nekowawolf.github.io/delete-later/assets/img/pgs1.jpg",
    "https://nekowawolf.github.io/cdn-images/images/2026/1771757941_hca.jpg",
    "https://nekowawolf.github.io/cdn-images/images/2026/1771757978_blockdev.jpg",
    "https://nekowawolf.github.io/cdn-images/images/2026/1771758005_nftid.jpg",
    "https://nekowawolf.github.io/cdn-images/images/2026/1771758040_cc.jpg",
    "https://nekowawolf.github.io/delete-later/assets/img/bu21.jpg",
    "https://nekowawolf.github.io/delete-later/assets/img/evo.jpg",
    "https://nekowawolf.github.io/cdn-images/images/2026/1771758134_ETH_Global.webp"
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
                                <Image
                                    src={logo}
                                    alt={`Community ${idx}`}
                                    fill
                                    sizes="64px"
                                    className="object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </a>
                        ))}
                    </div>
                </Marquee>
            </div>
        </section>
    );
}