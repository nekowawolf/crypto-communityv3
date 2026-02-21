'use client';

import { useState, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float } from '@react-three/drei';
import { HighlightText } from './ui/HighlightText';
import * as THREE from 'three';

const faqs = [
    {
        question: "What is Crypto Community Directory?",
        answer: "Crypto Community Directory is a platform where you can discover, explore, and join verified crypto communities from around the world, including Telegram, Discord, and other social platforms."
    },
    {
        question: "Who can list a community here?",
        answer: "Anyone who manages or owns a crypto-related community can submit their community to be listed, as long as it follows our quality and transparency guidelines."
    },
    {
        question: "Is listing a community free?",
        answer: "Yes, listing your crypto community is completely free. Our goal is to help communities grow and help users find trusted places to connect."
    },
    {
        question: "How are communities reviewed?",
        answer: "Submitted communities are reviewed to ensure they are active, relevant to crypto, and not misleading. This helps maintain a high-quality directory for users."
    },
    {
        question: "Do I need to login to use the platform?",
        answer: "No account is required. You can browse, explore, and discover crypto communities freely without signing up."
    }
];

function Model({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
    const { scene } = useGLTF('/models/nww3d.glb');
    const group = useRef<THREE.Group>(null);
    const targetRotation = useRef({ x: 0, y: 0 });

    useFrame((_, delta) => {
        if (!group.current) return;

        // Rotation limits
        const maxHorizontal = 0.35; // left-right
        const maxVertical = 0.25;   // up-down

        targetRotation.current.x = THREE.MathUtils.clamp(
            mouse.current.y * maxVertical,
            -maxVertical,
            maxVertical
        );

        targetRotation.current.y = THREE.MathUtils.clamp(
            mouse.current.x * maxHorizontal,
            -maxHorizontal,
            maxHorizontal
        );

        group.current.rotation.x = THREE.MathUtils.damp(
            group.current.rotation.x,
            targetRotation.current.x,
            4,
            delta
        );

        group.current.rotation.y = THREE.MathUtils.damp(
            group.current.rotation.y,
            targetRotation.current.y,
            4,
            delta
        );
    });

    return (
        <group ref={group} position={[0, -1.5, 0]}>
            <primitive object={scene} scale={2.5} />
        </group>
    );
}

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const mouse = useRef({ x: 0, y: 0 });

    return (
        <section
            className="relative py-20 overflow-hidden"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();

                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;

                mouse.current.x = x * 2 - 1;
                mouse.current.y = y * 2 - 1;
            }}
        >
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="h-[180px] w-full flex justify-center items-center relative z-20">
                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 18, 5]} intensity={1} />
                        <Environment preset="city" />
                        <Suspense fallback={null}>
                            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                                <Model mouse={mouse} />
                            </Float>
                        </Suspense>
                    </Canvas>
                </div>

                <h2 className="mb-4 text-center text-2xl font-extrabold text-fill-color sm:text-4xl xl:text-5xl">
                    Frequently Asked <HighlightText text="Questions" inView />
                </h2>

                <p className="mx-auto mb-16 max-w-[714px] font-medium text-fill-color/70">
                    Everything you need to know about the Crypto Community Directory.
                </p>

                <div className="max-w-3xl mx-auto text-left flex flex-col gap-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            className="glass-1 card-color rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                                className="w-full flex items-center justify-between p-4 sm:p-6 text-left cursor-pointer"
                            >
                                <span className="text-base sm:text-lg font-semibold text-fill-color pr-6">
                                    {faq.question}
                                </span>

                                <div className="flex-shrink-0 text-brand">
                                    {openIndex === index ? (
                                        <FiMinus className="w-4 h-4 sm:w-5 sm:h-5" />
                                    ) : (
                                        <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                                    )}
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-fill-color/70 border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}