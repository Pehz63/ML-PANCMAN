import { UMAP } from "umap-js";
import * as d3 from "d3";
import { useState, useEffect } from "react";

export default function UMAPVisualization({ data, labels }) {
    const width = 450, height = 450, margin = 25;

    const [embeddings, setEmbeddings] = useState([]);

    const normalizeEmbedding = (embedding) => {
        const xValues = embedding.map(d => d[0]);
        const yValues = embedding.map(d => d[1]);

        const xMin = Math.min(...xValues);
        const xMax = Math.max(...xValues);
        const yMin = Math.min(...yValues);
        const yMax = Math.max(...yValues);

        return embedding.map(([x, y]) => [
            2 * (x - xMin) / (xMax - xMin) - 1,
            2 * (y - yMin) / (yMax - yMin) - 1
        ]);
    };

    const xScale = d3.scaleLinear().domain([-1, 1]).range([margin, width - margin]);
    const yScale = d3.scaleLinear().domain([-1, 1]).range([margin, height - margin]);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    useEffect(() => {
        const computeUMAP = async () => {
            console.log("Data for UMAP:", data);  // Log data
            console.log("Labels:", labels);       // Log labels
            const umap = new UMAP({ nComponents: 2, nNeighbors: 15, minDist: 0.2 });
            const embedding = await umap.fitAsync(data);
            console.log("Embedding:", embedding); // Log embeddings
            setEmbeddings(normalizeEmbedding(embedding));
        };
        computeUMAP();
    }, [data]);

    return (
        <svg width={width} height={height}>
            <rect x={0} y={0} width={width} height={height} fill="white" stroke="black" />
            {embeddings.map(([x, y], i) => (
                <circle
                    key={i}
                    cx={xScale(x)}
                    cy={yScale(y)}
                    r={5}
                    fill={colorScale(labels[i])}
                />
            ))}
        </svg>
    );
}
