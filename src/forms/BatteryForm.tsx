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

// Zod schema for the Battery form
// TODO : Change the file type
const BatteryFormSchema = z.object({
    make: z.string().min(1, { message: "Make is required" }),
    replacementDate: z.string().optional(),
    voltage: z
        .union([z.string().transform((val) => parseFloat(val)), z.number()])
        .refine((val) => !isNaN(val), {
            message: "Voltage must be a valid number.",
        })
        .optional(),
    waterLevel: z.enum(["Good", "Ok", "Low"]),
    condition: z.enum(["Y", "N"]),
    leakRust: z.enum(["Y", "N"]),
    overallSummary: z.string(),
    images: z.array(z.string().url()).optional(),
});

export function BatteryForm() {
    const form = useForm<z.infer<typeof BatteryFormSchema>>({
        resolver: zodResolver(BatteryFormSchema),
        defaultValues: {
            make: "",
            replacementDate: "",
            voltage: 0,
            waterLevel: "Good",
            condition: "Y",
            leakRust: "N",
            overallSummary: "",
            images: [],
        },
    });

    function onFormSubmit(data: z.infer<typeof BatteryFormSchema>) {
        console.log(data);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onFormSubmit)}
                className="space-y-6 px-2"
            >
                <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Make</FormLabel>
                            <FormControl>
                                <Input placeholder="Make" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="replacementDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Replacement Date</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    placeholder="DD-MM-YYYY"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="voltage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Voltage</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="12.34"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="waterLevel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Water Level</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Water Level" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Good">Good</SelectItem>
                                    <SelectItem value="Ok">Ok</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Condition</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Condition" />
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
                    name="leakRust"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Leak or Rust</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Leak or Rust" />
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
                                    placeholder="Summary of the battery condition..."
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
