import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const ReportDetailsModal = ({ closeModal, isOpen, lesson }) => {
  // console.log(lesson)
  const {lessonTitle, reports} = lesson
  // console.log(lessonTitle, reports)

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
            className='w-full max-w-lg bg-gray-300 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
          >
            <DialogTitle
              as='h3'
              className='text-2xl font-medium text-center leading-6 text-pink-500'
            >
              Report Lesson Details
            </DialogTitle>
            <div className='mt-2 w-full'>
              <h2 className='text-lg font-bold mt-6 text-gray-600'>Title: <span className='text-purple-500'>{lessonTitle}</span></h2>
              {
                reports.map((report, i) => <div key={i}>
                  <div className="flex justify-between items-center text-lg">
                    <div className='py-4'>
                      <p className='text-gray-600'>Reporter: <span className='font-bold'>{report.displayName}</span></p>
                    </div>
                    <div>
                      <p className='text-gray-600'>Reason: <span className='font-bold'>{report.reason}</span></p>
                    </div>
                  </div>
                </div>)
              }
            </div>
            <div className='flex justify-center pt-6'>
              <button
              onClick={closeModal}
              type='button'
              className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
            >
              Ok
            </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default ReportDetailsModal
