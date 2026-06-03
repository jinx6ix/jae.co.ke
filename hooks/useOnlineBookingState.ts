// hooks/useOnlineBookingState.ts
//
// Shared state machine for the booking forms. The forms (tour + vehicle,
// root + localized) all want the same shape: after the email route
// returns a booking id, record the booking into the shared
// `online_bookings` table. The form's UI MUST branch on the result:
// only show the green "Booking Confirmed!" card when `dbWriteStatus ===
// 'recorded'`. On `'failed'` the customer email is still out the door
// (so the booking is not lost), but the UI is honest about the
// dashboard not seeing it.
//
// Each form still owns its own `submitted` / `bookingResult` state for
// the success card (different visual styles per call site). This hook
// only owns the dashboard-side write state.

'use client';

import { useCallback, useState } from 'react';
import {
  recordOnlineBooking,
  type OnlineBookingWriteError,
  type OnlineBookingWriteInput,
  type OnlineBookingWriteResult,
} from '@/lib/online-bookings';

export type DbWriteStatus = 'pending' | 'recorded' | 'failed' | null;

export function useOnlineBookingState() {
  const [dbWriteStatus, setDbWriteStatus] = useState<DbWriteStatus>(null);
  const [dbWriteError, setDbWriteError] = useState<OnlineBookingWriteError | null>(null);
  const [dbWriteDetails, setDbWriteDetails] = useState<OnlineBookingWriteResult | null>(null);

  const write = useCallback(
    async (input: OnlineBookingWriteInput): Promise<OnlineBookingWriteResult> => {
      setDbWriteStatus('pending');
      setDbWriteError(null);
      setDbWriteDetails(null);

      const result = await recordOnlineBooking(input);

      if (result.ok) {
        setDbWriteStatus('recorded');
        setDbWriteDetails(result);
        return result;
      }

      setDbWriteStatus('failed');
      setDbWriteError(result.error);
      setDbWriteDetails(result);

      // Loud console log so the operator can grep server-side logs
      // AND spot client-side failures during testing.
      // eslint-disable-next-line no-console
      console.error(
        '[online-bookings] client write failed:',
        { source_booking_id: input.source_booking_id, ...result },
      );

      return result;
    },
    [],
  );

  const reset = useCallback(() => {
    setDbWriteStatus(null);
    setDbWriteError(null);
    setDbWriteDetails(null);
  }, []);

  return { dbWriteStatus, dbWriteError, dbWriteDetails, write, reset };
}
