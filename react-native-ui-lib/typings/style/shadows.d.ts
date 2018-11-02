declare const Shadows: {
    white10: {
        top: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
        };
        bottom: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
            shadowOffset: {
                height: number;
                width: number;
            };
        };
    };
    white20: {
        top: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
        };
        bottom: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
            shadowOffset: {
                height: number;
                width: number;
            };
        };
    };
    white30: {
        top: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
        };
        bottom: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
            shadowOffset: {
                height: number;
                width: number;
            };
        };
    };
    white40: {
        top: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
        };
        bottom: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
            shadowOffset: {
                height: number;
                width: number;
            };
        };
    };
    dark10: {
        top: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
        };
        bottom: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
            shadowOffset: {
                height: number;
                width: number;
            };
        };
    };
    dark20: {
        top: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
        };
        bottom: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
            shadowOffset: {
                height: number;
                width: number;
            };
        };
    };
    dark30: {
        top: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
            shadowOffset: {
                height: number;
                width: number;
            };
        };
        bottom: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
            shadowOffset: {
                height: number;
                width: number;
            };
        };
    };
    dark40: {
        top: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
            shadowOffset: {
                height: number;
                width: number;
            };
        };
        bottom: {
            shadowColor: any;
            shadowOpacity: number;
            shadowRadius: number;
            shadowOffset: {
                height: number;
                width: number;
            };
        };
    };
    /**
     * Load custom set of shadows
     * arguments:
     * shadows - map of keys and values
     * e.g
     * dark40: {
     *   top: {shadowColor: Colors.dark10, shadowOpacity: 0.04, shadowRadius: 4.5, shadowOffset: {height: 5, width: 0}},
     *   bottom: {shadowColor: Colors.dark20, shadowOpacity: 0.04, shadowRadius: 9, shadowOffset: {height: 10, width: 0}},
     * }
     */
    loadShadows(shadows: any): void;
};
export default Shadows;
