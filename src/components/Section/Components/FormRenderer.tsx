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
            "h-6 px-4 inline-flex items-center self-start transition-colors duration-300",
            error ? "bg-secondary text-white-pure" : isFocused ? "bg-primary text-black-pure" : "bg-black-pure text-white-pure"
        )}>
            <span className="text-[9px] font-mono font-black uppercase tracking-[0.3em]">
                {label}
            </span>
        </div>
        <div className={cn(
            "relative flex items-stretch border-l-8 transition-all duration-300",
            error ? "border-secondary bg-secondary/5" : isFocused ? "border-primary bg-primary/5" : "border-black-pure bg-white-pure"
        )}>
            {children}
            {isFocused && <div className="w-2 bg-black-pure border-y border-r border-black-pure animate-pulse" />}
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
                        "flex-1 h-14 bg-transparent px-6 text-[11px] font-mono font-black uppercase tracking-[0.25em] outline-none border-y border-r border-black-pure text-black-pure placeholder:text-black-pure/20",
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
                        "flex-1 min-h-[120px] bg-transparent p-6 text-[11px] font-mono font-black uppercase tracking-[0.25em] outline-none border-y border-r border-black-pure text-black-pure placeholder:text-black-pure/20 resize-none",
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
                <div className="flex-1 h-14 bg-transparent px-6 flex items-center border-y border-r border-black-pure">
                    <input
                        ref={ref}
                        type="checkbox"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-5 h-5 accent-primary border-2 border-black-pure cursor-pointer"
                        {...props}
                    />
                    <span className="ml-4 text-[10px] font-mono font-black uppercase text-black-pure/60 italic">Confirm selection</span>
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
            <div className="border-l-8 border-primary bg-primary/5 p-10">
                <h3 className="text-2xl font-mono font-black text-primary tracking-tighter italic uppercase underline decoration-4">Confirmed</h3>
                <p className="text-white-pure font-mono text-[10px] tracking-[0.2em] mt-4 leading-loose">
                    WE HAVE YOUR INFORMATION. THE TEAM WILL BE IN TOUCH.
                </p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6">
                {form.fields?.map((field) => {
                    if (field.blockType === 'message') return null

                    const common = {
                        label: field.label || field.name,
                        name: field.name,
                        required: !!field.required,
                        placeholder: (field as any).defaultValue || '',
                        containerClassName: field.width === 50 ? "md:col-span-1" : "md:col-span-2"
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

            <div className="mt-4 self-start">
                <ClippedButton
                    label={status === 'loading' ? 'SENDING' : (form.submitButtonLabel?.toUpperCase().replace(' ', '_') || 'APPLY_NOW')}
                    variant="primary"
                    size="lg"
                    onClick={() => { }}
                />
            </div>

            {status === 'error' && (
                <div className="bg-secondary/10 border-l-4 border-secondary p-4">
                    <span className="text-secondary font-mono text-[10px] font-black uppercase tracking-widest animate-pulse">
                        SOMETHING WENT WRONG. PLEASE TRY AGAIN.
                    </span>
                </div>
            )}
        </form>
    )
}