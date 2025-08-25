import { useEffect, useRef, useState } from 'react'
import { useGetNotificationsQuery, useMarkNotificationReadMutation } from '../api/userApi'
import { Bell } from 'lucide-react'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'

export default function NotificationBell() {
  const { data, isFetching } = useGetNotificationsQuery({ unreadOnly: false })
  const [markRead] = useMarkNotificationReadMutation()
  const [open, setOpen] = useState(false)
  const prevIds = useRef<string[]>([])

  const items = data?.data || []
  const unreadCount = items.filter(n => !n.read).length

  // New notifications toast
  useEffect(() => {
    const ids = items.map(i => i._id)
    const newOnes = items.filter(i => !prevIds.current.includes(i._id))
    if (newOnes.length) {
      newOnes.forEach(n => {
        const title = n.title || 'Notification'
        toast(`${title}: ${n.message}`, { icon: '🔔' })
      })
    }
    prevIds.current = ids
  }, [items])

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="relative p-2 rounded-full hover:bg-gray-100"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-2xl shadow-xl z-50">
          <div className="p-3 border-b font-semibold">
            Notifications {isFetching && <span className="text-xs text-gray-400">(sync…)</span>}
          </div>
          <div className="max-h-80 overflow-auto">
            {items.length === 0 ? (
              <div className="p-3 text-sm text-gray-500">No notifications</div>
            ) : (
              items.map(n => (
                <div key={n._id} className={`p-3 border-b last:border-b-0 ${!n.read ? 'bg-indigo-50' : ''}`}>
                  <div className="text-sm font-medium">{n.title}</div>
                  <div className="text-sm text-gray-600">{n.message}</div>
                  <div className="text-xs text-gray-400 mt-1">{dayjs(n.createdAt).format('MMM D, h:mm A')}</div>
                  {!n.read && (
                    <button
                      onClick={() => markRead(n._id)}
                      className="text-xs mt-2 px-2 py-1 rounded bg-indigo-600 text-white"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
