import react from "react";
import IpadImg from '../../../assets/ipad-pro-13.png'
import IpadCSS from './ipad.module.css'
import Timetable from "../../../components/Timetable/Timetable";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

export default function Ipad() {
    const backgroundColor = useSelector((state: RootState) => state.settings.backgroundColor)
    return (
        <>
            <div className={`${IpadCSS.background} ${IpadCSS.center}`} style={{ backgroundColor: backgroundColor }}>

                <img className={IpadCSS.ipadImg} src={IpadImg} alt="iphone" />
                <Timetable />
            </div>
        </>
    )
}