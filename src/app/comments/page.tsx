import Navbar from "@/components/TopNavBar";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { Sparkle } from "lucide-react";
import React from "react";
import AskAI from "./AskAI";

export default async function CommentsPage() {
    const response = await fetch("http://localhost:3000/api/comments");
    const allComments = await response.json();

    return (
        <div>
            <Navbar />
            <div className="flex flex-col gap-10 px-20 pt-20">
                <AskAI />
                <Table className="pt-10">
                    <TableCaption>That&apos;s all comments</TableCaption>
                    <TableBody>
                        {allComments.comments.map(
                            (
                                comment: { title: string; body: string },
                                index: number,
                            ) => (
                                <TableRow key={index}>
                                    <TableCell>{comment.title}</TableCell>
                                    <TableCell>{comment.body}</TableCell>
                                </TableRow>
                            ),
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
