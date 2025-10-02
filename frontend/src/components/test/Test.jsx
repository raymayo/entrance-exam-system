import React, { useState } from "react"
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"

import SchoolSelect from "./SchoolSelect.jsx"
import IndividualScoreReport from "./IndividualScoreReport.jsx"
import Summary from "./Summary.jsx"

const Test = () => {
    const [selectedSchool, setSelectedSchool] = useState("")
    console.log("selected", selectedSchool)

    return (
        <div className="flex w-full max-w-full flex-col gap-6">
            <Tabs defaultValue="report">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="report">Individual Report</TabsTrigger>
                    <TabsTrigger value="school">School Select</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>

                {/* Tab 1: Individual Score Report */}
                <TabsContent value="report">
                    <Card>
                        <CardHeader>
                            <CardTitle>Individual Score Report</CardTitle>
                            <CardDescription>
                                View detailed results of individual students.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <IndividualScoreReport />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab 2: School Select */}
                <TabsContent value="school">
                    <Card>
                        <CardHeader>
                            <CardTitle>School Selection</CardTitle>
                            <CardDescription>
                                Select a school to filter exam reports.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SchoolSelect
                                selectedSchool={selectedSchool}
                                onSelect={setSelectedSchool}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab 3: Summary */}
                <TabsContent value="summary">
                    <Card>
                        <CardHeader>
                            <CardTitle>Summary</CardTitle>
                            <CardDescription>
                                Overview of overall statistics and performance.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Summary />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Test
