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
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { label: string; error?: boolean; filled?: boolean }
>(({ className, children, label, error, filled, ...props }, ref) => (
    <div className="relative w-full flex flex-col">
        <div className={cn(
            "h-6 px-4 inline-flex items-center self-start transition-colors duration-300",
            error ? "bg-secondary text-white-pure" : "bg-primary text-black-pure"
        )}>
            <span className="text-[9px] font-mono font-black uppercase tracking-[0.3em]">
                {label}
            </span>
        </div>

        <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
                "group relative h-14 flex items-center justify-between px-6 text-[11px] font-mono font-black uppercase tracking-[0.25em] outline-none transition-all",
                "bg-white-pure border-l-8 border-y border-r border-black-pure text-black-pure",
                error ? "border-l-secondary" : "border-l-primary",
                "hover:bg-black-pure hover:text-white-pure data-[state=open]:bg-black-pure data-[state=open]:text-white-pure",
                !filled && "opacity-40",
                className,
            )}
            {...props}
        >
            <span className="truncate">{children}</span>
            <SelectPrimitive.Icon asChild>
                <ChevronDown className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </SelectPrimitive.Icon>
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
                'relative z-[120] min-w-[8rem] bg-white-pure border-l-8 border-y border-r border-black-pure mt-[-1px] shadow-none animate-in fade-in duration-100',
                className,
            )}
            position={position}
            {...props}
        >
            <SelectPrimitive.Viewport className="p-0">
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
            "relative flex w-full cursor-pointer select-none items-center py-4 px-10 text-[10px] font-mono font-black uppercase tracking-widest outline-none transition-colors",
            "border-b border-black-pure last:border-0",
            "focus:bg-primary focus:text-black-pure",
            className,
        )}
        {...props}
    >
        <span className="absolute left-4 flex items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <div className="size-1.5 bg-black-pure" />
            </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
))
ClippedSelectItem.displayName = SelectPrimitive.Item.displayName

export {
    ClippedSelect, ClippedSelectContent, ClippedSelectGroup, ClippedSelectItem, ClippedSelectTrigger, ClippedSelectValue
}
