import React, { useEffect, useRef, useState } from 'react';
import { CChart } from '@coreui/react-chartjs';
import { CButton, CButtonGroup } from '@coreui/react';
import { grabData } from '../mocks/snowboard-grabs';

const grabs = grabData.sort((a, b) => b.rating - a.rating);

const difficultyColors = {
  'EASY': '#5bd4a8',           // success
  'INTERMEDIATE': '#63c2f8',   // info
  'DIFFICULT': '#b476eb',      // warning
  'DAMN NEAR IMPOSSIBLE': '#e55353',  // danger
  'OFF-LIMITS': '#db558d',      // secondary
};

const GrabRatings = () => {
  const chartRef = useRef(null);
  const [selectedDifficulties, setSelectedDifficulties] = useState(Object.keys(difficultyColors));

  // Filter the grabs based on selected difficulties
  const filteredGrabs = grabs.filter(grab => selectedDifficulties.includes(grab.difficulty));

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties(prev => {
      if (prev.includes(difficulty)) {
        // Don't allow deselecting if it's the last selected filter
        if (prev.length === 1) return prev;
        return prev.filter(d => d !== difficulty);
      }
      return [...prev, difficulty];
    });
  };

  useEffect(() => {
    // Add CSS to style the CoreUI tooltip
    const style = document.createElement('style');
    style.textContent = `
      .chartjs-tooltip {
        position: absolute !important;
        background: rgb(36, 32, 46) !important;
        width: 180px !important;
        margin: auto !important;
        padding: 2rem !important;
        border-radius: 2rem !important;
        color: white !important;
        pointer-events: none !important;
        z-index: 1000 !important;
        backdrop-filter: blur(8px) !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        font-family: 'Plus Jakarta Sans', sans-serif !important;
        transition: all .1s ease !important;
      }

      .chartjs-tooltip table {
        margin: 0 !important;
      }

      .difficulty-filter {
        margin-bottom: 1rem;
      }

      .difficulty-button {
        text-transform: capitalize;
        min-width: 120px;
      }

      .difficulty-button.active {
        opacity: 1;
      }

      .difficulty-button:not(.active) {
        opacity: 0.6;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const chartData = {
    labels: filteredGrabs.map(item => item.name),
    datasets: [
      {
        label: 'Steeze Factor',
        data: filteredGrabs.map(item => item.rating),
        backgroundColor: filteredGrabs.map(item => difficultyColors[item.difficulty]),
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Steeze Factor Rating',
          color: 'white',
          font: { size: 14 },
        },
        ticks: {
          font: { size: 12 },
          color: 'white',
        },
      },
      y: {
        ticks: {
          font: { size: 12 },
          color: 'white',
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: 'nearest',
      axis: 'y',
      intersect: false,
    },
    plugins: {
      tooltip: {
        enabled: true,
        position: 'nearest',
        external: function (context: any) {
          let tooltipEl = document.getElementById('chartjs-tooltip');

          if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip';
            tooltipEl.innerHTML = '<div></div>';
            document.body.appendChild(tooltipEl);
          }

          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = '0';
            return;
          }

          tooltipEl.classList.remove('above', 'below', 'no-transform');
          if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign);
          } else {
            tooltipEl.classList.add('no-transform');
          }

          const dataPoint = filteredGrabs[tooltipModel.dataPoints[0].dataIndex];

          const innerHtml = `
            <div class="chartjs-tooltip">
              <div class="chartjs-tooltip-header">${dataPoint.name}</div>
              <div class="chartjs-tooltip-body">
                Steeze Rating: ${dataPoint.rating}/100<br>
                Difficulty: ${dataPoint.difficulty}
              </div>
            </div>
          `;
          tooltipEl.innerHTML = innerHtml;

          const position = context.chart.canvas.getBoundingClientRect();
          const bodyFont = context.chart.options.font;

          tooltipEl.style.opacity = '1';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
          tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
          tooltipEl.style.font = bodyFont.string;
          tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
          tooltipEl.style.pointerEvents = 'none';
        },
      },
      legend: {
        display: false,  // Hide default legend since we're using buttons
      },
    },
  };

  return (
    <div className="container-fluid pb-4 w-50" style={{ height: '1400px' }}>
      <h2 className="fs-4 fw-bold p-3 text-white">Snowboard Grab Steeze Factor Ratings</h2>

      {/* Difficulty Filter Buttons */}
      <div className="difficulty-filter">
        <CButtonGroup role="group" aria-label="Difficulty filters">
          {Object.entries(difficultyColors).map(([difficulty, color]) => (
            <CButton
              key={difficulty}
              color="ghost"
              className={`difficulty-button ${selectedDifficulties.includes(difficulty) ? 'active' : ''}`}
              onClick={() => toggleDifficulty(difficulty)}
              style={{
                backgroundColor: selectedDifficulties.includes(difficulty) ? color : 'transparent',
                borderColor: color,
                color: selectedDifficulties.includes(difficulty) ? 'black' : color,
              }}
            >
              {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
            </CButton>
          ))}
        </CButtonGroup>
      </div>

      <div style={{ height: '800px', position: 'relative' }}>
        <CChart
          ref={chartRef}
          type="bar"
          data={chartData}
          options={options}
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default GrabRatings;
