'use client';
import { useCallback } from "react";
import { Particles as ReactParticles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export default function ParticlesBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <ReactParticles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: {
                    enable: true,
                    zIndex: -1
                },
                particles: {
                    number: {
                        value: 30,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: "#ffffff"
                    },
                    shape: {
                        type: "circle"
                    },
                    opacity: {
                        value: 0.1,
                        random: true,
                        animation: {
                            enable: true,
                            speed: 1,
                            minimumValue: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        animation: {
                            enable: true,
                            speed: 2,
                            minimumValue: 0.1,
                            sync: false
                        }
                    },
                    move: {
                        enable: true,
                        speed: 0.5,
                        direction: "none",
                        random: false,
                        straight: false,
                        outModes: {
                            default: "out"
                        }
                    }
                },
                interactivity: {
                    detectsOn: "canvas",
                    events: {
                        onHover: {
                            enable: true,
                            mode: "bubble"
                        },
                        resize: true
                    },
                    modes: {
                        bubble: {
                            distance: 200,
                            size: 6,
                            duration: 0.3
                        }
                    }
                },
                background: {
                    color: "transparent"
                },
                detectRetina: true
            }}
        />
    );
}
