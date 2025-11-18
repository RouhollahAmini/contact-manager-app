import { confirmAlert } from 'react-confirm-alert';

/**
 * نمایش دیالوگ تأیید حذف مخاطب
 * @param {string|number} contactId - شناسه مخاطب
 * @param {string} contactFullname - نام کامل مخاطب
 * @param {Function} onDeleteConfirm - تابعی که بعد از تأیید حذف فراخوانی می‌شود
 */
export const showDeleteConfirm = (contactId, contactFullname, onDeleteConfirm) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div role="alert" className="rounded-md border border-gray-300 bg-white p-4 shadow-sm">
                    <div className="flex items-start gap-4">
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 text-red-600"
                        >
                            <path
                                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            />
                        </svg>

                        <div className="flex-1">
                            <strong className="font-medium text-gray-900"> پاک کردن مخاطب </strong>

                            <p className="mt-0.5 text-sm text-gray-700">آیا از پاک کردن {contactFullname} مطمئن هستید؟</p>

                            <div className="mt-3 flex items-center gap-2">
                                <button
                                    type="button"
                                    className="rounded border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100"
                                    onClick={() => {
                                        onDeleteConfirm(contactId);
                                        onClose();
                                    }}
                                >
                                    مطمئن هستم
                                </button>

                                <button
                                    type="button"
                                    className="rounded border border-transparent px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                                    onClick={onClose}
                                >
                                    انصراف
                                </button>
                            </div>
                        </div>

                        <button
                            className="-m-3 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
                            type="button"
                            aria-label="Dismiss alert"
                            onClick={onClose}
                        >
                            <span className="sr-only">Dismiss popup</span>

                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )
        }
    })
};