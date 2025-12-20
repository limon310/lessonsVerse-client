import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast'

const ReportModal = ({ closeModal, isOpen, lesson }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // console.log("from lesson report modal", lesson);

  // report reasons array
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
    { value: "misleading_ad", text: "Misleading Advertisement" },
    { value: "fake_news", text: "False or Fake News" },
    { value: "harassment", text: "Harassment or Bullying" },
    { value: "other", text: "Other" },
  ];

  // handle report reason
  const handleReport = (e) => {
    e.preventDefault();
    const data = e.target.reason.value;
    // console.log(data);

    const reason = e.target.reason.value;
    // console.log(reason);
    if (!reason) return;

    axiosSecure.post(`/report-lesson/${lesson._id}`, { email: user?.email, displayName: user?.displayName, userId: user?.uid, reason })
      .then(res => {
        if (res.data.success) {
          toast.success("Reported successfully");
          closeModal();
        }
      });
  };

  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none '
      onClose={closeModal}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto '>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            transition
            className='w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
          >
            <DialogTitle
              as='h3'
              className='text-xl font-medium text-center leading-6 text-gray-900'
            >
              Report Lesson
            </DialogTitle>
            <p className="text-sm text-muted-foreground py-3">
              Reporting helps us review content that may violate community
              guidelines. Reports are confidential.
            </p>
            <form onSubmit={handleReport}>
              <fieldset className="fieldset py-4">
                <label htmlFor="privacy" className="mb-2 text-sm font-medium text-gray-700">
                  Reason for report
                </label>
                <select
                  id="reason"
                  name="reason"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {reportReasons.map(reason => (
                    <option className='text-lg ' key={reason.value} value={reason.value}>
                      {reason.text}
                    </option>
                  ))}
                </select>

                <button
                  type='submit'
                  className='cursor-pointer mt-3 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                >
                  Confirm Report
                </button>
              </fieldset>
            </form>
            <button
              onClick={closeModal}
              type='button'
              className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
            >
              Cancel
            </button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ReportModal
