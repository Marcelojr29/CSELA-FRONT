export interface EditPhotoModalProps {
    photo: any
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (photo: any) => void
}