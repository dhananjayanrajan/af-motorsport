'use client'

import { cn } from '@/utilities/cn'
import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'

const ClippedSelect = SelectPrimitive.Root
const ClippedSelectGroup = SelectPrimitive.Group
const ClippedSelectValue = SelectPrimitive.Value

const ClippedSelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { error?: boolean; valid?: boolean; filled?: boolean }
>(({ className, children, error, valid, filled, ...props }, ref) => (
    <div className="group relative w-full">
        <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
                "relative flex h-16 w-full items-center justify-between px-8 text-sm font-black font-mono uppercase tracking-widest outline-none transition-all duration-200 z-10",
                "bg-white-pure border border-black-pure text-black-pure",
                !filled && "opacity-40",
                error && "border-secondary text-secondary bg-secondary/5",
                className,
            )}
            {...props}
        >
            <span className="truncate relative z-10">{children}</span>
            <SelectPrimitive.Icon asChild>
                <ChevronDown className="relative z-10 h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </SelectPrimitive.Icon>

            <div className={cn(
                "absolute bottom-0 left-0 h-1 w-full transition-transform duration-300 translate-x-[-100%] group-data-[state=open]:translate-x-0 z-30",
                error ? "bg-secondary translate-x-0" : "bg-primary"
            )}
            />
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
                'relative z-[100] min-w-[8rem] bg-white-pure border border-black-pure',
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                position === 'popper' && 'mt-2',
                className,
            )}
            position={position}
            {...props}
        >
            <SelectPrimitive.Viewport
                className={cn(
                    'p-0',
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
            "relative flex w-full cursor-pointer select-none items-center py-5 px-8 text-xs font-black font-mono uppercase tracking-widest outline-none transition-colors focus:bg-primary focus:text-black-pure",
            className,
        )}
        {...props}
    >
        <span className="absolute left-3 flex h-3.5 w-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <div className="size-2 bg-black-pure" />
            </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
))
ClippedSelectItem.displayName = SelectPrimitive.Item.displayName

export {
    ClippedSelect, ClippedSelectContent, ClippedSelectGroup, ClippedSelectItem, ClippedSelectTrigger, ClippedSelectValue
}
