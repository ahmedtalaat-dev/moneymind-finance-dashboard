"use client";

// Imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarProps } from "@/types";

export function ProfileAvatar({
  profileImage,
  userName,
  onChangeAvatar,
}: AvatarProps) {
  return (
    <div className="flex items-center gap-6">
      {/* Avatar Section */}
      <Avatar className="h-24 w-24">
        {/* User avatar image */}
        <AvatarImage src={profileImage} alt={userName || "User avatar"} />

        {/* Fallback when image is unavailable */}
        <AvatarFallback>{userName?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>

      {/* Generate new avatar */}
      <div>
        <Button
          className="hover:text-white"
          type="button"
          variant="outline"
          onClick={onChangeAvatar}
        >
          Change Avatar
        </Button>

        <p className="mt-2 text-sm text-muted-foreground">
          Generate a random avatar
        </p>
      </div>
    </div>
  );
}
