import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { Navigation } from "./Navigation";
import { MenuToggle } from "./MenuToggle";
import useDimensions from "./useDimensions";
import './Sidebar.css'


const state = {
  open: (height = 1000) => ({
    clipPath: `circle(${ height * 2 + 200 }px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(20px at 32px 30px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
}

const Sidebar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav initial={ false }
                className={'sidebar nav'}
                animate={ isOpen ? "open" : "closed" }
                custom={ height }
                ref={ containerRef }
    >
      <motion.div className={ "sidebar background" } variants={ state }/>
      <Navigation/>
      <MenuToggle toggle={ () => toggleOpen() }/>
    </motion.nav>
  )
}

export default Sidebar