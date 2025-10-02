import React, { useEffect, useRef, useState } from "react";
import {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";

/** Debounce any changing value */
function useDebouncedValue(value, delay = 300) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
}

const SchoolSelect = ({ selectedSchool: propSelected = null, onSelect }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebouncedValue(query, 300);

    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(false);

    // local state to hold the selection
    const [selectedSchool, setSelectedSchool] = useState(propSelected);

    // new transferee toggle
    const [transferee, setTransferee] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    useEffect(() => {
        const q = debouncedQuery.trim();
        if (!q) {
            setSchools([]);
            return;
        }

        const ac = new AbortController();

        (async () => {
            setLoading(true);
            try {
                const endpoint = transferee
                    ? `http://localhost:5000/api/school/college?q=${encodeURIComponent(q)}`
                    : `http://localhost:5000/api/school?q=${encodeURIComponent(q)}`;

                const res = await fetch(endpoint, { signal: ac.signal });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setSchools(Array.isArray(data) ? data : []);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Error fetching schools:", err);
                    setSchools([]);
                }
            } finally {
                setLoading(false);
            }
        })();

        return () => ac.abort();
    }, [debouncedQuery, transferee]); // 👈 re-fetch if transferee changes

    return (
        <div className="flex flex-col gap-2 w-[300px]">
            {/* transferee toggle */}
            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={transferee}
                    onChange={(e) => setTransferee(e.target.checked)}
                />
                Transferee
            </label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                        {selectedSchool ? selectedSchool.institutionName : "Select a school"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[300px] p-0">
                    <Command shouldFilter={false}>
                        <CommandInput
                            ref={inputRef}
                            placeholder="Search school..."
                            value={query}
                            onValueChange={setQuery}
                            className="border-b"
                        />
                        <CommandList>
                            {loading && <CommandItem disabled>Loading...</CommandItem>}

                            {!loading && schools.length === 0 && (
                                <CommandEmpty className='text-center p-2'>
                                    No results found.{" "}
                                    <button
                                        className="text-blue-500 underline ml-1"
                                        onClick={() => {
                                            const newSchool = query;
                                            setSelectedSchool(newSchool);
                                            onSelect?.(newSchool);
                                            setOpen(false);
                                            setQuery("");
                                        }}
                                    >
                                        Select "{query}"
                                    </button>
                                </CommandEmpty>
                            )}

                            {schools.map((school) => (
                                <CommandItem
                                    key={school._id}
                                    onSelect={() => {
                                        setSelectedSchool(school);
                                        onSelect?.(school);
                                        setOpen(false);
                                        setQuery("");
                                    }}
                                >
                                    {school.institutionName}
                                    {selectedSchool?._id === school._id && (
                                        <Check className="ml-auto h-4 w-4" />
                                    )}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default SchoolSelect;
