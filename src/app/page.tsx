"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import { useState } from "react";

const getApiResponse = (key: string) => {
  return fetch(`/api/pull?key=${key}`, {
    redirect: "follow",
    mode: "no-cors",
  }).then((response) => response.json());
};

export default function Home() {
  const [key, setKey] = useState("");
  const [data, setData] = useState<any>(null);

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center gap-4">
        <Input value={key} onChange={(e) => setKey(e.target.value)} />
        <Button
          onClick={() => {
            getApiResponse(key)
              .then(setData)
              .catch((e) => {
                console.log("error while getting response");
                console.log(e);
              });
          }}
        >
          Pull
        </Button>
      </div>
      {data && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h3>Lease count: {data.leaseCount}</h3>
            <h3>Total duration in seconds: {data.totalDurationInSeconds}</h3>
            <h3>Total duration in hours: {data.totalDurationInHours}</h3>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Dseq</TableHead>
                <TableHead className="w-[50px] text-center">Oseq</TableHead>
                <TableHead className="w-[50px] text-center">Gseq</TableHead>
                <TableHead className="text-right">Provider</TableHead>
                <TableHead>Start Height</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Closed Height</TableHead>
                <TableHead>Closed Date</TableHead>
                <TableHead className="w-[100px]">Duration in Blocks</TableHead>
                <TableHead className="w-[100px]">Duration in Seconds</TableHead>
                <TableHead>Duration in Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.leases.map((lease) => (
                <TableRow key={lease.dseq}>
                  <TableCell className="font-medium">{lease.dseq}</TableCell>
                  <TableCell>{lease.oseq}</TableCell>
                  <TableCell>{lease.gseq}</TableCell>
                  <TableCell className="text-right">{lease.provider}</TableCell>
                  <TableCell>{lease.startHeight}</TableCell>
                  <TableCell>
                    {new Date(lease.startDate).toLocaleString()}
                  </TableCell>
                  <TableCell>{lease.closedHeight}</TableCell>
                  <TableCell>
                    {new Date(lease.closedDate).toLocaleString()}
                  </TableCell>
                  <TableCell>{lease.durationInBlocks}</TableCell>
                  <TableCell>{lease.durationInSeconds}</TableCell>
                  <TableCell>
                    {Number(lease.durationInHours).toFixed(3)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
