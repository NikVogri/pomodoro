import { useEffect, useState } from "react";

const INTERVAL_PERIOD = 100; // 1 second

export const useCountdownTimer = (timeInSecs: number) => {
	const [timeLeftInSeconds, setTimeLeftInSeconds] = useState<number | null>(null);

	useEffect(() => {
		setTimeLeftInSeconds(timeInSecs);
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeftInSeconds((oldTimeLeftInSeconds) => oldTimeLeftInSeconds && oldTimeLeftInSeconds - 1);
		}, INTERVAL_PERIOD);

		return () => clearInterval(interval);
	}, []);

	return { timeLeftInSeconds } as { timeLeftInSeconds: number };
};
