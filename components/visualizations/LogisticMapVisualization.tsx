"use client";

import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LogisticMapVisualization: React.FC = () => {
  const [r, setR] = useState(3.5);
  const [x0, setX0] = useState(0.5);
  const [iterations, setIterations] = useState(50);
  const [visualizationType, setVisualizationType] = useState('cobweb');
  const svgRef = useRef<SVGSVGElement>(null);
  
  const width = 600;
  const height = 400;
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear previous visualization
    d3.select(svgRef.current).selectAll('*').remove();
    
    const svg = d3.select(svgRef.current);
    
    // Set margins
    const margin = { top: 40, right: 20, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create a group element for the visualization
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Add background
    g.append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'rgba(0, 0, 0, 0.1)')
      .attr('rx', 5);
    
    // Create scales
    let xScale = d3.scaleLinear()
      .domain([0, 1])
      .range([0, innerWidth]);
    
    let yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([innerHeight, 0]);
    
    // Render based on visualization type
    if (visualizationType === 'cobweb') {
      renderCobweb(g, innerWidth, innerHeight, xScale, yScale);
    } else if (visualizationType === 'time') {
      const timeScale = d3.scaleLinear()
        .domain([0, iterations])
        .range([0, innerWidth]);
      renderTimeSeries(g, innerWidth, innerHeight, timeScale, yScale);
    } else if (visualizationType === 'bifurcation') {
      const rScale = d3.scaleLinear()
        .domain([2.5, 4.0])
        .range([0, innerWidth]);
      renderBifurcation(g, innerWidth, innerHeight, rScale, yScale);
      xScale = rScale; // Update for axis
    }
    
    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text, line, path')
      .style('color', 'var(--text-secondary)');
    
    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text, line, path')
      .style('color', 'var(--text-secondary)');
    
    // Add axis labels
    const xLabel = visualizationType === 'time' ? 'Iteration' : 
                   visualizationType === 'bifurcation' ? 'Parameter r' : 'x';
    
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + 45)
      .attr('text-anchor', 'middle')
      .style('fill', 'var(--text-secondary)')
      .text(xLabel);
    
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -innerHeight / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .style('fill', 'var(--text-secondary)')
      .text(visualizationType === 'bifurcation' ? 'x' : 'f(x)');
    
    // Add title
    g.append('text')
      .attr('x', innerWidth / 2)
      .attr('y', -15)
      .attr('text-anchor', 'middle')
      .style('fill', 'var(--text-accent)')
      .style('font-weight', 'bold')
      .text(`Logistic Map (r = ${r.toFixed(2)})`);
    
    function renderCobweb(
      g: d3.Selection<SVGGElement, unknown, null, undefined>, 
      width: number, 
      height: number,
      xScale: d3.ScaleLinear<number, number>,
      yScale: d3.ScaleLinear<number, number>
    ) {
      // Logistic function
      const logistic = (x: number) => r * x * (1 - x);
      
      // Draw the logistic curve
      const curve = d3.line<number>()
        .x(d => xScale(d))
        .y(d => yScale(logistic(d)));
      
      const points = d3.range(0, 1.001, 0.01);
      
      g.append('path')
        .datum(points)
        .attr('fill', 'none')
        .attr('stroke', 'var(--viz-primary)')
        .attr('stroke-width', 2)
        .attr('d', curve);
      
      // Draw the diagonal line (y = x)
      g.append('line')
        .attr('x1', xScale(0))
        .attr('y1', yScale(0))
        .attr('x2', xScale(1))
        .attr('y2', yScale(1))
        .attr('stroke', 'var(--viz-secondary)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '5,5');
      
      // Calculate and draw the cobweb
      const cobwebPoints = [];
      let x = x0;
      
      for (let i = 0; i < Math.min(iterations, 20); i++) {
        const y = logistic(x);
        cobwebPoints.push({ x, y });
        x = y;
      }
      
      // Draw cobweb lines
      for (let i = 0; i < cobwebPoints.length - 1; i++) {
        // Vertical line
        g.append('line')
          .attr('x1', xScale(cobwebPoints[i].x))
          .attr('y1', yScale(cobwebPoints[i].y))
          .attr('x2', xScale(cobwebPoints[i].y))
          .attr('y2', yScale(cobwebPoints[i].y))
          .attr('stroke', 'var(--viz-tertiary)')
          .attr('stroke-width', 1.5);
        
        // Horizontal line
        if (i < cobwebPoints.length - 1) {
          g.append('line')
            .attr('x1', xScale(cobwebPoints[i].y))
            .attr('y1', yScale(cobwebPoints[i].y))
            .attr('x2', xScale(cobwebPoints[i].y))
            .attr('y2', yScale(cobwebPoints[i + 1] ? logistic(cobwebPoints[i].y) : cobwebPoints[i].y))
            .attr('stroke', 'var(--viz-tertiary)')
            .attr('stroke-width', 1.5);
        }
      }
    }
    
    function renderTimeSeries(
      g: d3.Selection<SVGGElement, unknown, null, undefined>, 
      width: number, 
      height: number,
      xScale: d3.ScaleLinear<number, number>,
      yScale: d3.ScaleLinear<number, number>
    ) {
      // Logistic function
      const logistic = (x: number) => r * x * (1 - x);
      
      // Calculate time series
      const timeSeriesPoints = [];
      let x = x0;
      
      for (let i = 0; i < iterations; i++) {
        timeSeriesPoints.push({ i, x });
        x = logistic(x);
      }
      
      // Create line generator
      const line = d3.line<{ i: number; x: number }>()
        .x(d => xScale(d.i))
        .y(d => yScale(d.x));
      
      // Add the line path
      g.append('path')
        .datum(timeSeriesPoints)
        .attr('fill', 'none')
        .attr('stroke', 'var(--viz-primary)')
        .attr('stroke-width', 2)
        .attr('d', line);
      
      // Add points
      g.selectAll('.time-point')
        .data(timeSeriesPoints)
        .enter()
        .append('circle')
        .attr('class', 'time-point')
        .attr('cx', d => xScale(d.i))
        .attr('cy', d => yScale(d.x))
        .attr('r', 2)
        .attr('fill', 'var(--viz-point)');
    }
    
    function renderBifurcation(
      g: d3.Selection<SVGGElement, unknown, null, undefined>, 
      width: number, 
      height: number,
      xScale: d3.ScaleLinear<number, number>,
      yScale: d3.ScaleLinear<number, number>
    ) {
      // For each r value, calculate the attractor
      const rValues = d3.range(2.5, 4.001, 0.01);
      const bifurcationPoints = [];
      
      for (const rVal of rValues) {
        // Logistic function for this r value
        const logistic = (x: number) => rVal * x * (1 - x);
        
        // Calculate the attractor
        let x = 0.5;
        
        // Discard transient
        for (let i = 0; i < 100; i++) {
          x = logistic(x);
        }
        
        // Collect attractor points
        for (let i = 0; i < 20; i++) {
          x = logistic(x);
          bifurcationPoints.push({ r: rVal, x });
        }
      }
      
      // Add points
      g.selectAll('.bifurcation-point')
        .data(bifurcationPoints)
        .enter()
        .append('circle')
        .attr('class', 'bifurcation-point')
        .attr('cx', d => xScale(d.r))
        .attr('cy', d => yScale(d.x))
        .attr('r', 0.5)
        .attr('fill', 'var(--viz-point)')
        .attr('opacity', 0.7);
      
      // Add current r value line
      g.append('line')
        .attr('x1', xScale(r))
        .attr('y1', 0)
        .attr('x2', xScale(r))
        .attr('y2', height)
        .attr('stroke', 'var(--viz-accent)')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');
    }
    
  }, [r, x0, iterations, visualizationType]);
  
  return (
    <div className="logistic-map-visualization p-6">
      {/* Controls */}
      <div className="controls mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            Parameter r: {r.toFixed(3)}
          </label>
          <input
            type="range"
            min="2.5"
            max="4"
            step="0.01"
            value={r}
            onChange={(e) => setR(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            Initial Value x₀: {x0.toFixed(3)}
          </label>
          <input
            type="range"
            min="0.01"
            max="0.99"
            step="0.01"
            value={x0}
            onChange={(e) => setX0(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            Iterations: {iterations}
          </label>
          <input
            type="range"
            min="10"
            max="200"
            step="5"
            value={iterations}
            onChange={(e) => setIterations(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            Visualization Type
          </label>
          <select
            value={visualizationType}
            onChange={(e) => setVisualizationType(e.target.value)}
            className="w-full px-3 py-2 rounded"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-primary)',
              color: 'var(--text-primary)'
            }}
          >
            <option value="cobweb">Cobweb Plot</option>
            <option value="time">Time Series</option>
            <option value="bifurcation">Bifurcation Diagram</option>
          </select>
        </div>
      </div>
      
      {/* Visualization */}
      <div className="visualization-wrapper flex justify-center">
        <svg 
          ref={svgRef} 
          width={width} 
          height={height} 
          className="border rounded-lg"
          style={{ borderColor: 'var(--border-primary)' }}
        />
      </div>
    </div>
  );
};

export default LogisticMapVisualization;