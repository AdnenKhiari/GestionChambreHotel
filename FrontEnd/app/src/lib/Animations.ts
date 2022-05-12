import {Variant,Variants} from "framer-motion"

export const StaggerChildren  = (i : number,d : number) : Variants =>{return {
    animate : {
        transition : {
            staggerChildren: i,
            delayChildren: d
        }
    }
}}

export const Slide : Variants = {
    initial : {
        x: -1000
    },
    animate : {
        x: 0,
        transition : {
            type: "spring",
            velocity: 10,
            damping: 20,
            mass: 1
        }
    },
    exit : {
        x: -1000
    }
}

