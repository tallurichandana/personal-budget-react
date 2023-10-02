import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';
import * as d3 from "d3";
import { pie, arc } from "d3-shape";

function HomePage() {
    const canvasRef = useRef(null);
    const svgRef = useRef(null);
    const [data, setData] = useState([]); // Store data in a state variable

    useEffect(() => {
        // Fetch budget data
        axios.get("/budg-data.json")
            .then(function (res) {
                setData(res.data.myBudget);
                createChart(res.data.myBudget);
                createD3Chart(res.data.myBudget);
            })
            .catch(function (error) {
                console.error("Error fetching budget data: ", error);
            });
    }, []);

    function createChart(budgetData) {
        const dataSource = {
            datasets: [
                {
                    data: budgetData.map(item => item.budget),
                    backgroundColor: [
                        '#ffcd56',
                        '#ff6384',
                        '#36a2eb',
                        '#fd6b19',
                        '#ff5733',
                        '#4caf50',
                        '#9c27b0',
                    ],
                },
            ],
            labels: budgetData.map(item => item.title),
        };

        var ctx = canvasRef.current.getContext("2d");
        var myPieChart = new Chart(ctx, {
            type: "pie",
            data: dataSource,
        });
    }

    function createD3Chart(budgetData) {
        const svg = d3.select(svgRef.current);

        const width = 900;
        const height = 900;
        const radius = Math.min(width, height) / 2;

        svg.attr("width", width).attr("height", height);

        const centerX = width / 2;
        const centerY = height / 2;

        const g = svg.append("g").attr("transform", `translate(${centerX},${centerY})`);

        const color = d3
            .scaleOrdinal()
            .domain(budgetData.map((d) => d.title))
            .range(["#ccff66", "#ff0066", "#00ff00", "#6600ff", "#003300", "#ff0000", "#ff8c00"]);

        const pieGenerator = pie().value((d) => d.budget);

        const pathGenerator = arc()
            .outerRadius(radius * 0.6)
            .innerRadius(radius * 0.3);

        const arcs = pieGenerator(budgetData);

        const arcPaths = g
            .selectAll("path")
            .data(arcs)
            .enter()
            .append("path")
            .attr("d", pathGenerator)
            .attr("fill", (d) => color(d.data.title))
            .attr("stroke", "white")
            .style("stroke-width", "2px");

        g.attr("transform", `translate(${width / 2},${height / 2})`);
    }

    return (
<div class="container center">

<div class="page-area">

    <div class="text-box">
        <h1>Stay on track</h1>
        <p>
            Do you know where you are spending your money? If you really stop to track it down,
            you would get surprised! Proper budget management depends on real data... and this
            app will help you with that!
        </p>
    </div>

    <div class="text-box">
        <h1>Alerts</h1>
        <p>
            What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
        </p>
    </div>

    <div class="text-box">
        <h1>Results</h1>
        <p>
            People who stick to a financial plan, budgeting every expense, get out of debt faster!
            Also, they to live happier lives... since they expend without guilt or fear... 
            because they know it is all good and accounted for.
        </p>
    </div>

    <div class="text-box">
        <h1>Free</h1>
        <p>
            This app is free!!! And you are the only one holding your data!
        </p>
    </div>

    <div class="text-box">
        <h1>Stay on track</h1>
        <p>
            Do you know where you are spending your money? If you really stop to track it down,
            you would get surprised! Proper budget management depends on real data... and this
            app will help you with that!
        </p>
    </div>

    <div class="text-box">
        <h1>Alerts</h1>
        <p>
            What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
        </p>
    </div>

    <header class="text-box">
        <h1>Results</h1>
        <p>
            People who stick to a financial plan, budgeting every expense, get out of debt faster!
            Also, they to live happier lives... since they expend without guilt or fear... 
            because they know it is all good and accounted for.
        </p>
    </header>

    <header class="text-box">
        <h1>Free</h1>
        <p>
            This app is free!!! And you are the only one holding your data!
        </p>
    </header>
    <div class="text-box">
        <h1>Chart</h1>
        <p>
        <canvas ref={canvasRef} width="400" height="400"></canvas>
        </p>
        
    </div>

</div>
<div class="chandana" id="this">
<h1>D3JS chart</h1>
                    <svg ref={svgRef} width={900} height={900}></svg>
</div>

</div>
    );
}

export default HomePage;