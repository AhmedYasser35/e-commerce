import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import userPic from "../../../../assets/images/user.png";
import Image from "next/image";
import Link from "next/link";

export function DropdownMenuIcons({logout}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image alt="user" className="cursor-pointer" width={30} height={30} src={userPic} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          <Link href={'/profile'}>profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          <span onClick={logout}>logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
