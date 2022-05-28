import { motion } from "framer-motion"
import { StaggerChildren, UpDown } from "../lib/Animations"

export const LoadingCercle = ()=>{
    return <motion.div className="loader-container" variants={StaggerChildren(0.2,0)} animate="animate" initial="initial" exit="exit">
        <motion.div className="loading-cercle" variants={UpDown}></motion.div>
        <motion.div className="loading-cercle" variants={UpDown}></motion.div>
        <motion.div className="loading-cercle" variants={UpDown}></motion.div>
        <motion.div className="loading-cercle" variants={UpDown}></motion.div>        
        <motion.div className="loading-cercle" variants={UpDown}></motion.div>
    </motion.div>
}