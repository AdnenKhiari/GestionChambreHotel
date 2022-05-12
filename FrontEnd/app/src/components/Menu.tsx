import {Link} from "react-router-dom"
import React from "react"
import {StaggerChildren,Slide} from "../lib/Animations"
import {AnimatePresence, motion} from "framer-motion"
import ROUTES from "../constants/Routes"


interface ITmenuItem  { 
    item : string,
    imgSrc? : string,
    link? : string,
    subitem? : ITmenuItem[]
}
const QuickAccess : ITmenuItem[] =  [
    {
        item:"Show Bookings",
        imgSrc:"/icons/BELL.svg",
        link: ROUTES.BOOKING.SHOW
    } ,
    {
        item:"Book Rooms",
        imgSrc:"/icons/BOOKING.svg"

    },
    {
        item:"Show Clients",
        imgSrc:"/icons/USER.svg",
        link: ROUTES.CLIENTS.SHOW

    },
    {
        item:"Show Rooms",
        imgSrc:"/icons/HOME.svg",
        link: ROUTES.ROOMS.SHOW

    } ,
    {
        item:"Show Offers",
        imgSrc:"/icons/OFFER.svg",
        link: ROUTES.OFFERS.SHOW
    } 
]
const AllOptions: ITmenuItem[] =  [
    {
        item:"Clients",
        imgSrc:"/icons/ARROW.svg",
        subitem : [
            {
                item:"Add A Client",
                link: ROUTES.CLIENTS.ADD
            },
            {
                item:"Modify A Client",
                link: ROUTES.CLIENTS.MOD
            },
            {
                item:"Delete A Client",
                link: ROUTES.CLIENTS.DEL
            }
        ]
    } ,
    {
        item:"Bookings",
        imgSrc:"/icons/ARROW.svg",
        subitem : [
            {
                item:"Add A Booking",
                link: ROUTES.BOOKING.ADD
            },
            {
                item:"Modify A Booking",
                link: ROUTES.BOOKING.MOD
            },
            {
                item:"Delete A Booking",
                link: ROUTES.BOOKING.DEL
            }
        ]
    },
    {
        item:"Offers",
        imgSrc:"/icons/ARROW.svg",
        subitem : [
            {
                item:"Add An Offer",
                link: ROUTES.OFFERS.ADD
            },
            {
                item:"Modify An Offer",
                link: ROUTES.OFFERS.MOD
            },
            {
                item:"Delete An Offer",
                link: ROUTES.OFFERS.DEL
            }
        ]
    },
    {
        item:"Rooms",
        imgSrc:"/icons/ARROW.svg",
        subitem : [
            {
                item:"Add A Room",
                link: ROUTES.ROOMS.ADD
            },
            {
                item:"Modify A Room",
                link: ROUTES.ROOMS.MOD
            },
            {
                item:"Delete A Room",
                link: ROUTES.ROOMS.DEL
            }
        ]
    } ,
]
const Menu = ()=>{
    return <div className="nav-menu-container">
        <img  className="logo" src="/img/logo.png" alt="" /> 
        <nav>
            <hr />
            <p className="menu-title">Quick Access</p>
            <ul>
            {QuickAccess.map((element,index) => {
                return < MenuItem key={index} imgSrc={element.imgSrc ? element.imgSrc : null } itemTitle={element.item} children = {element.subitem} link={element.link} />
            })}
            </ul>
            <hr />
            <p className="menu-title">Customize</p>
            <ul>
            {AllOptions.map((element,index) => {
                return < MenuItem   key={index} imgSrc={element.imgSrc ? element.imgSrc : null } itemTitle={element.item} children = {element.subitem} link={element.link} />
            })}
            </ul>
        </nav>
    </div>
}
interface ITmenuItemParams  { 
    imgSrc : string | null,
    itemTitle : string,
    children? : ITmenuItem[],
    link: string | undefined
}
const MenuItem = ({imgSrc ,itemTitle,children,link } : ITmenuItemParams)=>{
    const [subItem,setSubItem] = React.useState(false);
    return <li className = "menu-item " >
    <span className={"menu-item-header " + (subItem && children ? "expanded " : "")} onClick={(e)=>setSubItem(!subItem)}>{imgSrc && <img src={imgSrc} alt="" />} 
    {(link && <Link to={link} > <span className="item-title">{itemTitle}</span></Link>) || <span className="item-title">{itemTitle}</span>} 
    </span>
    {children && subItem && <div className="menu-sub-item">
        <AnimatePresence>
        <motion.ul animate="animate" exit="exit" initial="initial" variants={StaggerChildren(0.3,0)}>
            {children && children.map((c)=>{
                return <motion.li variants={Slide} ><Link to={(c.link!==undefined) ? c.link : ""}>{c.item}</Link></motion.li>
            })}
        </motion.ul>
        </AnimatePresence>
    </div>
    }
    </li>
}
export default  Menu