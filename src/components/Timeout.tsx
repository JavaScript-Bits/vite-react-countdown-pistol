import { useEffect, useState } from "react";
import useGetUser from "../hooks/useGetUser";

export const Timeout = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(10);

	const { logout } = useGetUser();

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1);
				return
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [seconds]);

	useEffect(() => {
		if(minutes === 0 && seconds === 0) {
			console.log('vcall token refresh here')
			logout()
		}
	}, [seconds, minutes])

  return (
    <div>
      {minutes === 0 && seconds === 0 ? (
        <h3>Time is up</h3>
      ) : (
        <h3>
          Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h3>
      )}
    </div>
  );
};
