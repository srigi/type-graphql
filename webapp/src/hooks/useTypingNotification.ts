import { useState, useRef, useEffect } from 'preact/compat';
import { useMutation } from '@urql/preact';

import { UserTypingEvent } from '~gql/graphql';
import { graphql } from '~gql';

const TYPING_INACTIVITY = 1500;

const userTypingMutation = graphql(`
  mutation UserTyping($moviePublicId: String!, $event: UserTypingEvent!) {
    userTyping(moviePublicId: $moviePublicId, event: $event)
  }
`);

export function useTypingNotification(moviePublicId: string) {
  const [isTyping, setIsTyping] = useState(false);
  const typingInactivityTimeout = useRef<number | null>(null);
  const [, notifyUserTypingEvent] = useMutation(userTypingMutation);

  function restartInactivityTimeout() {
    if (typingInactivityTimeout.current != null) {
      window.clearTimeout(typingInactivityTimeout.current);
    }

    typingInactivityTimeout.current = window.setTimeout(() => {
      setIsTyping(false);
      notifyUserTypingEvent({ moviePublicId, event: UserTypingEvent.Stopped });
    }, TYPING_INACTIVITY);
  }

  function handleTyping(ev: KeyboardEvent) {
    const isCharacterInput = (ev.key.length === 1 || ev.key === ' ' || ev.key === 'Enter') && !ev.ctrlKey && !ev.metaKey && !ev.altKey;
    const isDeleteAction = ev.key === 'Backspace' || ev.key === 'Delete';
    const isNavigation = ev.key.startsWith('Arrow');
    const isPaste = (ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'v';

    if (isCharacterInput || isDeleteAction || isNavigation || isPaste) {
      restartInactivityTimeout(); // reset inactivity timer on every keypress

      if (!isTyping) {
        setIsTyping(true);
        notifyUserTypingEvent({ moviePublicId, event: UserTypingEvent.Started });
      }
    } // Ignore other keys (F-keys, Tab, Escape, etc.)
  }

  // Clear timer when component unmounts or moviePublicId changes
  useEffect(() => {
    return () => {
      if (typingInactivityTimeout.current != null) {
        window.clearTimeout(typingInactivityTimeout.current);
        typingInactivityTimeout.current = null;
      }
      if (isTyping) {
        notifyUserTypingEvent({ moviePublicId, event: UserTypingEvent.Stopped });
      }
    };
  }, [moviePublicId]);

  return handleTyping;
}
