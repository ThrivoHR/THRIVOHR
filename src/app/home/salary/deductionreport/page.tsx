"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus, Eye, EyeOff } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import LoadingAnimate from "@/components/Loading";
import Image from "next/image";
import none from "/public/nothing-here-.jpg";
import apiSalaryRequest from "@/apiRequest/salary";
import { DeductionType, RaiseType, SalaryFilterType, SalaryType } from "@/schemaValidation/salary.schema";
import SalaryFilter from "./filterSalary";

export default function HistoryTable() {
  const [loading, setLoading] = useState(false);
  const [deduction, setDeduction] = useState<DeductionType[]>([]);
  const [filter, setFilter] = useState<SalaryFilterType | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showTable, setShowTable] = useState(false);

  const handleFilterChange = (newFilter: SalaryFilterType) => {
    setFilter(newFilter);
    setPage(1);
    setShowTable(true); // Show table when filter is applied
  };

  useEffect(() => {
    if (showTable) {
      const fetch = async () => {
        setLoading(true);
        try {
          const data = await apiSalaryRequest.getDeduction(
            page,
            pageSize,
            filter
          );
          setDeduction(data.payload.value);
        } catch (error) {
          console.error("Error fetching data:", error);
          setDeduction([]);
        } finally {
          setLoading(false);
        }
      };

      fetch();
    }
  }, [page, pageSize, showTable, filter]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  return (
    <div>
      <SalaryFilter onFilter={handleFilterChange} />
      <div className="flex items-center py-3 space-x-2 flex-row-reverse">
        <Button variant="secondary" onClick={() => setShowTable(prev => !prev)}>
          {showTable ? (
            <div className="flex items-center">
              <EyeOff size={20} /> &nbsp; Hide Table
            </div>
          ) : (
            <div className="flex items-center">
              <Eye size={20} /> &nbsp; Show Table
            </div>
          )}
        </Button>
      </div>
      {/* <AddHistoryModal isOpen={isModalOpen} onClose={closeModal} /> */}

      {showTable ? (
        <>
          {loading ? (
            <div>
              <LoadingAnimate />
            </div>
          ) : (
            <>
              {deduction.length > 0 ? (
                <>
                  <DataTable
                    columns={columns()}
                    data={deduction}
                  />
                  <div className="flex justify-between items-center p-4">
                    <div>
                      <select
                        value={pageSize}
                        onChange={(e) => handleChangePageSize(Number(e.target.value))}
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
                        className="px-3 py-2 border rounded-lg text-sm"
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
                <div>No career history found.</div>
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
