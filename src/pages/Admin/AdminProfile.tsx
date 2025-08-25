
import { useGetMeQuery, useUpdateMeMutation, useChangePasswordMutation } from '../../api/userApi'
import ProfileForm from '../../components/forms/ProfileForm'
import ChangePasswordForm from '../../components/forms/ChangePasswordForm'
import toast from 'react-hot-toast'

export default function AdminProfile() {
  const { data, isLoading } = useGetMeQuery()
  const me = data?.data
  const [updateMe, { isLoading: saving }] = useUpdateMeMutation()
  const [changePass, { isLoading: changing }] = useChangePasswordMutation()

  if (isLoading) return <div className="p-6">Loading...</div>
  if (!me) return <div className="p-6 text-red-600">Failed to load profile</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
      <h1 className="text-2xl font-bold">Admin Profile</h1>

      {/* Profile Section */}
      <div className="p-5 rounded-2xl border bg-white shadow">
        <h2 className="font-semibold mb-3">Basic Info</h2>
        <ProfileForm
          me={me}
          role="admin"
          submitting={saving}
          onSubmit={async (payload) => {
            try {
              await updateMe(payload).unwrap()
              toast.success('Profile updated')
            } catch (e: any) {
              toast.error(e?.data?.message || 'Update failed')
            }
          }}
        />
      </div>

      {/* Password Section */}
      <div className="p-5 rounded-2xl border bg-white shadow">
        <h2 className="font-semibold mb-3">Password</h2>
        <ChangePasswordForm
          loading={changing}
          onChange={async (p) => {
            try {
              // ✅ Correct payload for RTK Query
              await changePass({
                currentPassword: p.currentPassword,
                newPassword: p.newPassword,
              }).unwrap()
              toast.success('Password changed')
            } catch (e: any) {
              toast.error(e?.data?.message || 'Change failed')
            }
          }}
        />
      </div>
    </div>
  )
}
