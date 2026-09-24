---
name: rate-calculator-refactor
description: systematic UI and calculation fix for per-person-sharing
metadata:
  type: project
---

The goal is to refactor `app/(ops)/dashboard/costing/RateCalculator.tsx` to provide a more systematic UI for rate calculation and ensure "Per Person Sharing" (PPS) calculations function correctly for varying number of adults as per the user's complex pricing rules.

**Why:**
- The current UI flow in `RateCalculator.tsx` lacks a clear, guided sequence for selecting destination, hotel, room, and rate.
- The "Per Person Sharing" calculation logic is inconsistent when the number of adults changes, requiring adjustment while preserving the user's specific complex pricing logic (which involves a mix of single and sharing rates).

**How to apply:**

1.  **Systematic UI Flow**:
    - Modify the `dayRows.map` in `RateCalculator.tsx` to conditionally render the `Hotel`, `Room Category`, and `Rate Type` dropdowns only when the previous selection has been made.
    - Destination select remains primary.
    - If `destinationId` is chosen, show `Hotel` select.
    - If `hotelId` is chosen, show `Room Category` select.
    - If `roomCategoryId` is chosen, show `Specific Rate` select.

2.  **PPS Calculation Logic**:
    - Based on the user's confirmation to "Keep existing complex logic" while fixing the bug, we need to re-evaluate `getAccommodationGroupTotal` (line 475).
    - Investigate why `(row.adultAccomTotal || 0) * (numAdults - 1) + row.singleRoomRate` fails when adults are > 2 (it currently treats extra adults as `adultAccomTotal` i.e. PPS).
    - If PPS is 100 and Single is 150, for 2 adults, the total is 250 (1 PPS + 1 Single).
    - For 3 adults, if it's 2 sharing (100+100) + 1 single (150) = 350? Or 2 PPS + 1 third adult rate?
    - The calculation logic needs to be robust for `numAdults > 2`:
      - If adults > 2: `(Single Rate) + (1 PPS Rate) + ((numAdults - 2) * PPS Rate)`? Or use `thirdPersonRate` if `isTriple`?

3.  **Verification**:
    - Test the updated sequential UI flow.
    - Verify calculation logic with sample inputs for different adult counts (2, 3, 4) against the user expectation.
