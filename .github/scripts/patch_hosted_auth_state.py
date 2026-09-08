from pathlib import Path


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected exactly one match, found {count}")
    return text.replace(old, new, 1)


path = Path('components/StandaloneShell.js')
text = path.read_text()

if 'LEGACY_PRIVACY_SENTINEL' not in text:
    text = replace_once(
        text,
        "const STORAGE_KEY = 'muapi_key';",
        "const STORAGE_KEY = 'muapi_key';\nconst LEGACY_PRIVACY_SENTINEL = '__actually_open_byok__';",
        'legacy sentinel constant',
    )

if 'const [hasProviderKey, setHasProviderKey]' not in text:
    text = replace_once(
        text,
        '''  const [apiKey, setApiKey] = useState(null);\n  const [activeTab, setActiveTab] = useState(getInitialTab());''',
        '''  const [apiKey, setApiKey] = useState(null);\n  const [hasProviderKey, setHasProviderKey] = useState(false);\n  const [showKeyModal, setShowKeyModal] = useState(false);\n  const [activeTab, setActiveTab] = useState(getInitialTab());''',
        'provider auth state',
    )

old_auth = '''  useEffect(() => {\n    setHasMounted(true);\n    const stored = localStorage.getItem(STORAGE_KEY);\n    if (stored) {\n      setApiKey(stored);\n      fetchBalance(stored);\n      // Sync cookie immediately on mount to establish identity for background requests\n      document.cookie = `muapi_key=${stored}; path=/; max-age=31536000; SameSite=Lax`;\n    }\n  }, [fetchBalance]);\n\n  const handleKeySave = useCallback((key) => {\n    localStorage.setItem(STORAGE_KEY, key);\n    setApiKey(key);\n    fetchBalance(key);\n    document.cookie = `muapi_key=${key}; path=/; max-age=31536000; SameSite=Lax`;\n  }, [fetchBalance]);\n\n  const handleKeyChange = useCallback(() => {\n    localStorage.removeItem(STORAGE_KEY);\n    setApiKey(null);\n    setBalance(null);\n    document.cookie = "muapi_key=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";\n  }, []);'''

new_auth = '''  useEffect(() => {\n    setHasMounted(true);\n    const hasDirectProviderKey = Boolean(\n      localStorage.getItem('venice_api_key')?.trim() ||\n      localStorage.getItem('openrouter_api_key')?.trim(),\n    );\n    setHasProviderKey(hasDirectProviderKey);\n\n    const stored = localStorage.getItem(STORAGE_KEY);\n    if (stored === LEGACY_PRIVACY_SENTINEL) {\n      // Older fork builds used a fake MuAPI key to get BYOK sessions through\n      // the shell auth gate. Migrate it out of both storage and cookies.\n      localStorage.removeItem(STORAGE_KEY);\n      document.cookie = "muapi_key=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";\n    } else if (stored) {\n      setApiKey(stored);\n      fetchBalance(stored);\n      // Only a real compatibility key is mirrored into the cookie used by\n      // background compatibility requests.\n      document.cookie = `muapi_key=${stored}; path=/; max-age=31536000; SameSite=Lax`;\n    }\n  }, [fetchBalance]);\n\n  const handleKeySave = useCallback((key) => {\n    const hasDirectProviderKey = Boolean(\n      localStorage.getItem('venice_api_key')?.trim() ||\n      localStorage.getItem('openrouter_api_key')?.trim(),\n    );\n    setHasProviderKey(hasDirectProviderKey);\n\n    if (key) {\n      localStorage.setItem(STORAGE_KEY, key);\n      setApiKey(key);\n      fetchBalance(key);\n      document.cookie = `muapi_key=${key}; path=/; max-age=31536000; SameSite=Lax`;\n    } else {\n      localStorage.removeItem(STORAGE_KEY);\n      setApiKey(null);\n      setBalance(null);\n      document.cookie = "muapi_key=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";\n    }\n    setShowKeyModal(false);\n  }, [fetchBalance]);\n\n  const handleKeyChange = useCallback(() => {\n    // Open the key editor without destroying the active credentials first.\n    // The save handler applies removals atomically after validation.\n    setShowSettings(false);\n    setShowKeyModal(true);\n  }, []);'''

if old_auth in text:
    text = text.replace(old_auth, new_auth, 1)
elif 'setHasProviderKey(hasDirectProviderKey)' not in text:
    raise SystemExit('hosted auth handlers: expected legacy block not found')

old_gate = '''  if (!apiKey) {\n    return <ApiKeyModal onSave={handleKeySave} locale={locale} />;\n  }'''
new_gate = '''  if (showKeyModal || (!apiKey && !hasProviderKey)) {\n    return (\n      <ApiKeyModal\n        onSave={handleKeySave}\n        onClose={showKeyModal ? () => setShowKeyModal(false) : undefined}\n        overlay={showKeyModal}\n        locale={locale}\n      />\n    );\n  }'''

if old_gate in text:
    text = text.replace(old_gate, new_gate, 1)
elif '(!apiKey && !hasProviderKey)' not in text:
    raise SystemExit('hosted auth gate: expected legacy gate not found')

path.write_text(text)
