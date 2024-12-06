import { UMAP } from "umap-js";
import * as d3 from "d3";
import { useState, useEffect } from "react";

export default function UMAPVisualization({ data, labels }) {
    const width = 450, height = 450, margin = 25;

    const [embeddings, setEmbeddings] = useState([]);
    const [clusterCentroids, setClusterCentroids] = useState({}); // To store cluster centroids

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

    const computeCentroids = (embedding, labels) => {
        // Group points by labels and compute the centroids
        const clusters = {};
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

        return centroids;
    };

    useEffect(() => {
        const computeUMAP = async () => {
            console.log("Data for UMAP:", data);  // Log data
            console.log("Labels:", labels);       // Log labels
            const umap = new UMAP({ nComponents: 2, nNeighbors: 15, minDist: 0.2 });
            const embedding = await umap.fitAsync(data);
            console.log("Embedding:", embedding); // Log embeddings

            const normalized = normalizeEmbedding(embedding);
            setEmbeddings(normalized);

            // Compute cluster centroids
            const centroids = computeCentroids(normalized, labels);
            setClusterCentroids(centroids);
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
                    r={5}
                    fill={colorScale(labels[i])}
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
                    {label}
                </text>
            ))}
        </svg>
    );
}
