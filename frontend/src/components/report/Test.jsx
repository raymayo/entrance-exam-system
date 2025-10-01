import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Mock data (replace with API data)
const examineeScores = [
    { id: 1, name: "Juan Dela Cruz", math: 85, english: 78, science: 92, total: 255 },
    { id: 2, name: "Maria Santos", math: 70, english: 88, science: 80, total: 238 },
    { id: 3, name: "Pedro Ramirez", math: 90, english: 82, science: 85, total: 257 },
];
const Test = () => {
    const [data] = useState(examineeScores);

    const exportCSV = () => {
        const rows = [
            ["Name", "Math", "English", "Science", "Total"],
            ...data.map((s) => [s.name, s.math, s.english, s.science, s.total]),
        ];
        const csv = rows.map((r) => r.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "score_breakdown.csv";
        a.click();
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Score Breakdown Report</CardTitle>
                <Button onClick={exportCSV}>Export CSV</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Math</TableHead>
                            <TableHead>English</TableHead>
                            <TableHead>Science</TableHead>
                            <TableHead>Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((exam) => (
                            <TableRow key={exam.id}>
                                <TableCell>{exam.name}</TableCell>
                                <TableCell>{exam.math}</TableCell>
                                <TableCell>{exam.english}</TableCell>
                                <TableCell>{exam.science}</TableCell>
                                <TableCell className="font-semibold">{exam.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default Test;
