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
                `relative flex h-14 w-full items-center justify-between px-10 text-[10px] font-bold uppercase tracking-[0.2em] outline-none transition-all ${DESIGN_SYSTEM.ANIMATION.DURATION_SLOW}`,
                'bg-zinc-900 hover:bg-zinc-800 focus:bg-zinc-800 disabled:cursor-not-allowed',
                filled ? 'text-white' : 'text-zinc-600',
                error && 'bg-red-950/40',
                valid && !error && `bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/10`,
                props.disabled && 'opacity-50 bg-zinc-950',
                className,
            )}
            style={{ clipPath: diamondClip }}
            {...props}
        >
            <span className="truncate">{children}</span>
            <SelectPrimitive.Icon asChild>
                <ChevronDown className={`h-3 w-3 text-zinc-600 transition-transform ${DESIGN_SYSTEM.ANIMATION.DURATION_SLOW} group-data-[state=open]:rotate-180 group-data-[state=open]:text-[${DESIGN_SYSTEM.COLORS.PRIMARY}]`} />
            </SelectPrimitive.Icon>
            <div
                className={cn(
                    `absolute inset-0 border pointer-events-none transition-colors ${DESIGN_SYSTEM.ANIMATION.DURATION_SLOW}`,
                    'border-zinc-800 group-focus-within:border-zinc-700',
                    error && 'border-red-600',
                    valid && !error && `border-[${DESIGN_SYSTEM.COLORS.PRIMARY}]/50`
                )}
                style={{ clipPath: diamondClip }}
            />
        </SelectPrimitive.Trigger>

        <div
            className={cn(
                'absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1px] transition-all duration-500',
                error ? 'w-2/3 bg-red-600 shadow-[0_0_12px_rgba(220,38,38,1)] opacity-100' :
                    valid ? `w-2/3 bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] shadow-[0_0_12px_rgba(0,255,65,1)] opacity-100` :
                        `w-0 bg-white group-focus-within:w-1/2 opacity-0 group-focus-within:opacity-100 group-focus-within:bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] group-focus-within:shadow-[0_0_12px_rgba(0,255,65,1)]`
            )}
        />
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
                'relative z-50 min-w-[8rem] overflow-hidden border border-zinc-800 bg-zinc-950 text-white shadow-2xl',
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
            `relative flex w-full cursor-default select-none items-center py-3 pl-10 pr-4 text-[9px] font-bold uppercase tracking-[0.2em] outline-none transition-colors focus:bg-[${DESIGN_SYSTEM.COLORS.PRIMARY}] focus:text-black data-[disabled]:pointer-events-none data-[disabled]:opacity-50`,
            className,
        )}
        {...props}
    >
        <span className="absolute left-4 flex h-3.5 w-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <Check className="h-3 w-3" />
            </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
))
ClippedSelectItem.displayName = SelectPrimitive.Item.displayName

export {
    ClippedSelect, ClippedSelectContent, ClippedSelectGroup, ClippedSelectItem, ClippedSelectTrigger, ClippedSelectValue
}
