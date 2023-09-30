import React from "react";
import Grid from "@mui/material/Grid";
import Navbar from "../../components/Navbar";
import Iphone from "./Iphone/Iphone";
import Footer from "../../components/Footer/Footer";
import MenuItems from "../../components/Menu/MenuItems";


export default function Home() {

    return (
        <>
            <div style={{ minHeight: "100vh" }}>

                <Navbar />

                <Grid container direction="row" sx={{ minHeight: "780px" }}>

                    <Grid item xs={12} md={8.5}
                        justifyContent="center"
                        display="flex"
                    // sx={{ backgroundColor: "white" }}
                    >
                        {/* <h1 className={"modelName"}>Iphone </h1> */}

                        {/* <Typography variant="h1" sx={{ writingMode: "vertical-lr", textOrientation: "mixed", transform: "rotate(-180deg)", transformOrigin: "56% 20%", opacity: "49%" }}>Iphone</Typography> */}
                        <div style={{ borderRadius: "18px", backgroundColor: "#f2f2f299", boxShadow: "2px 4px 12px rgba(0, 0, 0, .08)", padding: "6px 60px 20px 60px", margin: "20px" }}>

                            {/* <Ipad /> */}
                            <Iphone />
                        </div>

                    </Grid>

                    <Grid item xs={12} md={3.5} sx={{ borderRadius: "10px 0px 0px 10px", borderStyle: "none none none solid", borderColor: "#C2B8A3", borderWidth: "1px" }}>
                        {/* I want to make this grid scrollable */}
                        <MenuItems />


                    </Grid>
                </Grid>

                <Footer />
            </div>
        </>
    )
}

// backgroundColor: "rgb(194, 184, 163, 0.0)", boxShadow: "-1px 1px 10px #999999",