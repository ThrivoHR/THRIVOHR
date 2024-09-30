"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { Columns } from "./columns";

import { Button } from "@/components/ui/button";
import { CirclePlus, Eye, EyeOff } from "lucide-react";
import LoadingAnimate from "@/components/Loading";
import { OvertimeFilterType, OvertimeType } from "@/schemaValidation/overtime.schema";
import { AddOvertimeModal } from "./addOvertime";
import apiOvertimeRequest from "@/apiRequest/overtime";
import OvertimeFilter from "./filterOvertime";

import Image from "next/image";
import none from "/public/nothing-here-.jpg";

export default function Overtime() {
  const [loading, setLoading] = useState(false);
  const [overtime, setOvertime] = useState<OvertimeType[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState<OvertimeFilterType | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(false); // Table visibility state

  const handleFilterChange = (newFilter: OvertimeFilterType) => {
    setFilter(newFilter);
    setPage(1);
    fetchData(newFilter);
    setShowTable(true);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const fetchData = async (filter: OvertimeFilterType | null) => {
    setLoading(true);
    try {
      const [data] = await Promise.all([
        apiOvertimeRequest.getListOvertime(page, pageSize, filter),
      ]);
      setOvertime(data.payload.value.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setOvertime([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showTable) {
      fetchData(filter);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, showTable]);

  return (
    <div>
      <OvertimeFilter onFilter={handleFilterChange} />
      <div className="flex justify-end items-center py-3 space-x-2">
        <Button onClick={openModal}><CirclePlus size={16} />&nbsp;Add</Button>
        <Button
          variant="secondary"
          onClick={() => setShowTable((prev) => !prev)}
        >
          {showTable ? (
            <div className="flex items-center">
              <EyeOff size={20} />
              &nbsp; Hide Table
            </div>
          ) : (
            <div className="flex items-center">
              <Eye size={20} />
              &nbsp; Show Table
            </div>
          )}
        </Button>
      </div>
      <AddOvertimeModal isOpen={isModalOpen} onClose={closeModal} />
      
      {showTable ? (
        <>
          {loading ? (
            <div>
              <LoadingAnimate />
            </div>
          ) : (
            <>
            {overtime.length > 0 ? (
              <>
                <DataTable columns={Columns()} data={overtime} />
                <div className="flex justify-between items-center p-4">
                  <div>
                    <select
                      value={pageSize}
                      onChange={(e) =>
                        handleChangePageSize(Number(e.target.value))
                      }
                      className="px-4 py-2 border rounded-lg"
                    >
                      <option value={5}>5 rows</option>
                      <option value={10}>10 rows</option>
                    </select>
                  </div>
                  <div>
                    <button
                      onClick={() => handleChangePage(Math.max(page - 1, 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border rounded-lg text-sm"
                    >
                      Previous
                    </button>
                    <span className="mx-4">Page {page}</span>
                    <button
                      onClick={() => handleChangePage(page + 1)}
                      className="px-4 py-2 border rounded-lg text-sm"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div>No applications found.</div>
            )}
            </>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center flex-col">
          <Image src={none} alt="nothing" width={400} height={300}/>
          <p>Nothing here, start by pressing Show Table button above</p>
        </div>
      )}
    </div>
  );
}
