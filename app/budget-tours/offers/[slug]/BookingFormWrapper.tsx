"use client";

import dynamic from "next/dynamic";
import BookingForm from "@/components/BookingForm";

interface BookingFormWrapperProps {
  tourTitle: string;
  tourPrice: number;
  tourDuration: string;
  serviceType?: string;
  tourSlug?: string;
}

export default function BookingFormWrapper(props: BookingFormWrapperProps) {
  return <BookingForm {...props} />;
}