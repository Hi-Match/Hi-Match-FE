import { useEffect, useRef, useState } from "react";

interface AuthTimerProps {
    duration: number;
    onExpire: () => void;
    trigger: number;
}

const AuthTimer = ({ duration, onExpire, trigger }: AuthTimerProps) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (trigger) {
            setTimeLeft(duration);

            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current!);
                        onExpire();

                        return 0;
                    }

                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [trigger]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <>
            <span className="text-gray01 text-sm">
                남은시간 {formatTime(timeLeft)}
            </span>
        </>
    );
};

export default AuthTimer;
