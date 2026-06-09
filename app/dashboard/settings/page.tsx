'use client'

import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

export default function SettingsPage() {
  const { user, updateUser } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(user?.avatar || '')

  const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    bio: z.string().max(500, 'Bio must be under 500 characters').optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
  })

  type ProfileFormValues = z.infer<typeof profileSchema>

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      phone: user?.phone || '',
      location: user?.location || '',
    },
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setProfileImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const generateRandomAvatar = () => {
    const seed = Math.random().toString(36).substring(2, 10)
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
  }

  const handleChangeAvatar = () => {
    const newAvatar = generateRandomAvatar()
    setProfileImage(newAvatar)
  }

  async function onSubmit(values: ProfileFormValues) {
    setIsLoading(true)
    try {
      await updateUser({
        ...values,
        avatar: profileImage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your profile information and preferences
        </p>
      </div>

      {/* Profile Image */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            Update or change your profile avatar
          </CardDescription>
        </CardHeader>

        <CardContent className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={profileImage} />
            <AvatarFallback>
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>

          <div>
            <label htmlFor="avatar-upload">
              <Button onClick={handleChangeAvatar} variant="outline">
                Change Picture
              </Button>
            </label>

            <input
              id="avatar-upload"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />

            <p className="text-sm text-muted-foreground mt-2">
              You can upload an image or generate a random avatar
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal details
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your phone number for contact purposes
                    </FormDescription>
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
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Your city or country
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full min-h-[100px] border rounded-md p-2"
                        placeholder="Write something about yourself..."
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>
                      {field.value?.length || 0} / 500 characters
                    </FormDescription>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline">
                  Cancel
                </Button>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  )
}