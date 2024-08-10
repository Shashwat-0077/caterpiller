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

// TODO : Change the file type
const FormSchema = z.object({
    leftFrontPressure: z
        .union([z.string().transform((val) => parseFloat(val)), z.number()])
        .refine((val) => !isNaN(val), {
            message: "Pressure must be a valid number.",
        }),
    rightFrontPressure: z
        .union([z.string().transform((val) => parseFloat(val)), z.number()])
        .refine((val) => !isNaN(val), {
            message: "Pressure must be a valid number.",
        }),
    leftFrontCondition: z.enum(["Good", "Ok", "Needs Replacement"]),
    rightFrontCondition: z.enum(["Good", "Ok", "Needs Replacement"]),
    leftRearPressure: z
        .union([z.string().transform((val) => parseFloat(val)), z.number()])
        .refine((val) => !isNaN(val), {
            message: "Pressure must be a valid number.",
        }),
    rightRearPressure: z
        .union([z.string().transform((val) => parseFloat(val)), z.number()])
        .refine((val) => !isNaN(val), {
            message: "Pressure must be a valid number.",
        }),
    leftRearCondition: z.enum(["Good", "Ok", "Needs Replacement"]),
    rightRearCondition: z.enum(["Good", "Ok", "Needs Replacement"]),
    overallSummary: z.string(),
    images: z.array(z.string().url()).optional(),
});

export function TireForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            leftFrontPressure: 0,
            rightFrontPressure: 0,
            leftFrontCondition: "Ok",
            rightFrontCondition: "Ok",
            leftRearPressure: 0,
            rightRearPressure: 0,
            leftRearCondition: "Ok",
            rightRearCondition: "Ok",
            overallSummary: "",
            images: [],
        },
    });

    function onFormSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onFormSubmit)}
                className="space-y-6 px-2"
            >
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="leftFrontPressure"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Left Front Pressure</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="30"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rightFrontPressure"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Right Front Pressure</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="30"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="leftFrontCondition"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Left Front Condition</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Good">
                                            Good
                                        </SelectItem>
                                        <SelectItem value="Ok">Ok</SelectItem>
                                        <SelectItem value="Needs Replacement">
                                            Needs Replacement
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rightFrontCondition"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Right Front Condition</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Good">
                                            Good
                                        </SelectItem>
                                        <SelectItem value="Ok">Ok</SelectItem>
                                        <SelectItem value="Needs Replacement">
                                            Needs Replacement
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="leftRearPressure"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Left Rear Pressure</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="30"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rightRearPressure"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Right Rear Pressure</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="30"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="leftRearCondition"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Left Rear Condition</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Good">
                                            Good
                                        </SelectItem>
                                        <SelectItem value="Ok">Ok</SelectItem>
                                        <SelectItem value="Needs Replacement">
                                            Needs Replacement
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rightRearCondition"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Right Rear Condition</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Good">
                                            Good
                                        </SelectItem>
                                        <SelectItem value="Ok">Ok</SelectItem>
                                        <SelectItem value="Needs Replacement">
                                            Needs Replacement
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="overallSummary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Overall Summary</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Summary of the inspection..."
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
    );
}
