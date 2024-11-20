import { Button } from "@mui/material";
import "../lib/PacmanCovid/styles/index.scss";
import PacmanCovid from "../lib/PacmanCovid";
import { gameRunningAtom, predictionAtom } from "../GlobalState";
import { useAtom } from "jotai";


import React, { useState } from "react";
import { dummyEmbeddings } from "./UMAPVisualization";
import UMAPVisualization from "./UMAPVisualization";
import { Box, Grid } from "@mui/material";



const ConfidenceHeatmap = ({ confidenceData }) => {
    return (
        <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            zIndex="10"
            bgcolor="rgba(0, 0, 0, 0.5)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="white"
            fontSize="18px"
        >
            {confidenceData
                ? `Confidence: ${Math.round(confidenceData * 100)}%`
                : "Loading Confidence..."}
        </Box>
    );
};

/*export default function PacMan() {
    const [isRunning, setIsRuning] = useAtom(gameRunningAtom);
    const [predictionDirection] = useAtom(predictionAtom);

    const pacManProps = {
        gridSize: 17,
        animate: process.env.NODE_ENV !== "development",
        locale: "pt",
        onEnd: () => {
            console.log("onEnd");
        },
    };

    return (
        <>
            <PacmanCovid
                {...pacManProps}
                isRunning={isRunning}
                setIsRuning={setIsRuning}
                predictions={predictionDirection}
            />
            {!isRunning && (
                <Button variant="contained" onClick={() => setIsRuning(!isRunning)}>
                    {" "}
                    Start
                </Button>
            )}
        </>
    );
} */

export default function PacMan() {
    const [isRunning, setIsRuning] = useAtom(gameRunningAtom); // Game running state
    const [predictionDirection] = useAtom(predictionAtom); // Predictions
    const [embeddings] = useState(dummyEmbeddings); // Dummy embeddings for UMAP visualization

    const pacManProps = {
        gridSize: 17,
        animate: process.env.NODE_ENV !== "development",
        locale: "pt",
        onEnd: () => {
            console.log("onEnd");
        },
    };

    return (
        <Grid container spacing={2}>
            {/* Game Section */}
            <Grid item xs={6}>
                <Box textAlign="center" border={1}>
                    <PacmanCovid
                        {...pacManProps}
                        isRunning={isRunning}
                        setIsRuning={setIsRuning}
                        predictions={predictionDirection}
                    />
                    {!isRunning && (
                        <Button
                            variant="contained"
                            onClick={() => setIsRuning(!isRunning)}
                            style={{ marginTop: "10px" }}
                        >
                            Start
                        </Button>
                    )}
                </Box>
            </Grid>

             {/* UMAP Visualization Section  */}
            <Grid item xs={6}>
                <UMAPVisualization embeddings={embeddings} />
            </Grid>
        </Grid>
    );
} 


/*export default function PacMan() {
    const [isRunning, setIsRuning] = useAtom(gameRunningAtom); // Game running state
    const [predictionDirection] = useAtom(predictionAtom); // Predictions
    const [embeddings] = useState(dummyEmbeddings); // Dummy embeddings for UMAP visualization

    const pacManProps = {
        gridSize: 17,
        animate: process.env.NODE_ENV !== "development",
        locale: "pt",
        onEnd: () => {
            console.log("onEnd");
        },
    };

    return (
        <Box>
            {// Game Section //}
            <Box textAlign="center" border={1} p={2}>
                <PacmanCovid
                    {...pacManProps}
                    isRunning={isRunning}
                    setIsRuning={setIsRuning}
                    predictions={predictionDirection}
                />
                {!isRunning && (
                    <Button
                        variant="contained"
                        onClick={() => setIsRuning(!isRunning)}
                        style={{ marginTop: "10px" }}
                    >
                        Start Game
                    </Button>
                )}
            </Box>

            {// UMAP Visualization Section //}
            <Box mt={4}>
                <Typography variant="h6" textAlign="center">
                    UMAP Visualization
                </Typography>
                <UMAPVisualization embeddings={embeddings} />
            </Box>
        </Box>
    );
} */
