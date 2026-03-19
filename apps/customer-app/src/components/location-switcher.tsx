"use client"

import * as React from "react"
import { ChevronsUpDown, MapPinCheckIcon, MapPinIcon, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Button } from "@workspace/ui/components/button"

export type Location = {
  name: string
  address: string
  distance: string
}

export const LocationSwitcher = ({ locations }: { locations: Location[] }) => {
  const [activeLocation, setActiveLocation] = React.useState(locations[0])

  if (!activeLocation) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant={"outline"}
          size="lg"
          className="min-w-48 gap-2 p-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <MapPinCheckIcon className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{activeLocation.name}</span>
            <span className="truncate text-xs">{activeLocation.address}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Address Book
          </DropdownMenuLabel>
          {locations.map((location, index) => (
            <DropdownMenuItem
              key={location.name}
              onClick={() => setActiveLocation(location)}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-md border">
                <MapPinIcon className="size-3.5 shrink-0" />
              </div>
              {location.name}
              <DropdownMenuShortcut>{location.distance}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 p-2">
            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
              <Plus className="size-4" />
            </div>
            <div className="font-medium text-muted-foreground">Add Address</div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
