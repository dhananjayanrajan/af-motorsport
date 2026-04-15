'use client'

import { DESIGN_SYSTEM } from '@/lib/constants'
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
    <div className="group relative w-full max-w-xs">
        <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
                "relative flex h-14 w-full items-center justify-between px-10 text-[11px] font-black uppercase tracking-[0.2em] outline-none transition-all duration-300 italic z-10",
                "bg-white text-black",
                !filled && "text-zinc-400",
                error && "bg-red-50 text-red-600",
                className,
            )}
            style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
            {...props}
        >
            <span className="truncate relative z-10">{children}</span>
            <SelectPrimitive.Icon asChild>
                <ChevronDown className="relative z-10 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
            </SelectPrimitive.Icon>

            <div
                className={cn(
                    "absolute inset-0 pointer-events-none border transition-colors duration-300 z-20",
                    error ? "border-red-600" : "border-zinc-200 group-data-[state=open]:border-black"
                )}
                style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
            />

            <div className={cn(
                "absolute bottom-0 left-0 h-[3px] w-full transition-transform duration-500 ease-[0.16,1,0.3,1] translate-x-[-100%] group-data-[state=open]:translate-x-0 z-30",
                error ? "bg-red-600" : ""
            )}
                style={!error ? { backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] } : {}}
            />
        </SelectPrimitive.Trigger>

        <div
            className={cn(
                "absolute -inset-[1px] -z-10 opacity-10 group-data-[state=open]:opacity-30 transition-opacity duration-300",
                error ? "bg-red-600" : "bg-black"
            )}
            style={{ clipPath: DESIGN_SYSTEM.SHAPES.DIAMOND_CLIP }}
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
                'relative z-[100] min-w-[8rem] overflow-hidden bg-white text-black border-2 border-black shadow-xl',
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
            "relative flex w-full cursor-pointer select-none items-center py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-[0.2em] outline-none transition-colors italic focus:bg-zinc-100",
            className,
        )}
        {...props}
    >
        <span className="absolute left-4 flex h-3.5 w-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <div className="w-2 h-2 rotate-45" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
            </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
))
ClippedSelectItem.displayName = SelectPrimitive.Item.displayName

export {
    ClippedSelect, ClippedSelectContent, ClippedSelectGroup, ClippedSelectItem, ClippedSelectTrigger, ClippedSelectValue
}
