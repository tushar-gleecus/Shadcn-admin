"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Funnel, ListFilter, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Inline PlatformUser type
type PlatformUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: "Pending" | "Done";
};

export const platformUserColumns = (
  handleDelete: (user: PlatformUser) => void
): ColumnDef<PlatformUser>[] => [
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <div className="flex items-center gap-2">
        <span>First Name</span>
        <ListFilter
          className="h-4 w-4 cursor-pointer text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
        <FilterDropdown column={column} />
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("first_name")}</div>,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => (
      <div className="flex items-center gap-2">
        <span>Last Name</span>
        <ListFilter
          className="h-4 w-4 cursor-pointer text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
        <FilterDropdown column={column} />
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("last_name")}</div>,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <div className="flex items-center gap-2">
        <span>Email</span>
        <ListFilter
          className="h-4 w-4 cursor-pointer text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
        <FilterDropdown column={column} />
      </div>
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
  accessorKey: "status",
  header: ({ column }) => (
    <div className="flex items-center gap-2">
      <span>Status</span>
      {/* (Your filter/sort controls if any) */}
    </div>
  ),
  cell: ({ row }) => {
    const status = row.getValue("status") as "Pending" | "Done";
    return (
      <span
        className={
          status === "Done"
            ? "inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-medium"
            : "inline-block px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 text-xs font-medium"
        }
      >
        {status}
      </span>
    );
  },
  enableSorting: true,
  enableColumnFilter: true,
},
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleDelete(user)}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Filter dropdown for per-column filtering
function FilterDropdown({ column, options }: { column: any; options?: string[] }) {
  const [value, setValue] = useState<string>();
  const applyFilter = () => {
    column.setFilterValue(value || undefined);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
          <Funnel className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 p-2 space-y-2">
        {options ? (
          options.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => {
                setValue(option);
                column.setFilterValue(option);
              }}
              className={value === option ? "font-bold" : ""}
            >
              {option}
            </DropdownMenuItem>
          ))
        ) : (
          <Input
            placeholder="Contains..."
            value={value || ""}
            onChange={(e) => setValue(e.target.value)}
            onBlur={applyFilter}
          />
        )}
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => {
            setValue("");
            column.setFilterValue(undefined);
          }}
        >
          Clear
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
