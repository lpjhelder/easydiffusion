import React from "react";
import { useImageCreate } from "../../../../../stores/imageCreateStore";

import { useCreateUI } from "../../creationPanelUIStore";

import {
  SettingItem // @ts-expect-error
} from "../../../../../styles/shared.css.ts";


import {
  MenuButton, // @ts-expect-error
} from "../advancedsettings.css.ts";

export default function GpuSettings() {
  const turbo = useImageCreate((state) => state.getValueForRequestKey("turbo"));
  const useCpu = useImageCreate((state) =>
    state.getValueForRequestKey("use_cpu")
  );
  const useFullPrecision = useImageCreate((state) =>
    state.getValueForRequestKey("use_full_precision")
  );

  const setRequestOption = useImageCreate((state) => state.setRequestOptions);

  const gpuOpen = useCreateUI((state) => state.isOpenAdvGPUSettings);
  const toggleGpuOpen = useCreateUI((state) => state.toggleAdvGPUSettings);

  return (
    <div>
      <button type="button" className={MenuButton} onClick={toggleGpuOpen}>
        <h4>GPU Settings</h4>
      </button>
      {gpuOpen && (
        <>
          <div className={SettingItem}>
            <label>
              <input
                checked={turbo}
                onChange={(e) => setRequestOption("turbo", e.target.checked)}
                type="checkbox"
              />
              Turbo mode (generates images faster, but uses an additional 1 GB
              of GPU memory)
            </label>
          </div>
          <div className={SettingItem}>
            <label>
              <input
                type="checkbox"
                checked={useCpu}
                onChange={(e) => setRequestOption("use_cpu", e.target.checked)}
              />
              Use CPU instead of GPU (warning: this will be *very* slow)
            </label>
          </div>
          <div className={SettingItem}>
            <label>
              <input
                checked={useFullPrecision}
                onChange={(e) =>
                  setRequestOption("use_full_precision", e.target.checked)
                }
                type="checkbox"
              />
              Use full precision (for GPU-only. warning: this will consume more
              VRAM)
            </label>
          </div>
        </>
      )}
    </div>
  );
}
