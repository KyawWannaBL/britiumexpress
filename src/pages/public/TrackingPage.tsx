import React from "react";
import { useSearchParams } from "react-router-dom";
import ReceiverTracking from "../../tracking/ReceiverTracking";

export default function TrackingPage() {
  const [params] = useSearchParams();
  const code = params.get("code") ?? "";
  return <ReceiverTracking initialTrackingCode={code} />;
}
