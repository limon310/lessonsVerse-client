import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react'
import { X, User, MessageSquare, AlertCircle } from 'lucide-react'

const ReportDetailsModal = ({ closeModal, isOpen, lesson }) => {
  if (!lesson) return null;
  const { lessonTitle, reports } = lesson

  return (
    <Transition grow show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={closeModal}>
        {/* Darkened Overlay */}
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-neutral/60 backdrop-blur-sm' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-xl transform overflow-hidden rounded-3xl bg-base-100 p-8 text-left align-middle shadow-2xl transition-all border border-base-300'>

                {/* Close Button & Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <DialogTitle as='h3' className='text-2xl font-black text-neutral flex items-center gap-2'>
                      <AlertCircle className="text-error" size={28} />
                      Incident Report
                    </DialogTitle>
                    <p className="text-sm text-neutral-content font-medium mt-1">Reviewing community flags for this content</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-base-200 rounded-full transition-colors text-neutral-content"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Lesson Subject Card */}
                <div className="bg-base-200/50 rounded-2xl p-5 border border-base-300 mb-8">
                  <span className="text-[10px] uppercase tracking-widest font-black text-primary mb-1 block">Subject Lesson</span>
                  <h2 className='text-lg font-bold text-neutral leading-tight'>{lessonTitle}</h2>
                </div>

                {/* Reports Feed */}
                <div className='space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar'>
                  <h4 className="text-xs font-black uppercase tracking-tighter text-neutral-content/70 flex items-center gap-2 mb-4">
                    <MessageSquare size={14} /> Reports Log ({reports?.length})
                  </h4>

                  {reports?.map((report, i) => (
                    <div key={i} className="relative pl-6 pb-6 border-l-2 border-base-300 last:border-l-0 last:pb-0">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-base-300 border-4 border-base-100" />

                      <div className="bg-base-100 border border-base-300 rounded-2xl p-4 shadow-sm hover:border-error/30 transition-colors">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-neutral/10 flex items-center justify-center text-neutral">
                              <User size={16} />
                            </div>
                            <span className='font-bold text-sm text-neutral'>{report.displayName}</span>
                          </div>
                          <span className="text-[10px] font-mono opacity-40 uppercase">Reported By</span>
                        </div>

                        <div className="bg-error/5 border border-error/10 rounded-xl p-3">
                          <p className='text-sm text-neutral/80 leading-relaxed italic'>
                            "{report.reason}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className='mt-10 flex justify-end'>
                  <button
                    onClick={closeModal}
                    className='btn btn-primary px-8 rounded-xl shadow-lg shadow-primary/20 font-bold'
                  >
                    Acknowledged
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ReportDetailsModal
