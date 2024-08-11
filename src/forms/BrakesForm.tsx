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
import { useBrakesStore } from "@/store/BrakesStore";

// Enum values as per your database schema
const FluidLevelEnum = ["Good", "Ok", "Low"] as const;
const ConditionEnum = ["Good", "Ok", "Needs Replacement"] as const;

// Zod schema based on the brakes table
const BrakeFormSchema = z.object({
    fluidLevel: z.enum(FluidLevelEnum),
    frontCondition: z.enum(ConditionEnum),
    rearCondition: z.enum(ConditionEnum),
    emergencyBrakeCondition: z.enum(FluidLevelEnum),
    overallSummary: z.string().min(1, "Overall Summary is required"),
    images: z.array(z.string().url()).optional(),
});

type PropTypes = {
    active?: boolean;
};

export function BrakesForm({ active }: PropTypes) {
    const { setAllData } = useBrakesStore();

    const form = useForm<z.infer<typeof BrakeFormSchema>>({
        resolver: zodResolver(BrakeFormSchema),
        defaultValues: {
            fluidLevel: "Ok",
            frontCondition: "Ok",
            rearCondition: "Ok",
            emergencyBrakeCondition: "Ok",
            overallSummary: "",
            images: [],
        },
    });

    function onFormSubmit(data: z.infer<typeof BrakeFormSchema>) {
        setAllData({
            emergencyBrakeCondition: data.emergencyBrakeCondition,
            fluidLevel: data.fluidLevel,
            frontCondition: data.frontCondition,
            overallSummary: data.overallSummary,
            rearCondition: data.rearCondition,
        });
        console.log(data);
    }

    return (
        <div id="brake" className={active ? "" : "blur-md"}>
            <h1 className="pb-7 text-center text-2xl font-semibold">Brakes</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onFormSubmit)}
                    className="space-y-6 px-2"
                >
                    <FormField
                        control={form.control}
                        name="fluidLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fluid Level</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select fluid level" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {FluidLevelEnum.map((level) => (
                                            <SelectItem
                                                key={level}
                                                value={level}
                                            >
                                                {level}
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
                        name="frontCondition"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Front Condition</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select front condition" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {ConditionEnum.map((condition) => (
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
                        name="rearCondition"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rear Condition</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select rear condition" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {ConditionEnum.map((condition) => (
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
                        name="emergencyBrakeCondition"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Emergency Brake Condition</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select emergency brake condition" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {FluidLevelEnum.map((level) => (
                                            <SelectItem
                                                key={level}
                                                value={level}
                                            >
                                                {level}
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
        </div>
    );
}
