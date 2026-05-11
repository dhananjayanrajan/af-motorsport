"use client"

import { ClippedButton } from '@/components/Clipped/ClippedButton'
import { Form as FormType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React, { forwardRef, useState } from 'react'

interface BaseProps {
    label: string
    error?: boolean
    containerClassName?: string
}

const InputWrapper = ({ label, error, isFocused, children, containerClassName }: BaseProps & { isFocused: boolean, children: React.ReactNode }) => (
    <div className={cn('relative w-full flex flex-col', containerClassName)}>
        <div className={cn(
            "h-5 px-3 inline-flex items-center self-start transition-colors duration-300",
            error ? "bg-secondary-500 text-white-pure" : isFocused ? "bg-primary-500 text-black-pure" : "bg-black-pure text-white-pure"
        )}>
            <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em]">
                {label}
            </span>
        </div>
        <div className={cn(
            "relative flex items-stretch border-l-4 transition-all duration-300",
            error ? "border-secondary-500" : isFocused ? "border-primary-500" : "border-black-pure"
        )}>
            {children}
        </div>
    </div>
)

const FormInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & BaseProps>(
    ({ label, error, containerClassName, className, onFocus, onBlur, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false)
        return (
            <InputWrapper label={label} error={error} isFocused={isFocused} containerClassName={containerClassName}>
                <input
                    ref={ref}
                    onFocus={(e) => { setIsFocused(true); onFocus?.(e) }}
                    onBlur={(e) => { setIsFocused(false); onBlur?.(e) }}
                    className={cn(
                        "flex-1 h-10 bg-white-pure px-3 text-[10px] font-mono font-black uppercase tracking-[0.1em] outline-none border-y border-r border-black-pure text-black-pure placeholder:text-black-pure/30",
                        className
                    )}
                    {...props}
                />
            </InputWrapper>
        )
    }
)
FormInput.displayName = 'FormInput'

const FormTextArea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & BaseProps>(
    ({ label, error, containerClassName, className, onFocus, onBlur, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false)
        return (
            <InputWrapper label={label} error={error} isFocused={isFocused} containerClassName={containerClassName}>
                <textarea
                    ref={ref}
                    onFocus={(e) => { setIsFocused(true); onFocus?.(e) }}
                    onBlur={(e) => { setIsFocused(false); onBlur?.(e) }}
                    className={cn(
                        "flex-1 min-h-[80px] bg-white-pure p-3 text-[10px] font-mono font-black uppercase tracking-[0.1em] outline-none border-y border-r border-black-pure text-black-pure placeholder:text-black-pure/30 resize-none",
                        className
                    )}
                    {...props}
                />
            </InputWrapper>
        )
    }
)
FormTextArea.displayName = 'FormTextArea'

const FormCheckbox = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & BaseProps>(
    ({ label, error, containerClassName, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false)
        return (
            <InputWrapper label={label} error={error} isFocused={isFocused} containerClassName={containerClassName}>
                <div className="flex-1 h-10 bg-white-pure px-3 flex items-center border-y border-r border-black-pure">
                    <input
                        ref={ref}
                        type="checkbox"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="size-4 accent-primary-500 border-2 border-black-pure cursor-pointer"
                        {...props}
                    />
                    <span className="ml-3 text-[9px] font-mono font-black uppercase text-black-pure">Confirm</span>
                </div>
            </InputWrapper>
        )
    }
)
FormCheckbox.displayName = 'FormCheckbox'

export const FormRenderer: React.FC<{ form: FormType }> = ({ form }) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setStatus('loading')
        const formData = new FormData(e.currentTarget)

        const fields = form.fields || []
        const submissionData = fields.map((field) => {
            if (field.blockType === 'message') return null
            const value = formData.get(field.name)
            return {
                field: field.name,
                value: field.blockType === 'checkbox' ? (value ? 'true' : 'false') : String(value || ''),
            }
        }).filter((item): item is { field: string; value: string } => item !== null)

        try {
            const res = await fetch('/api/form-submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ form: form.id, submissionData }),
            })
            if (res.ok) setStatus('success')
            else setStatus('error')
        } catch {
            setStatus('error')
        }
    }

    if (status === 'success') {
        return (
            <div className="border-l-4 border-primary-500 bg-white-pure p-6">
                <h3 className="text-xl font-mono font-black text-black-pure uppercase">Confirmed</h3>
                <p className="text-black-pure font-mono text-[9px] tracking-[0.1em] mt-2 uppercase">
                    Information received.
                </p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-4">
                {form.fields?.map((field) => {
                    if (field.blockType === 'message') return null

                    const common = {
                        label: field.label || field.name,
                        name: field.name,
                        required: !!field.required,
                        placeholder: (field as any).defaultValue || '',
                        containerClassName: "col-span-1"
                    }

                    switch (field.blockType) {
                        case 'textarea': return <FormTextArea key={field.id} {...common} />
                        case 'checkbox': return <FormCheckbox key={field.id} {...common} />
                        case 'email': return <FormInput key={field.id} {...common} type="email" />
                        case 'number': return <FormInput key={field.id} {...common} type="number" />
                        default: return <FormInput key={field.id} {...common} type="text" />
                    }
                })}
            </div>

            <div className="mt-2">
                <ClippedButton
                    label={status === 'loading' ? 'Sending' : (form.submitButtonLabel?.toUpperCase() || 'Submit')}
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => { }}
                />
            </div>

            {status === 'error' && (
                <div className="bg-secondary-500 border-l-2 border-black-pure p-3">
                    <span className="text-black-pure font-mono text-[8px] font-black uppercase tracking-widest">
                        Error. Try again.
                    </span>
                </div>
            )}
        </form>
    )
}