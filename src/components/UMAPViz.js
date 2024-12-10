import { UMAP } from "umap-js";
import * as d3 from "d3";
import { useState, useEffect } from "react";

export default function UMAPVisualization({ data, labels }) {
    const width = 450, height = 450, margin = 25;

    const [embeddings, setEmbeddings] = useState([]);
    const [clusterCentroids, setClusterCentroids] = useState({});
    const [confidences, setConfidences] = useState([]); // State to store confidence scores

    // Normalize embedding to range [-1, 1]
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
    const labdir=["UP","DOWN","LEFT","RIGHT"];
    // Compute cluster centroids and confidence scores
    const computeCentroidsAndConfidences = (embedding, labels) => {
        const clusters = {};
        const confidences = [];

        // Group points by labels
        embedding.forEach(([x, y], i) => {
            const label = labels[i];
            if (!clusters[label]) clusters[label] = [];
            clusters[label].push([x, y]);
        });

        const centroids = {};
        Object.keys(clusters).forEach(label => {
            const points = clusters[label];
            const xMean = points.reduce((sum, [x]) => sum + x, 0) / points.length;
            const yMean = points.reduce((sum, [, y]) => sum + y, 0) / points.length;
            centroids[label] = [xMean, yMean];
        });

        // Compute confidence scores (distance from centroid)
        embedding.forEach(([x, y], i) => {
            const label = labels[i];
            const [cx, cy] = centroids[label];
            const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
            confidences.push(1 / (1 + distance)); // Convert distance to confidence (inverse relation)
        });

        return { centroids, confidences };
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

            const normalized = normalizeEmbedding(embedding);
            const { centroids, confidences } = computeCentroidsAndConfidences(normalized, labels);

            setEmbeddings(normalized);
            setClusterCentroids(centroids);
            setConfidences(confidences);
        };
        computeUMAP();
    }, [data]);

    return (
        <svg width={width} height={height}>
            <rect x={0} y={0} width={width} height={height} fill="white" stroke="black" />

            {/* Render Data Points */}
            {embeddings.map(([x, y], i) => (
                <circle
                    key={i}
                    cx={xScale(x)}
                    cy={yScale(y)}
                    r={5 * confidences[i]} // Adjust size based on confidence
                    fill={colorScale(labels[i])}
                    opacity={confidences[i]} // Adjust opacity based on confidence
                />
            ))}

            {/* Render Cluster Labels */}
            {Object.entries(clusterCentroids).map(([label, [x, y]]) => (
                <text
                    key={label}
                    x={xScale(x)}
                    y={yScale(y)}
                    fontSize="12"
                    fontWeight="bold"
                    fill="black"
                    textAnchor="middle"
                >
                    {labdir[label]}
                </text>
            ))}
        </svg>
    );
}
