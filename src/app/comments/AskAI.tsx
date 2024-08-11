"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkle } from "lucide-react";
import React, { useState } from "react";

export default function AskAI() {
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOnClick = async () => {
        setLoading(true);
        const response = await fetch(
            "http://localhost:3000/api/comments/summarize",
        );
        const data = await response.json();
        setLoading(false);
        setSummary(data.message);
    };

    return (
        <div>
            <Button className="w-min" onClick={handleOnClick}>
                <Sparkle />
                <p className="pl-2">Ask ai</p>
            </Button>
            <p>
                {!loading ? (
                    summary
                ) : (
                    <>
                        <Skeleton className="mt-5 h-[10px] w-full" />
                        <Skeleton className="mt-5 h-[10px] w-full" />
                        <Skeleton className="mt-5 h-[10px] w-3/4" />
                    </>
                )}
            </p>
        </div>
    );
}
