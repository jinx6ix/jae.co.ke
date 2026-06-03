// Re-export the per-tour booking page so /book-now/<slug> works as an alias for /booking/<slug>.
// This fixes 404s on inbound links like https://www.jaetravel.co.ke/book-now/masai-mara-luxury-safari
// without duplicating the page implementation.
export { default, generateMetadata, generateStaticParams } from "@/app/booking/[slug]/page"
