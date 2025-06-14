import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import NavMenu from "@/web/components/layout/NavMenu";
import { Separator } from "@/web/components/ui/separator";
import { Routes } from "@/web/types/router";

function Header() {
  const { t } = useTranslation();

  return (
    <>
      <header className="flex gap-2 justify-between items-center">
        <nav className="flex flex-row items-center justify-between w-full">
          <div className="font-bold">
            <Link to={Routes.ROOT} className="flex items-center gap-2">
              <svg width="100%" height="100%" viewBox="0 0 187 156" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2, flex: "0 0 22px" }}>
                <g transform="matrix(1,0,0,1,-2183.38,-972.854)">
                  <g transform="matrix(1,0,0,1,2100,700)">
                    <g transform="matrix(4.58236e-16,7.48357,-7.48357,4.58236e-16,4023.02,-5337.04)">
                      <path d="M762.088,521.991L762.088,526.439C755.206,526.439 749.628,520.861 749.628,513.979C749.628,507.098 755.206,501.519 762.088,501.519L762.088,505.967L769.852,505.967C770.125,505.967 770.347,506.189 770.347,506.462L770.347,521.496C770.347,521.77 770.125,521.991 769.852,521.991L762.088,521.991ZM761.284,517.403C761.284,517.624 761.464,517.803 761.685,517.803L762.486,517.803C762.707,517.803 762.887,517.624 762.887,517.403L762.887,510.556C762.887,510.334 762.707,510.155 762.486,510.155L761.685,510.155C761.464,510.155 761.284,510.334 761.284,510.556L761.284,517.403ZM755.876,508.837C755.876,508.616 755.696,508.437 755.475,508.437L754.674,508.437C754.453,508.437 754.273,508.616 754.273,508.837L754.273,519.254C754.273,519.475 754.453,519.654 754.674,519.654L755.475,519.654C755.696,519.654 755.876,519.475 755.876,519.254L755.876,508.837ZM759.381,506.367C759.381,506.146 759.202,505.967 758.981,505.967L758.179,505.967C757.958,505.967 757.779,506.146 757.779,506.367L757.779,521.591C757.779,521.812 757.958,521.991 758.179,521.991L758.981,521.991C759.202,521.991 759.381,521.812 759.381,521.591L759.381,506.367Z" style={{ fill: "rgb(0,0,0)" }} />
                    </g>
                  </g>
                </g>
              </svg>
              <div className="shrink-0 text-2xl font-black uppercase">
                {t("common.appName")}
              </div>
            </Link>
          </div>
          <NavMenu />
        </nav>
      </header>
      <Separator className="my-4" />
    </>
  );
}

export { Header };
