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

// import SchoolSelect from "./SchoolSelect.jsx"
import IndividualScoreReport from "./IndividualScoreReport.jsx"
import Summary from "./Summary.jsx"
import SubjectPerformance from "./SubjectPerformance.jsx"
import QuestionStats from "./QuestionStats.jsx"
import SchoolStats from "./SchoolStats.jsx"
import { Car } from "lucide-react"
// import SearchAbleSelect from "../exam-components/SearchableSelect.jsx"
import PlacementResults from "./PlacementResults.jsx"

const Test = () => {

    return (
        <div className="flex w-full max-w-full flex-col gap-6">
            <Tabs defaultValue="report">
                <TabsList className="flex w-full ">
                    <TabsTrigger value="report">Individual Report</TabsTrigger>
                    <TabsTrigger value="subject-performance">Subject Performance</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="question-stats">QuestionStats</TabsTrigger>
                    <TabsTrigger value="school-stats">School Stats</TabsTrigger>
                    <TabsTrigger value="placement-report">Placement Report</TabsTrigger>
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
                            {/* <SearchAbleSelect onChange={(loc) => console.log(`${loc?.brgy}, ${loc?.municipality}, ${loc?.province}`)} /> */}
                            <IndividualScoreReport />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab 2: School Select */}
                <TabsContent value="subject-performance">
                    <Card>
                        <CardContent>
                            <SubjectPerformance />

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

                <TabsContent value="question-stats">
                    <Card>
                        <CardContent>
                            <QuestionStats />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="school-stats">
                    <Card>
                        <CardContent>
                            <SchoolStats />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="placement-report">
                    <Card>
                        <CardContent>
                            <PlacementResults />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Test
