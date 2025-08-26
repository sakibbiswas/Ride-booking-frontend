
import {
  useGetMeQuery,
  useUpdateMeMutation,
  useChangePasswordMutation,
  useUpdateEmergencyContactsMutation,
} from '../../api/userApi'
import ProfileForm from '../../components/forms/ProfileForm'
import ChangePasswordForm from '../../components/forms/ChangePasswordForm'
import EmergencyContacts from '../../components/forms/EmergencyContacts'
import toast from 'react-hot-toast'
import { useMemo, useState, useEffect } from 'react'

type Tab = 'profile' | 'password' | 'safety'
type Role = 'admin' | 'rider' | 'driver'

export default function SettingsPage() {
  const { data, isLoading, refetch } = useGetMeQuery()
  const me = data?.data
  const [tab, setTab] = useState<Tab>('profile')

  const [updateMe, { isLoading: saving }] = useUpdateMeMutation()
  const [changePass, { isLoading: changing }] = useChangePasswordMutation()
  const [updateContacts, { isLoading: savingContacts }] = useUpdateEmergencyContactsMutation()

  const role = useMemo<Role>(() => {
    const r = me?.role?.toLowerCase()
    if (r === 'admin') return 'admin'
    if (r === 'driver') return 'driver'
    return 'rider'
  }, [me])

  const availableTabs: Tab[] = useMemo(() => {
    if (!me) return ['profile', 'password']
    return role === 'admin' ? ['profile', 'password'] : ['profile', 'password', 'safety']
  }, [me, role])

  useEffect(() => {
    if (!availableTabs.includes(tab)) setTab(availableTabs[0])
  }, [availableTabs, tab])

  if (isLoading)
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-indigo-700 font-semibold animate-pulse">
        Loading…
      </div>
    )
  if (!me)
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-red-600 font-bold">
        Failed to load profile
      </div>
    )

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 px-4 py-12">
      {/* Floating colorful shapes */}
      <div className="absolute top-10 left-[-80px] w-60 h-60 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-[-100px] w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-80px] left-20 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-500 animate-gradient-x">
            Settings
          </h1>
          <div className="text-sm text-gray-700">
            Role: <b className="uppercase text-indigo-700">{role}</b> · Email:{' '}
            <b className="text-pink-600">{me.email}</b>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3">
          {availableTabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-2xl font-semibold transition-all duration-300 transform ${
                tab === t
                  ? 'bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-500 text-white shadow-lg shadow-indigo-200 scale-105'
                  : 'bg-white text-gray-700 border border-gray-300 hover:shadow-lg hover:scale-105'
              }`}
            >
              {t === 'profile' ? 'Profile' : t === 'password' ? 'Password' : 'Safety'}
            </button>
          ))}
        </div>

        {/* Panels */}
        <div className="p-8 rounded-3xl bg-white shadow-2xl border border-gray-200 hover:shadow-3xl transition-shadow duration-500">
          {/* PROFILE */}
          {tab === 'profile' && (
            <>
              {role === 'driver' && (
                <div className="mb-4 text-sm text-gray-600">
                  Approved: <b>{String(me.isApproved)}</b> · Blocked: <b>{String(me.isBlocked)}</b> ·
                  Online: <b>{String(me.isOnline)}</b>
                </div>
              )}
              <ProfileForm
                me={me}
                role={role}
                submitting={saving}
                onSubmit={async payload => {
                  try {
                    await updateMe(payload).unwrap()
                    toast.success('Profile updated')
                    refetch()
                  } catch (e: any) {
                    toast.error(e?.data?.message || 'Update failed')
                  }
                }}
              />
            </>
          )}

          {/* PASSWORD */}
          {tab === 'password' && (
            <ChangePasswordForm
              loading={changing}
              onChange={async payload => {
                try {
                  await changePass({
                    currentPassword: payload.currentPassword,
                    newPassword: payload.newPassword,
                  }).unwrap()
                  toast.success('Password changed')
                } catch (e: any) {
                  toast.error(e?.data?.message || 'Change failed')
                }
              }}
            />
          )}

          {/* SAFETY */}
          {tab === 'safety' && role !== 'admin' && (
            <EmergencyContacts
              me={me}
              saving={savingContacts}
              onSave={async contacts => {
                try {
                  await updateContacts({ emergencyContacts: contacts }).unwrap()
                  toast.success('Emergency contacts saved')
                  refetch()
                } catch (e: any) {
                  toast.error(e?.data?.message || 'Save failed')
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
