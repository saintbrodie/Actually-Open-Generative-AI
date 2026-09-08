from pathlib import Path


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected exactly one match, found {count}")
    return text.replace(old, new, 1)


families_path = Path("packages/studio/src/modelFamilies.js")
families = families_path.read_text()
marker = "export function refreshImageModelCatalog()"
if marker not in families:
    families = replace_once(
        families,
        "  return Object.freeze(entries);",
        "  return entries;",
        "mutable picker entries array",
    )
    append = r'''

function replaceMapContents(target, source) {
  target.clear();
  for (const [key, value] of source) target.set(key, value);
}

function replaceCatalogContents(target, source) {
  target.families.splice(0, target.families.length, ...source.families);
  replaceMapContents(target.familyById, source.familyById);
  replaceMapContents(target.familyByVariantId, source.familyByVariantId);
  replaceMapContents(target.variantById, source.variantById);
  target.preferredVariants = source.preferredVariants;
}

export function refreshImageModelCatalog() {
  const nextCatalog = buildCatalog(
    [
      { mode: "t2i", models: t2iModels },
      { mode: "i2i", models: i2iModels },
    ],
    {
      familyId: imageFamilyId,
      familyName: (id, fallback) => IMAGE_FAMILY_NAMES[id] || cleanImageFamilyName(fallback),
      namingModes: ["t2i", "i2i"],
      preferredVariants: PREFERRED_IMAGE_VARIANTS,
      seriesVersion: imageSeriesVersion,
    },
  );
  replaceCatalogContents(imageModelCatalog, nextCatalog);

  const nextEntries = buildModelPickerEntries(
    imageModelCatalog,
    ["t2i", "i2i"],
    IMAGE_FAMILY_ALIASES,
  );
  imageModelPickerEntries.splice(
    0,
    imageModelPickerEntries.length,
    ...nextEntries,
  );
  replaceMapContents(
    imageModelPickerEntryByVariantId,
    indexModelPickerEntries(imageModelPickerEntries, imageModelCatalog),
  );
  return imageModelCatalog;
}

export function refreshVideoModelCatalog() {
  const nextCatalog = buildCatalog(
    [
      { mode: "t2v", models: t2vModels },
      { mode: "i2v", models: i2vModels },
      { mode: "v2v", models: v2vModels },
    ],
    {
      familyId: videoFamilyId,
      familyName: videoFamilyName,
      namingModes: ["t2v", "i2v", "v2v"],
      preferredVariants: PREFERRED_VIDEO_VARIANTS,
      seriesVersion: videoSeriesVersion,
      variantKey: videoVariantKey,
    },
  );
  replaceCatalogContents(videoModelCatalog, nextCatalog);

  const nextEntries = buildModelPickerEntries(
    videoModelCatalog,
    ["t2v", "i2v", "v2v"],
    VIDEO_FAMILY_ALIASES,
  );
  videoModelPickerEntries.splice(
    0,
    videoModelPickerEntries.length,
    ...nextEntries,
  );
  replaceMapContents(
    videoModelPickerEntryByVariantId,
    indexModelPickerEntries(videoModelPickerEntries, videoModelCatalog),
  );
  return videoModelCatalog;
}
'''
    families_path.write_text(families.rstrip() + append + "\n")


image_path = Path("packages/studio/src/components/ImageStudio.jsx")
image = image_path.read_text()
if "subscribeProviderCatalog" not in image:
    image = replace_once(
        image,
        'import { useState, useEffect, useRef, useCallback } from "react";',
        'import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";',
        "ImageStudio React hook import",
    )
    image = replace_once(
        image,
        'import { resolveCopy } from "../i18nUtils";',
        '''import { resolveCopy } from "../i18nUtils";
import {
  getProviderCatalogRevision,
  getProviderCatalogServerSnapshot,
  subscribeProviderCatalog,
} from "../providerCatalogEvents.js";''',
        "ImageStudio catalog event import",
    )
    image = replace_once(
        image,
        "  const copy = resolveCopy(en, zh, locale);",
        '''  const copy = resolveCopy(en, zh, locale);
  useSyncExternalStore(
    subscribeProviderCatalog,
    getProviderCatalogRevision,
    getProviderCatalogServerSnapshot,
  );''',
        "ImageStudio catalog subscription",
    )
    image_path.write_text(image)


video_path = Path("packages/studio/src/components/VideoStudio.jsx")
video = video_path.read_text()
if "subscribeProviderCatalog" not in video:
    video = replace_once(
        video,
        'import { useState, useEffect, useRef, useCallback, useMemo, useId } from "react";',
        'import { useState, useEffect, useRef, useCallback, useMemo, useId, useSyncExternalStore } from "react";',
        "VideoStudio React hook import",
    )
    video = replace_once(
        video,
        'import { resolveCopy } from "../i18nUtils";',
        '''import { resolveCopy } from "../i18nUtils";
import {
  getProviderCatalogRevision,
  getProviderCatalogServerSnapshot,
  subscribeProviderCatalog,
} from "../providerCatalogEvents.js";''',
        "VideoStudio catalog event import",
    )
    video = replace_once(
        video,
        "  const copy = resolveCopy(en, zh, locale);",
        '''  const copy = resolveCopy(en, zh, locale);
  useSyncExternalStore(
    subscribeProviderCatalog,
    getProviderCatalogRevision,
    getProviderCatalogServerSnapshot,
  );''',
        "VideoStudio catalog subscription",
    )
    video_path.write_text(video)


index_path = Path("packages/studio/src/index.js")
index = index_path.read_text()
if "import './providerCatalogRuntime.js';" not in index:
    index = replace_once(
        index,
        "import './privacyVideoModelsBootstrap.js';",
        "import './privacyVideoModelsBootstrap.js';\nimport './providerCatalogRuntime.js';",
        "studio runtime import",
    )
    index = index.rstrip() + "\n\nexport { refreshProviderCatalogs, notifyProviderKeysChanged } from './providerCatalogRuntime.js';\n"
    index_path.write_text(index)


modal_path = Path("components/ApiKeyModal.js")
modal = modal_path.read_text()
if "notifyProviderKeysChanged" not in modal:
    modal = replace_once(
        modal,
        "import { getCommonCopy } from '@/lib/locales';",
        "import { getCommonCopy } from '@/lib/locales';\nimport { notifyProviderKeysChanged } from 'studio';",
        "ApiKeyModal runtime import",
    )
    modal = replace_once(
        modal,
        '''    onSave(muapi || PRIVACY_SENTINEL);

    // The model-family picker is built at module load. Reloading after a BYOK-
    // only setup lets it order the provider the user actually configured first.
    if (!muapi && (venice || openrouter)) {
      window.setTimeout(() => window.location.reload(), 0);
    }''',
        '''    onSave(muapi || PRIVACY_SENTINEL);
    notifyProviderKeysChanged();''',
        "ApiKeyModal remove reload",
    )
    modal_path.write_text(modal)
