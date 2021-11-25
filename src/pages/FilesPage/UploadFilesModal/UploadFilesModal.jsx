import { Button } from '@consta/uikit/Button'

import FileDropper from './FileDropper'

import { Icons, Modal } from 'components'

import styles from './upload-files-modal.module.scss'

const UploadFilesModal = (props) => {
  const { selectedFiles, updateFiles, onFilesSelected, onClose } = props

  return (
    <Modal
      isOpen={true}
      hasOverlay
      unsavedPopup
      title="Upload Files"
      onClose={onClose}
    >
      <FileDropper
        updateFiles={updateFiles}
        defaultFiles={selectedFiles}
        onFilesSelected={onFilesSelected}
      />

      <Button
        className={styles.nextButton}
        label="Next"
        size="l"
        disabled={!selectedFiles.length}
        iconRight={() => <Icons.Arrow />}
        onClick={() => onFilesSelected(selectedFiles)}
      />
    </Modal>
  )
}

export default UploadFilesModal
