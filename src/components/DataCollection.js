import Webcam from "react-webcam";
<<<<<<< HEAD
import { Grid, Button, Box, CircularProgress, Typography } from "@mui/material";
=======
import { Grid, Button, Box } from "@mui/material";
>>>>>>> d12a36d (Added updated code for UMAP_try branch)
import {
    ArrowUpward,
    ArrowDownward,
    ArrowBack,
    ArrowForward,
} from "@mui/icons-material/";
import { useState, useRef } from "react";
import { useAtom } from "jotai";
import {
    imgSrcArrAtom,
    dataSetSizeAtom,
    batchArrayAtom,
    batchSizeAtom,
    gameRunningAtom,
<<<<<<< HEAD
    predictionAtom,
    predictionConfidencesAtom,
=======
>>>>>>> d12a36d (Added updated code for UMAP_try branch)
} from "../GlobalState";

const DIRECTIONS = {
    up: <ArrowUpward />,
    down: <ArrowDownward />,
    left: <ArrowBack />,
    right: <ArrowForward />,
};

<<<<<<< HEAD
=======

import React from "react";
import { processImages } from "../model/index";


>>>>>>> d12a36d (Added updated code for UMAP_try branch)
export default function DataCollection({ webcamRef }) {
    const [isCameraOn, setIsCameraOn] = useState(false);

    // ---- Model Training ----
    const [imgSrcArr, setImgSrcArr] = useAtom(imgSrcArrAtom);

    // ---- Configurations ----
    const [, setBatchSize] = useAtom(batchSizeAtom);
    const [gameRunning] = useAtom(gameRunningAtom);
<<<<<<< HEAD
    const [predictionDirection] = useAtom(predictionAtom);
    const [predictionConfidences] = useAtom(predictionConfidencesAtom);
=======

    const handleProcessData = async () => {
        const { xs, ys, umapEmbeddings } = await processImages(imgSrcArr, truncatedMobileNet);
        console.log("Embeddings generated for UMAP visualization:", umapEmbeddings);
    };
>>>>>>> d12a36d (Added updated code for UMAP_try branch)

    // ---- UI Display ----

    const capture = (direction) => async () => {
        // Capture image from webcam
        const newImageSrc = webcamRef.current.getScreenshot();

        // If image is not null, proceed with adding it to the dataset
        if (newImageSrc) {

            // Add example to the dataset
            const newImageArr = [...imgSrcArr, { src: newImageSrc, label: direction }];
            setImgSrcArr(newImageArr);
            setBatchSize(Math.floor(newImageArr.length * 0.4));
        }
    };

    const cameraPlaceholder = (
        <Box
            display="flex"
            textAlign={"center"}
            justifyContent="center"
            alignItems="center"
            sx={{
                p: 2,
                border: "1px dashed grey",
                height: "224px",
                width: "224px",
                margin: "auto",
                backgroundColor: "#ddd",
            }}
        >
            Camera is off
        </Box>
    );

    return (
        <Grid container>
            {/* first row */}

            <Grid
                item
                xs={12}
                sx={{ marginBottom: 2 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
<<<<<<< HEAD
                <Box textAlign="center"> {/* "STOP CAMERA" button */}
=======
                <Box textAlign="center">
>>>>>>> d12a36d (Added updated code for UMAP_try branch)
                    <Button
                        variant="contained"
                        onClick={() => setIsCameraOn(!isCameraOn)}
                        disabled={gameRunning}
                    >
                        {" "}
                        {isCameraOn ? "Stop" : "Start"} Camera
                    </Button>
                </Box>
<<<<<<< HEAD
                <Box sx={{ marginTop: 1 }}>  {/* live camera feed */}
=======
                <Box sx={{ marginTop: 1 }}>
>>>>>>> d12a36d (Added updated code for UMAP_try branch)
                    {isCameraOn ? (
                        <Webcam
                            mirrored
                            width={224}
                            height={224}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                width: 224,
                                height: 224,
                                facingMode: "user",
                            }}
                        />
                    ) : (
                        cameraPlaceholder
                    )}
                </Box>
            </Grid>

<<<<<<< HEAD
            {Object.keys(DIRECTIONS).map((directionKey, index) => { // array of "ADD TO" direction buttons and preview images
=======
            {Object.keys(DIRECTIONS).map((directionKey) => {
>>>>>>> d12a36d (Added updated code for UMAP_try branch)
                return (
                    <OneDirection
                        key={directionKey}
                        disabled={!isCameraOn}
                        directionIcon={DIRECTIONS[directionKey]}
                        onCapture={capture(directionKey)}
                        dirImgSrcArr={imgSrcArr.filter((d) => d.label == directionKey)}
<<<<<<< HEAD
                        isPrediction={index === predictionDirection ?? false}
                        confidence={predictionConfidences?.[index] ?? 0.0}
=======
>>>>>>> d12a36d (Added updated code for UMAP_try branch)
                    />
                );
            })}
        </Grid>
    );
}

<<<<<<< HEAD
const OneDirection = ({ directionIcon, onCapture, dirImgSrcArr, disabled, isPrediction, confidence }) => {
    return (
        <Grid item xs={3}>
            <Box textAlign="center">
                <CircularProgressWithLabel value={confidence*100} />
            </Box>
            <Box textAlign="center">
                <Button
                    variant={isPrediction ? "contained" : "outlined"}
=======
const OneDirection = ({ directionIcon, onCapture, dirImgSrcArr, disabled }) => {
    return (
        <Grid item xs={3}>
            <Box textAlign="center">
                <Button
                    variant="outlined"
>>>>>>> d12a36d (Added updated code for UMAP_try branch)
                    endIcon={directionIcon}
                    onClick={onCapture}
                    disabled={disabled}
                >
                    {" "}
                    Add to{" "}
                </Button>
            </Box>
            <Box textAlign="center" sx={{ width: "100%", height: "100px" }}>
                {dirImgSrcArr.length > 0 && (
                    <img
                        height={"100%"}
                        src={dirImgSrcArr[dirImgSrcArr.length - 1].src}
                        style={{ padding: "2px" }}
                    />
                )}
            </Box>
        </Grid>
    );
};
<<<<<<< HEAD

const CircularProgressWithLabel = ({ value }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
      }}
    >
      <CircularProgress variant="determinate" value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
=======
>>>>>>> d12a36d (Added updated code for UMAP_try branch)
