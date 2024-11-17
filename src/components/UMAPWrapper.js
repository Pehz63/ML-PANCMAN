import React, { useEffect, useState } from "react";
import UMAPVisualization from "./UMAPViz";
import { processImagesForUMAP } from "../model";

export default function UMAPWrapper({ imgSrcArr, truncatedMobileNet }) {
    const [embeddingsList, setEmbeddingsList] = useState([]);
    const [labelsList, setLabelsList] = useState([]);

    useEffect(() => {
        const fetchUMAPData = async () => {
            const { embeddingsList, labelsList } = await processImagesForUMAP(imgSrcArr, truncatedMobileNet);
            setEmbeddingsList(embeddingsList);
            setLabelsList(labelsList);
        };

        fetchUMAPData();
    }, [imgSrcArr, truncatedMobileNet]);  // Runs whenever imgSrcArr or truncatedMobileNet changes

    if (embeddingsList.length === 0 || labelsList.length === 0) {
        return <div>Loading UMAP visualization...</div>;
    }

    return <UMAPVisualization data={embeddingsList} labels={labelsList} />;
}
