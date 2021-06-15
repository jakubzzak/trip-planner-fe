import { useEffect, useState } from "react";


const useDimensions = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {

  }, [])

  useEffect(() => {
    const recalculate = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", () => recalculate);
    return () => window.removeEventListener("resize", recalculate);
  }, [])


  return dimensions
}

export default useDimensions