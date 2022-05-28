import {Variants} from "framer-motion"

export const StaggerChildren  = (i : number = 0.3,d : number = 0) : Variants =>{return {
    animate : {
        transition : {
            staggerChildren: i,
            delayChildren: d
        }
    }
}}
export const scale = {
    initial : {
        transform: "scale(0)"
    },
    animate : {
        when: "afterChildren",
        transform: "scale(1)",
        transition: {
            type: "tween",
        }
    }
}
export const FadeInScale : Variants = {
    initial : {
        opacity: 0,
        scale:0
    },
    animate : {
        opacity: 1,
        scale:1,
        transition: {
           type: "tween" 
        },
        speed: "1s"
    }
}
export const FadeInTrans : Variants = {
    initial : {
        x: -50,
        y:-50,
        opacity: 0
    },
    animate : {
        x:0,
        y:0,
        opacity: 1,
        transition: {
           type: "tween" 
        },
        speed: "2s"
    }
}
export const Slide : Variants = {
    initial : {
        x: -2000
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

