import { NavLink } from "react-router-dom"
import {memo} from 'react'
import logo from 'src/assets/images/logo-black.png'

const Logo = ({
    imgClass,
    // textClass
}: {
    imgClass?: string,
    textClass?: string
}) => {
    return (
        <NavLink to="/" className="flex items-center">
            <span className={`relative w-[100px] ${imgClass || ""}`}>
                <img src={logo} alt="TicketResel" />
            </span>
        </NavLink>
    );
};

export default memo(Logo)