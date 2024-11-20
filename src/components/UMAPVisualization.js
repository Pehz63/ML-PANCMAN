import React, { useEffect, useRef } from "react";
import { UMAP } from "umap-js";
import * as d3 from "d3";
import { Box, Typography } from "@mui/material";

const UMAPVisualization = ({ embeddings }) => {
    const svgRef = useRef(null);
    const width = 400, height = 400;

    useEffect(() => {
        if (!embeddings || embeddings.length === 0) return;

        // Initialize UMAP
        const nNeighbors = Math.min(dummyEmbeddings.length - 1, 15); // Ensure it's always valid
        const umap = new UMAP({ nComponents: 2, nNeighbors, minDist: 0.1 });
        const reducedData = umap.fit(embeddings);

        // Normalize UMAP output
        const xExtent = d3.extent(reducedData, (d) => d[0]);
        const yExtent = d3.extent(reducedData, (d) => d[1]);
        const xScale = d3.scaleLinear().domain(xExtent).range([50, width - 50]);
        const yScale = d3.scaleLinear().domain(yExtent).range([50, height - 50]);

        // Clear previous visualizations
        d3.select(svgRef.current).selectAll("*").remove();

        // Create scatter plot
        const svg = d3.select(svgRef.current);
        svg.selectAll("circle")
            .data(reducedData)
            .enter()
            .append("circle")
            .attr("cx", (d) => xScale(d[0]))
            .attr("cy", (d) => yScale(d[1]))
            .attr("r", 5)
            .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

        svg.selectAll("text")
            .data(reducedData)
            .enter()
            .append("text")
            .attr("x", (d) => xScale(d[0]) + 5)
            .attr("y", (d) => yScale(d[1]) - 5)
            .text((d, i) => `Point ${i + 1}`)
            .attr("font-size", 10)
            .attr("fill", "black");
    }, [embeddings]);

    return (
        <Box>
            <Typography variant="h6" textAlign="center">UMAP Visualization</Typography>
            <svg ref={svgRef} width={width} height={height} style={{ border: "1px solid #ccc" }}></svg>
        </Box>
    );
};

export default UMAPVisualization;

export const dummyEmbeddings = [
    [0.1, 0.3, 0.7, 0.5, 0.9],
    [0.2, 0.4, 0.6, 0.5, 0.8],
    [0.3, 0.5, 0.6, 0.7, 0.7],
    [0.4, 0.2, 0.9, 0.1, 0.6],
    [0.6, 0.8, 0.5, 0.3, 0.4],
    [0.7, 0.9, 0.4, 0.5, 0.8],
    [0.8, 0.6, 0.3, 0.2, 0.7],
    [0.9, 0.4, 0.7, 0.1, 0.5],
    [0.5, 0.7, 0.6, 0.8, 0.9],
    [0.2, 0.3, 0.5, 0.7, 0.4],
    [0.4, 0.1, 0.8, 0.6, 0.2],
    [0.3, 0.9, 0.4, 0.5, 0.8],
    [0.1, 0.6, 0.7, 0.2, 0.3],
    [0.5, 0.4, 0.3, 0.9, 0.6],
    [0.7, 0.2, 0.5, 0.8, 0.4],
];

