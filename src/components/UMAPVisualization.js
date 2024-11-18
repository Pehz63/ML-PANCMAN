import React from "react";
import { Scatter } from "react-chartjs-2";

const UMAPVisualization = ({ embeddings, labels }) => {
    if (!embeddings || !labels) {
        return <div>Loading UMAP visualization...</div>;
    }

    const data = {
        datasets: labels.map((label, index) => ({
            label,
            data: [
                {
                    x: embeddings[index][0],
                    y: embeddings[index][1],
                },
            ],
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255
                }, 0.6)`,
        })),
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: { type: "linear", position: "bottom" },
            y: { type: "linear" },
        },
    };

    return <Scatter data={data} options={options} />;
};

export default UMAPVisualization;

