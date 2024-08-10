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

// Enum values as per your database schema
const YesNoEnum = ["Yes", "No"] as const;
const OilConditionEnum = ["Good", "Bad"] as const;
const OilColorEnum = ["Clean", "Brown", "Black"] as const;

// Zod schema based on the engine table
const EngineFormSchema = z.object({
    rustDentDamage: z.enum(YesNoEnum),
    oilCondition: z.enum(OilConditionEnum),
    oilColor: z.enum(OilColorEnum),
    brakeFluidCondition: z.enum(OilConditionEnum),
    brakeFluidColor: z.enum(OilColorEnum),
    oilLeak: z.enum(YesNoEnum),
    overallSummary: z.string().min(1, "Overall Summary is required"),
    images: z.array(z.string().url()).optional(),
});

export function EngineForm() {
    const form = useForm<z.infer<typeof EngineFormSchema>>({
        resolver: zodResolver(EngineFormSchema),
        defaultValues: {
            rustDentDamage: "No",
            oilCondition: "Good",
            oilColor: "Brown",
            brakeFluidCondition: "Good",
            brakeFluidColor: "Brown",
            oilLeak: "No",
            overallSummary: "",
            images: [],
        },
    });

    function onFormSubmit(data: z.infer<typeof EngineFormSchema>) {
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
                    name="rustDentDamage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rust/Dent Damage</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select rust/dent damage" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {YesNoEnum.map((value) => (
                                        <SelectItem key={value} value={value}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="oilCondition"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Oil Condition</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select oil condition" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {OilConditionEnum.map((condition) => (
                                        <SelectItem
                                            key={condition}
                                            value={condition}
                                        >
                                            {condition}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="oilColor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Oil Color</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select oil color" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {OilColorEnum.map((color) => (
                                        <SelectItem key={color} value={color}>
                                            {color}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="brakeFluidCondition"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brake Fluid Condition</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select brake fluid condition" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {OilConditionEnum.map((condition) => (
                                        <SelectItem
                                            key={condition}
                                            value={condition}
                                        >
                                            {condition}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="brakeFluidColor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brake Fluid Color</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select brake fluid color" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {OilColorEnum.map((color) => (
                                        <SelectItem key={color} value={color}>
                                            {color}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="oilLeak"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Oil Leak</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select oil leak status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {YesNoEnum.map((value) => (
                                        <SelectItem key={value} value={value}>
                                            {value}
                                        </SelectItem>
                                    ))}
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
