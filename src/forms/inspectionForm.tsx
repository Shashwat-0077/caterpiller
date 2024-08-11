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
import { useRouter } from "next/navigation";

// Define the schema for form validation
const InspectionFormSchema = z.object({
    truckSerialNumber: z.string().min(1, "Truck serial number is required"),
    truckModel: z.string().min(1, "Truck model is required"),
    location: z.string().min(1, "Location is required"),
    meterHours: z
        .union([z.string().transform((val) => parseFloat(val)), z.number()])
        .refine((val) => !isNaN(val) && val >= 0, {
            message: "Meter hours must be a valid non-negative number.",
        }),
    customerName: z.string().min(1, "Customer name is required"),
    catCusID: z.string().min(1, "Customer ID is required"),
});

export function InspectionForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof InspectionFormSchema>>({
        resolver: zodResolver(InspectionFormSchema),
        defaultValues: {
            truckSerialNumber: "",
            truckModel: "",
            location: "",
            meterHours: 0,
            customerName: "",
            catCusID: "",
        },
    });

    async function onFormSubmit(data: z.infer<typeof InspectionFormSchema>) {
        const response = await fetch("/api/inspection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // This tells the server that the body is JSON
            },
            body: JSON.stringify({
                catCusID: data.catCusID,
                customerName: data.customerName,
                lat: 0,
                long: 0,
                location: data.location,
                meterHours: data.meterHours,
                truckModel: data.truckModel,
                truckSerialNumber: data.truckSerialNumber,
            }), // Convert the object to a JSON string
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();
        router.push(`/dashboard/${result.id}`);
    }

    return (
        <div id="inspection" className="space-y-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onFormSubmit)}
                    className="space-y-6 px-2"
                >
                    <FormField
                        control={form.control}
                        name="truckSerialNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Truck Serial Number</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter truck serial number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="truckModel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Truck Model</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter truck model"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter location"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="meterHours"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Meter Hours</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter meter hours"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="customerName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Customer Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter customer name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="catCusID"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Customer ID</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter customer ID"
                                        {...field}
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
