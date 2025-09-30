import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CoursesTable = () => {
    const [courses, setCourses] = useState([]);

    // Fetch courses from backend
    const fetchCourses = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/course");
            setCourses(res.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
            toast.error("Failed to load courses");
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">Courses</h1>
            <div className="overflow-x-auto rounded-lg border border-zinc-200 shadow">
                <table className="w-full text-sm text-left text-zinc-600">
                    <thead className="bg-zinc-100 text-zinc-800 text-sm uppercase">
                        <tr>
                            <th className="px-4 py-2">Course Name</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Department</th>
                            <th className="px-4 py-2">Passing Score</th>
                            <th className="px-4 py-2">Duration (Years)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <tr key={course._id} className="border-t hover:bg-zinc-50">
                                    <td className="px-4 py-2">{course.name}</td>
                                    <td className="px-4 py-2">{course.description}</td>
                                    <td className="px-4 py-2">{course.department}</td>
                                    <td className="px-4 py-2">{course.passingScore}</td>
                                    <td className="px-4 py-2">{course.durationYears}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-6 text-center text-zinc-500">
                                    No courses available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CoursesTable;
