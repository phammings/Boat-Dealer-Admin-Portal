import { Label } from "@/components/ui/label"

export const RequiredLabel = ({ children }: { children: string }) => (
  <Label>
    {children} <span className="text-red-500">*</span>
  </Label>
)

export const FieldError = ({ error }: { error?: string }) =>
  error ? <p className="text-sm text-red-500 mt-1">{error}</p> : null