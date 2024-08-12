"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Tasks Completed",
      data: [12, 19, 3, 5, 2, 3, 7],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(137,207,240, 1)",
      borderWidth: 2,
      fill: true,
      tension: 0.1,
    },
  ],
};

export default function ProgressPage() {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({
    name: "",
    progress: 0,
    member: "",
    manager: "",
    supervisor: "",
  });

  const projects = [
    {
      name: "Project A",
      progress: 75,
      member: "Alice",
      manager: "Bob",
      supervisor: "Charlie",
    },
    {
      name: "Project B",
      progress: 50,
      member: "Dave",
      manager: "Eve",
      supervisor: "Frank",
    },
    {
      name: "Project C",
      progress: 20,
      member: "Grace",
      manager: "Heidi",
      supervisor: "Ivan",
    },
  ];

  const handleCardClick = (
    project: SetStateAction<{
      name: string;
      progress: number;
      member: string;
      manager: string;
      supervisor: string;
    }>
  ) => {
    setSelectedProject(project);
    setOpen(true);
  };

  return (
    <>
      <div className="mb-3 flex flex-wrap gap-4">
        {projects.map((project) => (
          <div key={project.name} className="flex-1 min-w-[300px]">
            <Card onClick={() => handleCardClick(project)}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <span>{project.name}</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProject.name}</DialogTitle>
              <DialogDescription>
                <div className="space-y-4">
                  <div>
                    <p className="text-lg font-semibold">
                      Progress:{" "}
                      <span className="font-normal">
                        {selectedProject.progress}%
                      </span>
                    </p>
                    <Progress value={selectedProject.progress} />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      Member:{" "}
                      <span className="font-normal">
                        {selectedProject.member}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      Manager:{" "}
                      <span className="font-normal">
                        {selectedProject.manager}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      Supervisor:{" "}
                      <span className="font-normal">
                        {selectedProject.supervisor}
                      </span>
                    </p>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <Card className="p-0 items-center">
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div style={{ width: "500px", height: "250px" }}>
              <Line data={data} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
