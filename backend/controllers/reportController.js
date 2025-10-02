import Student from "../models/Student.js";

export const examTakers = async (req, res) => {
    try {
        const registeredOnly = await Student.find({ examDate: null });

        const examTakers = await Student.find({ examDate: { $ne: null } });

        res.status(200).json([
            { name: "Registered Only", value: registeredOnly.length },
            { name: "Exam Takers", value: examTakers.length },
        ]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


export const getStrandSummary = async (req, res) => {
    try {
        const summary = await Student.aggregate([
            {
                // Normalize gender (uppercase)
                $addFields: {
                    genderNormalized: { $toUpper: "$gender" },
                },
            },
            {
                $group: {
                    _id: { strand: "$course1st", gender: "$genderNormalized" },
                    count: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: "$_id.strand",
                    counts: {
                        $push: {
                            gender: "$_id.gender",
                            count: "$count",
                        },
                    },
                    total: { $sum: "$count" },
                },
            },
            {
                $project: {
                    strand: "$_id",
                    male: {
                        $ifNull: [
                            {
                                $first: {
                                    $map: {
                                        input: {
                                            $filter: {
                                                input: "$counts",
                                                as: "c",
                                                cond: { $eq: ["$$c.gender", "MALE"] },
                                            },
                                        },
                                        as: "x",
                                        in: "$$x.count",
                                    },
                                },
                            },
                            0,
                        ],
                    },
                    female: {
                        $ifNull: [
                            {
                                $first: {
                                    $map: {
                                        input: {
                                            $filter: {
                                                input: "$counts",
                                                as: "c",
                                                cond: { $eq: ["$$c.gender", "FEMALE"] },
                                            },
                                        },
                                        as: "x",
                                        in: "$$x.count",
                                    },
                                },
                            },
                            0,
                        ],
                    },
                    total: 1,
                },
            },
        ]);

        // Compute grand total
        const grandTotal = summary.reduce((sum, s) => sum + s.total, 0);

        const withPercentage = summary.map((s) => ({
            strand: s.strand,
            male: s.male || 0,
            female: s.female || 0,
            total: s.total,
            percentage: grandTotal
                ? ((s.total / grandTotal) * 100).toFixed(1) + "%"
                : "0%",
        }));

        res.json(withPercentage);
    } catch (error) {
        console.error("Error fetching strand summary:", error);
        res.status(500).json({ error: "Failed to fetch strand summary" });
    }
};

