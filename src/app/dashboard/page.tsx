import { auth } from "@/auth";
import TruckCard from "@/components/ui/TruckCard";

export default async function Dashboard() {
    const session = await auth();

    return (
        <div>
            <TruckCard
                image="https://images.unsplash.com/photo-1622645916455-aa13b87438ec?q=80&w=2526&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                name="Sample"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, dolorem."
            />
        </div>
    );
}
