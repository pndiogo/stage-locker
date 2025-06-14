import { useMediaQuery as useMediaQueryHook } from "@uidotdev/usehooks";

export function useMediaQuery() {
  const isSmallDevice = useMediaQueryHook("only screen and (max-width : 767px)");
  const isSmallDeviceUp = useMediaQueryHook("only screen and (min-width : 768px)");
  const isMediumDevice = useMediaQueryHook(
    "only screen and (min-width : 768px) and (max-width : 991px)",
  );
  const isMediumDeviceUp = useMediaQueryHook(
    "only screen and (min-width : 768px)",
  );
  const isLargeDevice = useMediaQueryHook(
    "only screen and (min-width : 992px) and (max-width : 1199px)",
  );
  const isLargeDeviceUp = useMediaQueryHook(
    "only screen and (min-width : 992px)",
  );
  const isExtraLargeDeviceUp = useMediaQueryHook(
    "only screen and (min-width : 1200px)",
  );

  return {
    isSmallDevice,
    isSmallDeviceUp,
    isMediumDevice,
    isMediumDeviceUp,
    isLargeDevice,
    isLargeDeviceUp,
    isExtraLargeDeviceUp,
  };
}
