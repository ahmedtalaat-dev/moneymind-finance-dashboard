'use client'

import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
  const t = useTranslations('settings')

  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState(user?.avatar || '')

  const profileSchema = z.object({
    name: z.string().min(2, t('validation.name')),
    email: z.string().email(t('validation.email')),
    bio: z.string().max(500, t('validation.bio')).optional(),
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

  // 🎯 helper function
const generateRandomAvatar = () => {
  const seed = Math.random().toString(36).substring(2, 10)
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
}

// 🎯 Change avatar randomly
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
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
      </div>

      {/* Profile Image */}
      <Card>
        <CardHeader>
          <CardTitle>{t('profilePicture.title')}</CardTitle>
          <CardDescription>{t('profilePicture.desc')}</CardDescription>
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
              <Button
              onClick={handleChangeAvatar}
              variant="outline">
                {t('buttons.changePicture')}
              </Button>
            </label>

            <input
              id="avatar-upload"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
            />

            <p className="text-sm text-muted-foreground mt-2">
              {t('profilePicture.hint')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{t('profileInfo.title')}</CardTitle>
          <CardDescription>{t('profileInfo.desc')}</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profileInfo.name')}</FormLabel>
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
                    <FormLabel>{t('profileInfo.email')}</FormLabel>
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
                    <FormLabel>{t('profileInfo.phone')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      {t('profileInfo.phoneHint')}
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profileInfo.location')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      {t('profileInfo.locationHint')}
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('profileInfo.bio')}</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full min-h-[100px] border rounded-md p-2"
                        placeholder={t('profileInfo.bioPlaceholder')}
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>
                      {field.value?.length || 0} / 500 {t('profileInfo.characters')}
                    </FormDescription>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline">
                  {t('buttons.cancel')}
                </Button>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? t('buttons.saving') : t('buttons.save')}
                </Button>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  )
}