"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import LoadingAnimate from "@/components/Loading";
import {
  ProjectFilterSchemaType,
  ProjectSchemaType,
  UpdateProjectType,
} from "@/schemaValidation/project.schema";
import apiProjectRequest from "@/apiRequest/project";
import ProjectFilter from "./filterProject";
import { Progress } from "@/components/ui/progress";
import { AddProjectModal } from "./addProject";
import { CirclePlus, Trash, Edit3 } from "lucide-react"; // Import Edit icon
import { EditProjectModal } from "./editProject";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ProjectChart from "./chart";
import { useProject } from "@/app/project-context";
import toast from "react-hot-toast";

export default function ProjectTable() {
  const { setProjectId, setProjectName } = useProject();

  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<ProjectSchemaType[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<ProjectSchemaType | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [filter, setFilter] = useState<ProjectFilterSchemaType | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] =
    useState<ProjectSchemaType | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<UpdateProjectType | null>(
    null
  );
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<number | null>(null);
  const [editMemberModalOpen, setEditMemberModalOpen] = useState(false);
  const [employeeCode, setEmployeeCode] = useState<string>("");
  const [isRemove, setIsRemove] = useState<boolean>(false);
  const [members, setMembers] = useState<any[]>([]);
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await apiProjectRequest.getProject(1, 10, filter); // Fetch project list
        setProject(data.payload.value.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [filter]);

  const [membersLoading, setMembersLoading] = useState(false);

  const fetchMembers = async (projectId: string) => {
    setMembersLoading(true);
    try {
      const data = await apiProjectRequest.getProjectAllMember(projectId);
      setMembers(data.payload.value);
      console.log("zzz", members);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setMembersLoading(false);
      setIsMemberDialogOpen(true); // Open dialog after loading
    }
  };

  const handleFilterChange = (newFilter: ProjectFilterSchemaType) => {
    setFilter(newFilter);
  };

  const handleCardClick = (project: ProjectSchemaType) => {
    setProjectId(project.id);
    setProjectName(project.name);
    setSelectedProject(project);
    setShowDialog(true); // Open the alert dialog
    toast.success(
      `Please go to the "Project Task" to view tasks for ${project.name}`,{duration:2000}
    );
  };

  const openStatusModal = () => {
    setStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setStatusModalOpen(false);
  };

  const closeMemberDialog = () => setIsMemberDialogOpen(false);

  const handleDelete = async () => {
    if (!projectToDelete) return;
    try {
      await apiProjectRequest.deleteProject(projectToDelete.id);
      setProject((prevProjects) =>
        prevProjects.filter((proj) => proj.id !== projectToDelete.id)
      );
      console.log(
        `Project with ID ${projectToDelete.id} deleted successfully.`
      );
      closeDeleteDialog();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedProject(null);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openDeleteDialog = (project: ProjectSchemaType) => {
    setProjectToDelete(project);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
    setProjectToDelete(null);
  };

  const openEditModal = (project: ProjectSchemaType) => {
    setProjectToEdit({
      id: project.id,
      projectModel: {
        name: project.name,
        description: project.description,
        leaderCode: "",
        subLeaderCode: "",
      },
    });
    setEditModalOpen(true);
  };

  const openEditMemberModal = () => {
    setEditMemberModalOpen(true);
  };

  const closeEditMemberModal = () => {
    setEditMemberModalOpen(false);
    setEmployeeCode("");
    setIsRemove(false);
  };

  const handleStatusChange = async () => {
    if (selectedProject && newStatus !== null) {
      try {
        await apiProjectRequest.updateStatus(selectedProject.id, newStatus);
        console.log(`Status updated to ${newStatus}`);
        closeStatusModal();
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  const handleEditMember = async () => {
    if (selectedProject) {
      try {
        await apiProjectRequest.editMember(
          selectedProject.id,
          employeeCode,
          isRemove
        );
        console.log(
          `Member updated. EmployeeCode: ${employeeCode}, Removed: ${isRemove}`
        );
        closeEditMemberModal();
      } catch (error) {
        console.error("Error editing member:", error);
      }
    }
  };

  return (
    <div>
      <ProjectFilter onFilter={handleFilterChange} />
      <div className="flex items-center py-3 space-x-2">
        <Button className="ml-auto" onClick={openModal}>
          <CirclePlus size={16} />
          &nbsp; Add
        </Button>
      </div>
      <AddProjectModal isOpen={isModalOpen} onClose={closeModal} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <LoadingAnimate />
        ) : (
          project.map((proj) => (
            <Card
              key={proj.id}
              onClick={() => handleCardClick(proj)}
              className="cursor-pointer relative"
            >
              <CardHeader>
                <CardTitle>
                  Project: {proj.name || "Untitled Project"}
                </CardTitle>
                <CardDescription>
                  Description: {proj.description}
                </CardDescription>
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(proj);
                    }}
                  >
                    <Edit3 className="h-4 w-4 text-blue-500" />{" "}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteDialog(proj); // Open delete dialog on click
                    }}
                  >
                    <Trash className="h-4 w-4 text-red-500" />{" "}
                    {/* Delete button */}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Leader:</strong> {proj.leaderName || "N/A"}
                </p>
                <p>
                  <strong>Employees:</strong> {proj.totalEmployee}
                </p>
                <p>
                  <strong>Tasks:</strong> {proj.totalTask}
                </p>
                <p>
                  <strong>Status:</strong> {proj.status}
                </p>
                <strong>Progress: </strong>
                <Progress className="mt-2" value={proj.progress} />
              </CardContent>
            </Card>
          ))
        )}
        {/* detail */}
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          {selectedProject && (
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Project Details</AlertDialogTitle>
                <AlertDialogDescription className="font-medium space-y-2 text-base">
                  <p>
                    <strong>ID:</strong> {selectedProject.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {selectedProject.name}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedProject.description}
                  </p>
                  <p>
                    <strong>Leader:</strong>{" "}
                    {selectedProject.leaderName || "N/A"}
                  </p>
                  <p>
                    <strong>Sub Leader:</strong>{" "}
                    {selectedProject.subLeaderName || "N/A"}
                  </p>
                  <p>
                    <strong>Total Employees:</strong>{" "}
                    {selectedProject.totalEmployee}
                    <Button
                      variant="link"
                      onClick={() => fetchMembers(selectedProject.id)}
                    >
                      View Details
                    </Button>
                  </p>
                  <p>
                    <strong>Total Tasks:</strong> {selectedProject.totalTask}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedProject.status}
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button variant="secondary" onClick={openStatusModal}>
                  Change status
                </Button>
                <Button variant="secondary" onClick={openEditMemberModal}>
                  Edit member
                </Button>
                <AlertDialogCancel onClick={closeDialog}>
                  Close
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialog>
        {/* delete */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Project</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this project? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeDeleteDialog}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* edit */}
        {projectToEdit && (
          <EditProjectModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            data={projectToEdit}
            id={projectToEdit.id}
          />
        )}

        <AlertDialog open={statusModalOpen} onOpenChange={setStatusModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Change Status</AlertDialogTitle>
              <AlertDialogDescription>
                <Select
                  value={newStatus !== null ? newStatus.toString() : ""}
                  onValueChange={(value) => setNewStatus(parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 - New</SelectItem>
                    <SelectItem value="1">1 - In Progress</SelectItem>
                    <SelectItem value="2">2 - Finished</SelectItem>
                    <SelectItem value="3">3 - Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleStatusChange}>
                OK
              </AlertDialogAction>
              <AlertDialogCancel onClick={closeStatusModal}>
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Modal to edit member */}
        <AlertDialog
          open={editMemberModalOpen}
          onOpenChange={setEditMemberModalOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Member</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  value={employeeCode}
                  onChange={(e) => setEmployeeCode(e.target.value)}
                  placeholder="Enter Employee Code"
                />
                <Select
                  value={isRemove ? "true" : "false"}
                  onValueChange={(value) => setIsRemove(value === "true")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Remove Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">Not Removed</SelectItem>
                    <SelectItem value="true">Removed</SelectItem>
                  </SelectContent>
                </Select>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleEditMember}>
                OK
              </AlertDialogAction>
              <AlertDialogCancel onClick={closeEditMemberModal}>
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={isMemberDialogOpen} onOpenChange={closeMemberDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Project Members</AlertDialogTitle>
              {membersLoading ? (
                <LoadingAnimate />
              ) : (
                <AlertDialogDescription className="space-y-2 text-base">
                  <h3>Member:</h3>
                  <ul>
                    {members.length > 0 ? (
                      members.map((member, index) => (
                        <li key={index}>{member}</li> // Displaying member name directly
                      ))
                    ) : (
                      <li>No members found.</li>
                    )}
                  </ul>
                </AlertDialogDescription>
              )}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeMemberDialog}>
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <>
        {loading ? (
          <></>
        ) : (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Chart Overview</CardTitle>
              <CardDescription>
                Overview of project progress and total tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ProjectChart projects={project} />
              </div>
            </CardContent>
          </Card>
        )}
      </>
    </div>
  );
}
