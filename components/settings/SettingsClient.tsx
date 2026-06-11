"use client";

// Imports
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileForm } from "./ProfileForm";

//  Profile Schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  email: z.string().email("Please enter a valid email address"),

  bio: z.string().max(500, "Bio must be under 500 characters").optional(),

  phone: z.string().optional(),

  location: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export function SettingsClient() {
  // States
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.avatar || "");

  // Profile form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      name: user?.name || "",

      email: user?.email || "",

      bio: user?.bio || "",

      phone: user?.phone || "",

      location: user?.location || "",
    },
  });

  // Generate random avatar
  const handleChangeAvatar = () => {
    const seed = Math.random().toString(36).substring(2, 10);

    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

    setProfileImage(avatarUrl);
  };

  // Handle submit
  async function onSubmit(values: ProfileFormValues) {
    setIsLoading(true);

    try {
      await updateUser({
        ...values,

        avatar: profileImage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="mt-2 text-muted-foreground">
          Manage your profile information and preferences
        </p>
      </div>

      {/* Avatar */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>

        <CardContent>
          <ProfileAvatar
            profileImage={profileImage}
            userName={user?.name}
            onChangeAvatar={handleChangeAvatar}
          />
        </CardContent>
      </Card>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>

          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>

        <CardContent>
          <ProfileForm form={form} isLoading={isLoading} onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
