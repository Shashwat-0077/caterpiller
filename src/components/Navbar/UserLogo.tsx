"use clint";
import Image from "next/image";
import { signOut } from "next-auth/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type PropType = {
    image: string;
    username?: string | null;
};

export default function UserLogo({ image, username }: PropType) {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <div className="relative h-10 w-10 overflow-hidden rounded-full hover:cursor-pointer">
                    <Image src={image} alt="user" fill className="w-full" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{username || "User"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <span className="w-full" onClick={()=>signOut()}>Sign Out</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
