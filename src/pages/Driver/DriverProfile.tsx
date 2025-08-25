
import {
  useGetMeQuery,
  useUpdateMeMutation,
  useChangePasswordMutation,
  useUpdateEmergencyContactsMutation,
} from '../../api/userApi'
import toast from 'react-hot-toast'
import ProfileForm from '../../components/forms/ProfileForm'
import ChangePasswordForm from '../../components/forms/ChangePasswordForm'
import EmergencyContacts from '../../components/forms/EmergencyContacts'

export default function DriverProfile() {
  const { data, isLoading } = useGetMeQuery()
  const me = data?.data
  const [updateMe, { isLoading: saving }] = useUpdateMeMutation()
  const [changePass, { isLoading: changing }] = useChangePasswordMutation()
  const [updateContacts, { isLoading: savingContacts }] = useUpdateEmergencyContactsMutation()

  if (isLoading) return <div className="p-6">Loading...</div>
  if (!me) return <div className="p-6 text-red-600">Failed to load profile</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
      <h1 className="text-2xl font-bold">Driver Profile</h1>
      <div className="text-sm text-gray-600 mb-2">
        Approved: <b>{String(me.isApproved)}</b> · Blocked: <b>{String(me.isBlocked)}</b> · Online: <b>{String(me.isOnline)}</b>
      </div>

      {/* Profile Info */}
      <div className="p-5 rounded-2xl border bg-white shadow">
        <h2 className="font-semibold mb-3">Basic & Vehicle Info</h2>
        <ProfileForm
          me={me}
          role="driver"
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

      {/* Change Password */}
      <div className="p-5 rounded-2xl border bg-white shadow">
        <h2 className="font-semibold mb-3">Password</h2>
        <ChangePasswordForm
          loading={changing}
          onChange={async (p) => {
            try {
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

      {/* Emergency Contacts */}
      <div className="p-5 rounded-2xl border bg-white shadow">
        <h2 className="font-semibold mb-3">Safety – Emergency Contacts</h2>
        <EmergencyContacts
          me={me}
          saving={savingContacts}
          onSave={async (contacts) => {
            try {
              // ✅ Correct key for mutation
              await updateContacts({ emergencyContacts: contacts }).unwrap()
              toast.success('Emergency contacts saved')
            } catch (e: any) {
              toast.error(e?.data?.message || 'Save failed')
            }
          }}
        />
      </div>
    </div>
  )
}
