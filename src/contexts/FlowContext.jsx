import React, { createContext, useState, useMemo } from 'react';

export const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
    const [isKioskModeActive, setIsKioskModeActive] = useState(false);
    const [startPosition, setStartPosition] = useState('/start');

    useEffect(() => {
        const storedKioskMode = localStorage.getItem('isKioskModeActive');
        if (storedKioskMode) {
            setIsKioskModeActive(storedKioskMode === 'true');
        }
        const storedStartPosition = localStorage.getItem('startPosition');
        if (storedStartPosition) {
            setStartPosition(storedStartPosition);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isKioskModeActive', isKioskModeActive);
        localStorage.setItem('startPosition', startPosition);
    }, [isKioskModeActive, startPosition]);

    const contextValue = useMemo(() => ({
        isKioskModeActive,
        setIsKioskModeActive,
        startPosition,
        setStartPosition,
    }), [isKioskModeActive, startPosition]);

    return (
        <FlowContext.Provider value={contextValue}>
            {children}
        </FlowContext.Provider>
    );
};
