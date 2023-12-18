import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SettingCSS from "./DisplaySettings.module.css"
import GridSizing from "./GridSizing/GridSizing";
import DaysSelection from "../../Inputs/DaysSelection/DaysSelection";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { DaysRange } from "../../../../interfaces/settingsInterfaces";
import Alert from "@mui/material/Alert"
import { settingsActions } from "../../../../store/settings-slice";
import { RootState, useDispatch } from "../../../../store/index"
import { getTimetable } from "../../../../store/timetable-action";
import Widgets from "./Widgets/Widgets";
import { getPages } from "../../../../store/pages-action";
// import { useCollapseContext } from "../../../context/collapseContext";


export default function Settings() {
    const dispatch = useDispatch();
    const device = useSelector((state: RootState) => state.settings.device)
    const daysRange = useSelector((state: RootState) => state.settings.daysRange)
    const courseGridWidth = useSelector((state: RootState) => state.settings.courseGridWidth)
    const courseGridHeight = useSelector((state: RootState) => state.settings.courseGridHeight)
    const widgets = useSelector((state: RootState) => state.settings.widgets)
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        dispatch(settingsActions.fetchSettings(device))
    }, [dispatch, device])

    function handleDaysChange(name: string, value: DaysRange) {
        dispatch(settingsActions.setDaysRange(value))
    }

    const handleCourseGridWidthChange = useCallback((value: number) => {
        dispatch(settingsActions.setCourseGridWidth(value))
    }, [dispatch])

    const handleCourseGridHeightChange = useCallback((value: number) => {
        dispatch(settingsActions.setCourseGridHeight(value))
    }, [dispatch])


    function handleWidgetsChange(value: boolean) {
        dispatch(settingsActions.setWidgets(value))
    }

    function resetToDefault() {
        dispatch(settingsActions.resetToDefault())
    }

    function onSubmit() {
        dispatch(settingsActions.sendSettings())
        dispatch(getPages())
        dispatch(getTimetable())
        // setCollapse(true)
    }

    return (
        <>
            <div className="center menuItemContainer" data-testid="setting">
                {errorMessage && <Alert severity="error" onClose={() => { setErrorMessage("") }}>{errorMessage}</Alert>}
                <DaysSelection days={daysRange} handleChange={handleDaysChange} />

                <table className={SettingCSS.table}>
                    <tbody>

                        <tr>
                            <th>
                                <Typography variant="body1">Grid Width: </Typography>
                            </th>
                            <td>

                                <GridSizing title={"Course Grid Width"} value={courseGridWidth} handleChange={handleCourseGridWidthChange} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Typography variant="body1">Grid Height: </Typography>
                            </th>
                            <td>
                                <GridSizing title={"Course Grid Height"} value={courseGridHeight} handleChange={handleCourseGridHeightChange} />

                            </td>
                        </tr>

                        {
                            device === "iphone" &&
                            <tr>
                                <th>
                                    <Typography variant="body1">Widgets: </Typography>
                                </th>
                                <td>

                                    <Widgets value={widgets} handleChange={handleWidgetsChange} />
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>


                <Button variant="outlined" color="info" onClick={resetToDefault} sx={{ margin: '4px' }}>Reset to default</Button>

                <Button type="submit" variant="outlined" color="info" onClick={onSubmit} sx={{ margin: '4px' }}>Update</Button>
            </div>
        </>
    )
}