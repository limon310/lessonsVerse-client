import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast'
import { FaExclamationTriangle } from 'react-icons/fa'

const ReportModal = ({ closeModal, isOpen, lesson }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const reportReasons = [
    { value: "inappropriate", text: "Inappropriate Content" },
    { value: "hate", text: "Hate Speech or Harassment" },
    { value: "misleading", text: "Misleading or False Information" },
    { value: "spam", text: "Spam or Promotional Content" },
    { value: "sensitive", text: "Sensitive or Disturbing Content" },
    { value: "copyright", text: "Copyright Violation" },
    { value: "privacy", text: "Privacy Violation" },
    { value: "selfharm", text: "Self-Harm or Suicide Content" },
    { value: "violence", text: "Violent or Graphic Content" },
    { value: "other", text: "Other" },
  ];

  const handleReport = (e) => {
    e.preventDefault();
    const reason = e.target.reason.value;
    if (!reason) return;

    axiosSecure.post(`/report-lesson/${lesson._id}`, {
      email: user?.email,
      displayName: user?.displayName,
      userId: user?.uid,
      reason
    })
      .then(res => {
        if (res.data.success) {
          toast.success("Reported successfully");
          closeModal();
        }
      });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Backdrop Animation */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-8 text-left align-middle shadow-2xl transition-all border border-base-300">

                {/* Header Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-error/10 rounded-full">
                    <FaExclamationTriangle className="text-error text-xl" />
                  </div>
                  <DialogTitle as="h3" className="text-2xl font-bold leading-6 text-neutral">
                    Report Content
                  </DialogTitle>
                </div>

                <p className="text-sm text-neutral-content leading-relaxed mb-6">
                  Reporting helps us keep the community safe. This report is
                  <strong> confidential</strong> and our moderators will review it shortly.
                </p>

                <form onSubmit={handleReport} className="space-y-6">
                  <div>
                    <label htmlFor="reason" className="block text-sm font-semibold text-neutral mb-2">
                      Reason for report
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      className="select select-bordered w-full bg-base-200 text-neutral focus:ring-2 focus:ring-primary focus:border-primary border-base-300 h-12"
                      required
                    >
                      <option value="" disabled selected>Select a reason...</option>
                      {reportReasons.map(reason => (
                        <option key={reason.value} value={reason.value}>
                          {reason.text}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row-reverse gap-3 mt-8">
                    <button
                      type="submit"
                      className="btn btn-error text-white sm:flex-1"
                    >
                      Confirm Report
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="btn btn-ghost border border-base-300 sm:flex-1 text-neutral-content"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ReportModal