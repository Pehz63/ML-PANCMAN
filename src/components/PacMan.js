import { Button } from "@mui/material";
import "../lib/PacmanCovid/styles/index.scss";
import PacmanCovid from "../lib/PacmanCovid";
import { gameRunningAtom, predictionAtom } from "../GlobalState";
import { useAtom } from "jotai";

<<<<<<< HEAD
export default function PacMan() {
    const [isRunning, setIsRuning] = useAtom(gameRunningAtom);
    const [predictionDirection] = useAtom(predictionAtom);
=======

import React, { useRef } from "react";
import { predictDirection, findSimilarAndCounterfactual } from "../model/index";


export default function PacMan() {
    const [isRunning, setIsRuning] = useAtom(gameRunningAtom);
    const [predictionDirection] = useAtom(predictionAtom);
    const handlePredict = async () => {
        const prediction = await predictDirection(webcamRef, truncatedMobileNet, model, umapEmbeddings);
        console.log("Prediction:", prediction);

        const similarityData = findSimilarAndCounterfactual(umapEmbeddings, umapEmbeddings.length - 1);
        console.log("Similar gestures:", similarityData.similar);
        console.log("Counterfactual gestures:", similarityData.counterfactual);
    };

>>>>>>> d12a36d (Added updated code for UMAP_try branch)

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
<<<<<<< HEAD
                <Button variant="contained" onClick={() => setIsRuning(!isRunning)}>
                    {" "}
                    Start
                </Button>
            )}
        </>
    );
=======
                <><Button variant="contained" onClick={() => setIsRuning(!isRunning)}>
                    {" "}
                    Start
                </Button><button onClick={handlePredict}>Predict Gesture</button></>
            )}
        </>
    );

    
>>>>>>> d12a36d (Added updated code for UMAP_try branch)
}
