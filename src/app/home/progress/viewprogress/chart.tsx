// components/ProjectChart.tsx

import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2'; // Assuming you're using react-chartjs-2
import { ProjectSchemaType } from '@/schemaValidation/project.schema';

Chart.register(...registerables);

interface ProjectChartProps {
  projects: ProjectSchemaType[];
}

const ProjectChart: React.FC<ProjectChartProps> = ({ projects }) => {
  useEffect(() => {
    // You can perform any additional logic if needed on mount
  }, []);

  const data = {
    labels: projects.map(proj => proj.name),
    datasets: [
      {
        label: 'Progress',
        data: projects.map(proj => proj.progress),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Tasks',
        data: projects.map(proj => proj.totalTask),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Project Progress and Total Tasks',
      },
    },
  };

  return <div style={{ width: '500px', height: '500px' }}> {/* Set the desired width and height */}
  <Bar data={data} options={options} />
</div>
};

export default ProjectChart;
