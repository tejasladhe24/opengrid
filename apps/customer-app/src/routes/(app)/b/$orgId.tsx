import { createFileRoute } from "@tanstack/react-router"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import {
  BadgeCheckIcon,
  ClockIcon,
  GlobeIcon,
  InfoIcon,
  MapPinIcon,
  PhoneIcon,
  QuoteIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  SparklesIcon,
  StarIcon,
  TruckIcon,
} from "lucide-react"

export const Route = createFileRoute("/(app)/b/$orgId")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Business | OpenGrid",
      },
    ],
  }),
})

function RouteComponent() {
  Route.useParams()

  const attribution: "DIRECT" | "PLATFORM" = "DIRECT"

  const business = {
    name: "Sahyadri Cloud Kitchen",
    category: "Food • Cloud kitchen",
    locationLine: "Kothrud, Pune",
    address: "3rd Floor, Karve Rd, near Nal Stop, Pune 411038",
    trustPoints: 92,
    ratingOpenGrid: 4.6,
    ratingGoogle: 4.5,
    reviewCountOpenGrid: 138,
    reviewCountGoogle: 1206,
    hours: "Open • Closes 11:30 PM",
    deliveryHint: "Delivery 25–35 min • Pickup available",
    pricingHint: "Same as offline pricing",
  } as const

  const highlights = [
    { label: "No hidden charges", icon: ShieldCheckIcon },
    { label: "Fair cancellations", icon: BadgeCheckIcon },
    { label: "DIRECT-friendly", icon: SparklesIcon },
  ] as const

  const topItems = [
    {
      name: "Butter Chicken + Rumali (Combo)",
      kind: "Food",
      price: "₹279",
      note: "Best seller • Same as offline",
    },
    {
      name: "Paneer Tikka Wrap",
      kind: "Food",
      price: "₹149",
      note: "Quick bite • High repeat rate",
    },
    {
      name: "Family Thali (Veg)",
      kind: "Meal",
      price: "₹399",
      note: "Serves 2–3 • Great value",
    },
    {
      name: "Bulk Office Lunch (10–50 pax)",
      kind: "Catering",
      price: "Quote",
      note: "Transparent invoice • Scheduled delivery",
    },
    {
      name: "Custom Party Platters",
      kind: "Catering",
      price: "Quote",
      note: "Advance booking • Clear terms",
    },
    {
      name: "Pickup Order (Prepaid)",
      kind: "Service",
      price: "0 fee",
      note: "Fast pickup • Minimal packaging",
    },
  ] as const

  const platformReviews = [
    {
      name: "Riya S.",
      rating: 5,
      when: "2 days ago",
      text: "Prices matched the menu I saw in-store. Delivery was on time, and they called to confirm spice level instead of guessing.",
      tags: ["Same as offline", "On-time"],
    },
    {
      name: "Amit P.",
      rating: 4,
      when: "1 week ago",
      text: "Good portion size. Order was delayed a bit, but they updated status and added a free drink. Fair resolution.",
      tags: ["Transparent updates", "Fair resolution"],
    },
    {
      name: "Sneha K.",
      rating: 5,
      when: "3 weeks ago",
      text: "Consistent quality. No surprise packing charges. This is how ordering should feel.",
      tags: ["No hidden charges", "Consistent"],
    },
  ] as const

  const googleReviews = [
    {
      name: "Harshad Patil",
      rating: 5,
      when: "a month ago",
      text: "Great taste and hygienic packaging. Butter chicken is a must try.",
    },
    {
      name: "Neha Joshi",
      rating: 4,
      when: "2 months ago",
      text: "Good food, sometimes crowded during peak dinner hours for pickup.",
    },
  ] as const

  return (
    <div className="h-full overflow-y-auto bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-4 md:px-6 md:py-6">
        <div className="mb-4 rounded-2xl border bg-card p-3 md:p-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={attribution === "DIRECT" ? "secondary" : "outline"}>
                  <SparklesIcon />
                  Attribution: {attribution}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  {attribution === "DIRECT"
                    ? "You opened this store via referral link / QR (business-owned relationship)."
                    : "You discovered this store via OpenGrid search/browse (platform-driven discovery)."}
                </div>
              </div>
            </div>
            <Badge variant="secondary">
              {attribution === "DIRECT" ? "0% platform fee" : "5–10% platform fee"}
            </Badge>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border bg-card">
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_-20%,hsl(var(--primary)/0.14),transparent_55%),radial-gradient(700px_circle_at_90%_20%,hsl(var(--secondary)/0.18),transparent_55%)]" />
          <div className="relative p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="truncate text-xl font-semibold md:text-2xl">
                    {business.name}
                  </h1>
                  <Badge variant="secondary">{business.category}</Badge>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPinIcon className="size-4" />
                    {business.locationLine}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon className="size-4" />
                    {business.hours}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2">
                    <ShieldCheckIcon className="size-4 text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">
                      Trust points
                    </div>
                    <div className="text-sm font-semibold">
                      +{business.trustPoints}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2">
                    <StarIcon className="size-4 text-muted-foreground" />
                    <div className="text-sm font-semibold">
                      {business.ratingOpenGrid}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      OpenGrid • {business.reviewCountOpenGrid} reviews
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2">
                    <GlobeIcon className="size-4 text-muted-foreground" />
                    <div className="text-sm font-semibold">
                      {business.ratingGoogle}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Google • {business.reviewCountGoogle}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {highlights.map((h) => (
                    <Badge key={h.label} variant="outline">
                      <h.icon />
                      {h.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row md:flex-col md:items-end">
                <Button size="lg" className="w-full sm:w-auto">
                  <ShoppingBagIcon />
                  Order now
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <PhoneIcon />
                  Call
                </Button>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-sm text-muted-foreground md:grid-cols-2">
              <div className="inline-flex items-center gap-2">
                <TruckIcon className="size-4" />
                {business.deliveryHint}
              </div>
              <div className="inline-flex items-center gap-2">
                <BadgeCheckIcon className="size-4" />
                {business.pricingHint}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="grid gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <InfoIcon className="size-4 text-muted-foreground" />
                  About
                </CardTitle>
                <CardDescription>
                  This is a static storefront preview. Content and attribution
                  (DIRECT/PLATFORM) will be wired later.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <div className="text-foreground">
                  Sahyadri is a family-run kitchen focused on consistent taste,
                  clean packaging, and transparent billing. Prices shown here are
                  meant to match their offline menu (no inflated “platform
                  pricing”).
                </div>
                <div className="rounded-xl border bg-muted/30 p-3 text-muted-foreground">
                  <div className="font-medium text-foreground">Address</div>
                  <div className="mt-1">{business.address}</div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Badge variant="secondary">
                  {attribution === "DIRECT"
                    ? "DIRECT: 0% platform fee"
                    : "PLATFORM: 5–10% platform fee"}
                </Badge>
                <Button variant="ghost" size="sm">
                  How fees work
                </Button>
              </CardFooter>
            </Card>

            <div>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-base font-semibold">
                    Top products & services
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Best sellers and common requests.
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  View full menu
                </Button>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {topItems.map((i) => (
                  <Card key={i.name} className="hover:bg-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate">{i.name}</div>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <Badge variant="secondary">{i.kind}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {i.note}
                            </span>
                          </div>
                        </div>
                        <div className="shrink-0 rounded-lg border bg-background px-2 py-1 text-sm font-semibold">
                          {i.price}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardFooter className="justify-between">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                      <Button size="sm">Add</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <aside className="grid gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <QuoteIcon className="size-4 text-muted-foreground" />
                  Reviews snapshot
                </CardTitle>
                <CardDescription>
                  Platform reviews are tied to orders; Google reviews are shown
                  for additional context.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-3 rounded-xl border bg-muted/20 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold">OpenGrid</div>
                    <Badge variant="secondary">
                      {business.ratingOpenGrid} • {business.reviewCountOpenGrid}
                    </Badge>
                  </div>
                  <div className="grid gap-2">
                    {platformReviews.slice(0, 2).map((r) => (
                      <div
                        key={r.name}
                        className="rounded-xl border bg-background p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">
                              {r.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {r.when}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 rounded-lg border bg-muted/30 px-2 py-1 text-xs">
                            <StarIcon className="size-3.5 text-muted-foreground" />
                            <span className="font-medium">{r.rating}</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {r.text}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {r.tags.map((t) => (
                            <Badge key={t} variant="outline">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    See all OpenGrid reviews
                  </Button>
                </div>

                <Separator />

                <div className="grid gap-3 rounded-xl border bg-muted/20 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold">Google</div>
                    <Badge variant="secondary">
                      {business.ratingGoogle} • {business.reviewCountGoogle}
                    </Badge>
                  </div>
                  <div className="grid gap-2">
                    {googleReviews.map((r) => (
                      <div
                        key={r.name}
                        className="rounded-xl border bg-background p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">
                              {r.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {r.when}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 rounded-lg border bg-muted/30 px-2 py-1 text-xs">
                            <StarIcon className="size-3.5 text-muted-foreground" />
                            <span className="font-medium">{r.rating}</span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {r.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Open in Google
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
