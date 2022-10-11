import { useState, useEffect } from 'react';
import { EspToWsg } from "./EpsToWgs";
import { getFlatternDistance } from "./LonLatTransform";

const useLocation = (initalValue) => {
  const [into, setInto] = useState(initalValue);
  const [locations, setLocations] = useState(false);
  const [status, setStatus] = useState(false);
  const [statusMsg, setStatusMsg] = useState(false);

  const reset = () => {
    setInto(initalValue);
    setLocations(false);
    setStatus(false);
    setStatusMsg(false);
  };

  const handleIntoChange = (e) => {
    setInto(e);
  };

  const handleLocationChange = e => {
    setLocations(e);
  }

  useEffect(() => {
    if (into) {
      let result = EspToWsg(into.wkt);

      let count = getFlatternDistance(
        locations["lat"],
        locations["lon"],
        result[1],
        result[0]
      );
      setStatusMsg(false);
      if (count >= 400 && count <= 430 && status !== 4) {
        setStatus(4);
        setStatusMsg("400公尺內");
      }
      if (count >= 300 && count <= 330 && status !== 3) {
        setStatus(3);
        setStatusMsg("300公尺內");
      }
      if (count >= 200 && count <= 230 && status !== 2) {
        setStatus(2);
        setStatusMsg("200公尺內");
      }
      if (count >= 100 && count <= 130 && status !== 1) {
        setStatus(1);
        setStatusMsg("100公尺內");
      }
      if (count >= 0 && count <= 31 && status !== 0) {
        setStatus(0);
        setStatusMsg("警告解除");
      }
    }
  }, [locations, status]);

  useEffect(() => {
    if (status == 0) {
      // setInto(initalValue);
      reset();
    }
  }, [status]);

  return { into, statusMsg, handleIntoChange, handleLocationChange };
};

export default useLocation;