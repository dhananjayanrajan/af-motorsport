// @/components/Custom/ui/ClippedSelect.tsx
'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
import { cn } from '@/utilities/cn'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import * as React from 'react'

const diamondClip = 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)'

const ClippedSelect = SelectPrimitive.Root
const ClippedSelectGroup = SelectPrimitive.Group
const ClippedSelectValue = SelectPrimitive.Value

const ClippedSelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { error?: boolean; valid?: boolean; filled?: boolean }
>(({ className, children, error, valid, filled, ...props }, ref) => (
    <div className="group relative w-full max-w-xs">
        <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
                `relative flex h-14 w-full items-center justify-between px-10 text-[12px] font-bold uppercase tracking-[0.2em] outline-none transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_SLOW}`,
                'bg-zinc-200/50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 backdrop-blur-md',
                filled ? 'text-black dark:text-white' : 'text-zinc-500',
                error && 'bg-red-500/10',
                className,
            )}
            style={{ clipPath: diamondClip }}
            {...props}
        >
            <span className="truncate relative z-10">{children}</span>
            <SelectPrimitive.Icon asChild>
                <ChevronDown className={cn(
                    `relative z-10 h-4 w-4 text-zinc-500 transition-transform ${DESIGN_SYSTEM.ANIMATION.DURATION_SLOW} group-data-[state=open]:rotate-180`,
                    'group-data-[state=open]:text-black dark:group-data-[state=open]:text-white'
                )} />
            </SelectPrimitive.Icon>

            <div
                className="absolute inset-0 pointer-events-none border border-black/[0.08] dark:border-white/[0.08]"
                style={{ clipPath: diamondClip }}
            />

            <div className={cn(
                "absolute bottom-0 left-0 h-[4px] w-full transition-transform duration-500 ease-out translate-x-[-100%] group-data-[state=open]:translate-x-0",
                error ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" :
                    valid ? `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] shadow-[0_0_15px_${DESIGN_SYSTEM.COLORS.PRIMARY}80]` :
                        "bg-black dark:bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            )} />
        </SelectPrimitive.Trigger>
    </div>
))
ClippedSelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const ClippedSelectContent = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            className={cn(
                'relative z-50 min-w-[8rem] overflow-hidden bg-white dark:bg-zinc-900 text-black dark:text-white shadow-[20px_20px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_0_40px_rgba(0,0,0,0.6)] border-none',
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                position === 'popper' && 'data-[side=bottom]:translate-y-2',
                className,
            )}
            position={position}
            {...props}
        >
            <SelectPrimitive.Viewport
                className={cn(
                    'p-1',
                    position === 'popper' && 'h-[var(--radix-select-content-available-height)] w-full min-w-[var(--radix-select-trigger-width)]',
                )}
            >
                {children}
            </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
))
ClippedSelectContent.displayName = SelectPrimitive.Content.displayName

const ClippedSelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            `relative flex w-full cursor-default select-none items-center py-4 pl-10 pr-4 text-[12px] font-bold uppercase tracking-[0.2em] outline-none transition-colors focus:bg-black dark:focus:bg-white focus:text-white dark:focus:text-black data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
            className,
        )}
        {...props}
    >
        <span className="absolute left-4 flex h-3.5 w-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <Check className="h-4 w-4" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY }} />
            </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
))
ClippedSelectItem.displayName = SelectPrimitive.Item.displayName

export {
    ClippedSelect, ClippedSelectContent, ClippedSelectGroup, ClippedSelectItem, ClippedSelectTrigger, ClippedSelectValue
}
