"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export function Toaster() {
  const [_document, setDocument] = useState<Document>()
  const { toasts } = useToast()

  useEffect(() => {
    setDocument(document)
  }, [])

  const content = (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )

  if (_document) {
    return createPortal(content, _document?.body)
  }

  return null
}
