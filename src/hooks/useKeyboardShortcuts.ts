import { useEffect, useCallback } from 'react';

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  callback: () => void;
  disabled?: boolean;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement;
      const isTyping = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.isContentEditable;

      for (const shortcut of shortcuts) {
        if (shortcut.disabled) continue;

        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : true;
        const metaMatch = shortcut.meta ? event.metaKey : true;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;

        // For save shortcut (Cmd/Ctrl+S), allow even in inputs
        const isSaveShortcut = shortcut.key.toLowerCase() === 's' && (shortcut.ctrl || shortcut.meta);
        
        // For Escape, always allow
        const isEscape = shortcut.key === 'Escape';

        if (keyMatch && ctrlMatch && metaMatch && shiftMatch) {
          if (isTyping && !isSaveShortcut && !isEscape) continue;
          
          event.preventDefault();
          shortcut.callback();
          return;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

// Common shortcut patterns
export function useSaveShortcut(onSave: () => void, disabled = false) {
  useKeyboardShortcuts([
    { key: 's', ctrl: true, callback: onSave, disabled },
  ]);
}

export function useEscapeShortcut(onEscape: () => void, disabled = false) {
  useKeyboardShortcuts([
    { key: 'Escape', callback: onEscape, disabled },
  ]);
}
