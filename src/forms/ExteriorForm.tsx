"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useExteriorStore } from "@/store/ExteriorStore";

// TODO : Change the file type
const FormSchema = z
    .object({
        rustDentDamage: z.enum(["Y", "N"]),
        oilLeakSuspension: z.enum(["Y", "N"]),
        overallSummary: z.string().optional(),
        images: z.array(z.string().url()).optional(),
    })
    .superRefine((data, ctx) => {
        if (data.rustDentDamage === "Y" && !data.overallSummary) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    "Overall summary is required when there is rust, dent, or damage.",
                path: ["overallSummary"], // This points to the specific field
            });
        }
    });

type PropTypes = {
    active?: boolean;
};

export function ExteriorForm({ active }: PropTypes) {
    const { setAllData } = useExteriorStore();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            rustDentDamage: "N",
            oilLeakSuspension: "N",
            overallSummary: "",
            images: [],
        },
    });

    function onFormSubmit(data: z.infer<typeof FormSchema>) {
        setAllData({
            oilLeakSuspension: data.oilLeakSuspension,
            overallSummary: data.overallSummary || "",
            rustDentDamage: data.rustDentDamage,
        });
        console.log(data);
    }

    return (
        <div id="exterior" className={active ? "" : "blur-md"}>
            <h1 className="pb-7 text-center text-2xl font-semibold">
                Exterior
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onFormSubmit)}
                    className="space-y-7 px-2"
                >
                    <FormField
                        control={form.control}
                        name="rustDentDamage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rust/Dent/Damage</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select condition" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Y">Yes</SelectItem>
                                        <SelectItem value="N">No</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="oilLeakSuspension"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Oil Leak/Suspension</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select condition" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Y">Yes</SelectItem>
                                        <SelectItem value="N">No</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="overallSummary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Overall Summary</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Summary of the exterior inspection..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => {
                                            const files = Array.from(
                                                e.target.files || [],
                                            ).map((file) =>
                                                URL.createObjectURL(file),
                                            );
                                            field.onChange(files);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}
